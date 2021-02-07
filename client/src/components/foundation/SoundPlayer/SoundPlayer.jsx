import React from 'react';

import { fetchBinary } from '../../../utils/fetchers';
import { AspectRatioBox } from '../AspectRatioBox';
import { FontAwesomeIcon } from '../FontAwesomeIcon';
import { SoundWaveSVG } from '../SoundWaveSVG';

/**
 * @typedef {object} Props
 * @property {string} src
 * @property {string} title
 * @property {string} artist
 */

/**
 * @type {React.VFC<Props>}
 */
const SoundPlayer = ({ src, title, artist }) => {
  /** @type {[ArrayBuffer | null, (buffer: ArrayBuffer) => void]} */
  const [soundArrayBuffer, setSoundArrayBuffer] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      const data = await fetchBinary({ url: src });
      setSoundArrayBuffer(data);
    })();
  }, [src]);

  /**
   * 音声ファイルを読み込むための ObjectURL
   * @type {string | null}
   */
  const blobUrl = React.useMemo(() => {
    if (soundArrayBuffer === null) {
      return null;
    }
    const blob = new Blob([soundArrayBuffer], { type: 'audio/mpeg' });
    return URL.createObjectURL(blob);
  }, [soundArrayBuffer]);

  /** @type {React.RefObject<HTMLAudioElement>} */
  const audioRef = React.useRef(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTimeRatio, setCurrentTimeRatio] = React.useState(0);

  const handleTogglePlaying = React.useCallback(() => {
    setIsPlaying((isPlaying) => {
      isPlaying ? audioRef.current?.pause() : audioRef.current?.play();
      return !isPlaying;
    });
  }, []);

  const handleTimeUpdate = React.useCallback(() => {
    setCurrentTimeRatio(audioRef.current?.currentTime / audioRef.current?.duration);
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-full">
      {blobUrl ? <audio ref={audioRef} loop={true} src={blobUrl} onTimeUpdate={handleTimeUpdate} /> : null}
      <div className="p-2">
        <button
          className="flex items-center justify-center w-8 h-8 text-white text-sm bg-blue-600 rounded-full hover:opacity-75"
          type="button"
          onClick={handleTogglePlaying}
        >
          <FontAwesomeIcon iconType={isPlaying ? 'pause' : 'play'} styleType="solid" />
        </button>
      </div>
      <div className="flex flex-col flex-grow flex-shrink pt-2 min-w-0 h-full">
        <p className="whitespace-nowrap text-sm font-bold overflow-hidden overflow-ellipsis">{title}</p>
        <p className="text-gray-500 whitespace-nowrap text-sm overflow-hidden overflow-ellipsis">{artist}</p>
        {soundArrayBuffer ? (
          <AspectRatioBox aspectHeight={2} aspectWidth={15}>
            <div className="relative mt-2 w-full h-full">
              <div className="absolute inset-0 w-full h-full opacity-25">
                <SoundWaveSVG soundData={soundArrayBuffer} />
              </div>
              <div
                className="absolute inset-0 w-full h-full"
                // 再生したところまでの波形を clip-path で切り取る
                style={{ clipPath: `inset(0 ${(1 - currentTimeRatio) * 100}% 0 0)` }}
              >
                <SoundWaveSVG soundData={soundArrayBuffer} />
              </div>
            </div>
          </AspectRatioBox>
        ) : null}
      </div>
    </div>
  );
};

export { SoundPlayer };
