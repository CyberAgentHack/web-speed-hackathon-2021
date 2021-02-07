import classNames from 'classnames';
import sizeOf from 'image-size';
import React from 'react';

import { fetchBinary } from '../../../utils/fetchers';

/**
 * @typedef {object} Props
 * @property {string} src
 * @property {string} alt
 */

/**
 * アスペクト比を維持したまま、要素のコンテンツボックス全体を埋めるように画像を拡大縮小します
 * @type {React.VFC<Props>}
 */
const CoveredImage = ({ src, alt }) => {
  /** @type {React.RefObject<HTMLDivElement>} */
  const ref = React.useRef(null);
  const [containerRatio, setContainerRatio] = React.useState(1);
  const [imageRatio, setImageRatio] = React.useState(1);
  const [blobUrl, setBlobUrl] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      const data = await fetchBinary({ url: src });

      const { clientWidth, clientHeight } = ref.current;
      setContainerRatio(clientHeight / clientWidth);

      const { width: imageWidth, height: imageHeight } = sizeOf(Buffer.from(data));
      setImageRatio(imageHeight / imageWidth);

      const blobUrl = URL.createObjectURL(new Blob([data], { type: 'image/webp' }));
      setBlobUrl(blobUrl);
    })();
  }, [src]);

  return (
    <div ref={ref} className="relative w-full h-full overflow-hidden">
      {blobUrl !== null ? (
        <img
          alt={alt}
          loading="lazy"
          className={classNames('absolute left-1/2 top-1/2 max-w-none transform -translate-x-1/2 -translate-y-1/2', {
            'w-auto h-full': containerRatio > imageRatio,
            'w-full h-auto': containerRatio <= imageRatio,
          })}
          src={blobUrl}
        />
      ) : null}
    </div>
  );
};

export { CoveredImage };
