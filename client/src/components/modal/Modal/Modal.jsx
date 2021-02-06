import React from 'react';

/**
 * @typedef {object} Props
 * @property {() => void} onClose
 * @property {React.ReactNode} children
 */

/** @type {React.VFC<Props>} */
export const Modal = ({ onClose, children }) => {
  // overflow: hidden を付与して、スクロールできないようにする
  React.useEffect(() => {
    document.body.style.setProperty('overflow', 'hidden');
    return () => {
      document.body.style.removeProperty('overflow');
    };
  }, []);

  // Escape キーを入力すると、モーダルを閉じることができる
  React.useEffect(() => {
    const handler = (ev) => {
      if (ev.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keyup', handler);
    return () => document.removeEventListener('keyup', handler);
  }, [onClose]);

  return (
    <div className="fixed z-10 bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="absolute bottom-0 left-0 right-0 top-0" onClick={onClose}></div>
      <div className="flex flex-col items-center justify-center px-2 w-full h-4/6">
        <div className="relative px-2 py-8 w-full max-w-md max-h-full bg-white rounded">
          <div className="relative w-full max-h-full overflow-auto">{children}</div>
        </div>
      </div>
    </div>
  );
};
