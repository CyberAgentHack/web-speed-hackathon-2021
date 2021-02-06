import React from 'react';

/**
 * @typedef {object} Props
 * @property {number} aspectWidth
 * @property {height} aspectHeight
 * @property {React.ReactNode} children
 */

/**
 * 親要素の横幅を基準にして、指定したアスペクト比のブロック要素を作ります
 * @type {React.VFC<Props>}
 */
const AspectRatioBox = ({ aspectWidth, aspectHeight, children }) => {
  /** @type {React.RefObject<HTMLDivElement>} */
  const ref = React.useRef(null);
  const [clientHeight, setClientHeight] = React.useState(0);

  React.useEffect(() => {
    // clientWidth とアスペクト比から clientHeight を計算する
    function calcStyle() {
      const clientWidth = ref.current.clientWidth;
      setClientHeight((clientWidth / aspectWidth) * aspectHeight);
    }

    // ウィンドウサイズが変わるたびに計算する
    window.addEventListener('resize', calcStyle, { passive: true });

    calcStyle();

    return () => window.removeEventListener('resize', calcStyle);
  }, []);

  return (
    <div ref={ref} className="relative w-full h-1" style={{ height: clientHeight }}>
      {/* 高さが計算できるまで render しない */}
      {clientHeight !== 0 ? children : null}
    </div>
  );
};

export { AspectRatioBox };
