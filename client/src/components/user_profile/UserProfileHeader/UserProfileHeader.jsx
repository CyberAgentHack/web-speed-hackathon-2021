import FastAverageColor from 'fast-average-color';
import moment from 'moment';
import React from 'react';

import { getProfileImagePath } from '../../../utils/get_path';
import { FontAwesomeIcon } from '../../foundation/FontAwesomeIcon';

/**
 * @typedef {object} Props
 * @property {Models.User} user
 */

/** @type {React.VFC<Props>} */
const UserProfileHeader = ({ user }) => {
  const [averageColor, setAverageColor] = React.useState(null);

  // 画像の平均色を取得します
  /** @type {React.ReactEventHandler<HTMLImageElement>} */
  const handleLoadImage = React.useCallback((ev) => {
    const fac = new FastAverageColor();
    const { rgb } = fac.getColor(ev.currentTarget, { mode: 'precision' });
    setAverageColor(rgb);
    fac.destroy();
  }, []);

  return (
    <header className="relative">
      <div className="h-32 bg-gray-300" style={{ backgroundColor: averageColor }}></div>
      <div className="absolute left-2/4 m-0 w-28 h-28 bg-gray-300 border border-gray-300 rounded-full overflow-hidden transform -translate-x-1/2 -translate-y-1/2 sm:w-32 sm:h-32">
        <img alt="" crossOrigin="anonymous" onLoad={handleLoadImage} src={getProfileImagePath(user.profileImage.id)} />
      </div>
      <div className="pt-20 px-4">
        <h1 className="text-2xl font-bold">{user.name}</h1>
        <p className="text-gray-600">@{user.username}</p>
        <p className="pt-2">{user.description}</p>
        <p className="pt-2 text-gray-600 text-sm">
          <span className="pr-1">
            <FontAwesomeIcon iconType="calendar-alt" styleType="regular" />
          </span>
          <span>
            <time dateTime={moment(user.createdAt).toISOString()}>
              {moment(user.createdAt).locale('ja').format('LL')}
            </time>
            からサービスを利用しています
          </span>
        </p>
      </div>
    </header>
  );
};

export { UserProfileHeader };
