import React from 'react';

import { Navigation } from '../Navigation';

/**
 * @typedef {object} Props
 * @property {React.ReactNode} children
 * @property {(modalType: string) => void} onOpenModal
 */

/** @type {React.VFC<Props>} */
const AppPage = ({ children, onOpenModal }) => {
  return (
    <div className="relative z-0 flex justify-center bg-gray-100">
      <div className="flex max-w-full min-h-screen text-gray-800 bg-white">
        <aside className="relative z-10">
          <Navigation onOpenModal={onOpenModal} />
        </aside>
        <main className="relative z-0 flex-shrink pb-12 w-screen min-w-0 max-w-screen-sm lg:pb-0">{children}</main>
      </div>
    </div>
  );
};

export { AppPage };
