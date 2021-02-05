import React from 'react';

import { Timeline } from '../../timeline/Timeline';
import { UserProfileHeader } from '../UserProfileHeader';

/**
 * @typedef {object} Props
 * @property {*} user
 * @property {Array<*>} timeline
 */

/** @type {React.VFC<Props>} */
const UserProfilePage = ({ user, timeline }) => {
  return (
    <>
      <UserProfileHeader user={user} />
      <div className="mt-6 border-t border-gray-300">
        <Timeline timeline={timeline} />
      </div>
    </>
  );
};

export { UserProfilePage };
