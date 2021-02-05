import React from 'react';

import { getSoundPath } from '../../../utils/get_path';
import { SoundPlayer } from '../../foundation/SoundPlayer';

/**
 * @typedef {object} Props
 * @property {*} sound
 */

/** @type {React.VFC<Props>} */
const SoundArea = ({ sound }) => {
  return (
    <div className="relative w-full h-full bg-gray-300 border border-gray-300 rounded-lg overflow-hidden">
      <SoundPlayer artist={sound.artist} src={getSoundPath(sound.id)} title={sound.title} />
    </div>
  );
};

export { SoundArea };
