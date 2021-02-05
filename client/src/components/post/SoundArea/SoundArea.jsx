import React from 'react';

import { SoundPlayer } from '../../foundation/SoundPlayer';

/**
 * @typedef {object} Props
 * @property {Models.Sound} sound
 */

/** @type {React.VFC<Props>} */
const SoundArea = ({ sound }) => {
  return (
    <div className="relative w-full h-full border border-gray-300 rounded-lg overflow-hidden">
      <SoundPlayer sound={sound} />
    </div>
  );
};

export { SoundArea };
