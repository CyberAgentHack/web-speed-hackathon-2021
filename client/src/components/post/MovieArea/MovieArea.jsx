import React from 'react';

import { getMoviePath } from '../../../utils/get_path';
import { AspectRatioBox } from '../../foundation/AspectRatioBox';
import { PausableMovie } from '../../foundation/PausableMovie';

/**
 * @typedef {object} Props
 * @property {*} movie
 */

/** @type {React.VFC<Props>} */
const MovieArea = ({ movie }) => {
  return (
    <AspectRatioBox aspectHeight={1} aspectWidth={1}>
      <div className="relative w-full h-full bg-gray-300 border border-gray-300 rounded-lg overflow-hidden">
        <PausableMovie src={getMoviePath(movie.id)} />
      </div>
    </AspectRatioBox>
  );
};

export { MovieArea };
