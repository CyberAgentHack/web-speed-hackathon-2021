import classNames from 'classnames';
import { Animator, Decoder } from 'gifler';
import { GifReader } from 'omggif';
import React from 'react';

import { useFetch } from '../../../hooks/use_fetch';
import { fetchBinary } from '../../../utils/fetchers';
import { AspectRatioBox } from '../AspectRatioBox';
import { FontAwesomeIcon } from '../FontAwesomeIcon';

/**
 * @typedef {object} Props
 * @property {string} src
 */

/**
 * クリックすると再生・一時停止を切り替えます。
 * @type {React.VFC<Props>}
 */
const PausableMovie = ({ src }) => {
  const { data, isLoading } = useFetch(src, fetchBinary);

  /** @type {React.RefObject<import('gifler').Animator>} */
  const animatorRef = React.useRef(null);
  /** @type {React.RefCallback<HTMLCanvasElement>} */
  const canvasCallbackRef = React.useCallback(
    (el) => {
      animatorRef.current?.stop();

      if (el === null || data === null) {
        return;
      }

      // GIF を解析する
      const reader = new GifReader(new Uint8Array(data));
      const frames = Decoder.decodeFramesSync(reader);
      const animator = new Animator(reader, frames);

      animator.animateInCanvas(el);
      animator.onFrame(frames[0]);

      // 視覚効果 off のとき GIF を自動再生しない
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setIsPlaying(false);
        animator.stop();
      } else {
        setIsPlaying(true);
        animator.start();
      }

      animatorRef.current = animator;
    },
    [data],
  );

  const [isPlaying, setIsPlaying] = React.useState(true);
  const handleClick = React.useCallback(() => {
    setIsPlaying((isPlaying) => {
      if (isPlaying) {
        animatorRef.current?.stop();
      } else {
        animatorRef.current?.start();
      }
      return !isPlaying;
    });
  }, []);

  if (isLoading || data === null) {
    return null;
  }

  return (
    <AspectRatioBox aspectHeight={1} aspectWidth={1}>
      <button className="group relative block w-full h-full" onClick={handleClick} type="button">
        <canvas ref={canvasCallbackRef} className="w-full" />
        <div
          className={classNames(
            'absolute left-1/2 top-1/2 flex items-center justify-center w-16 h-16 text-white text-3xl bg-black bg-opacity-50 rounded-full transform -translate-x-1/2 -translate-y-1/2',
            {
              'opacity-0 group-hover:opacity-100': isPlaying,
            },
          )}
        >
          <FontAwesomeIcon iconType={isPlaying ? 'pause' : 'play'} styleType="solid" />
        </div>
      </button>
    </AspectRatioBox>
  );
};

export { PausableMovie };
