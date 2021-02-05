import React from 'react';

import { Timeline } from '../Timeline';

/**
 * @typedef {object} Props
 * @property {Array<*>} timeline
 */

/** @type {React.VFC<Props>} */
const TimelinePage = ({ timeline }) => {
  return <Timeline timeline={timeline} />;
};

export { TimelinePage };
