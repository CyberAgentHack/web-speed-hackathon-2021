import React from 'react';
import Helmet from 'react-helmet';

import { TimelinePage } from '../../components/timeline/TimelinePage';
import { useRegisterOnReachBottom } from '../../hooks/use_register_on_reach_bottom';
import { fetchTimeline } from '../../utils/fetchers';

const LIMIT = 10;

/** @type {React.VFC} */
const TimelineContainer = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  const [timeline, setTimeline] = React.useState([]);

  const [offset, setOffset] = React.useState(0);

  React.useEffect(() => {
    (async () => {
      const timeline = await fetchTimeline({ limit: LIMIT, offset: offset });
      setTimeline((prev) => [...prev, ...timeline]);
      setOffset((offset) => offset + LIMIT);
    })().finally(() => {
      setIsLoading(false);
    });
  }, []);

  // 画面最下部までスクロールしたときには、10件読み込む
  useRegisterOnReachBottom(() => {
    setIsLoading(true);
    (async () => {
      const timeline = await fetchTimeline({ limit: LIMIT, offset: offset + LIMIT });
      setTimeline((prev) => [...prev, ...timeline]);
      setOffset((offset) => offset + LIMIT);
    })().finally(() => {
      setIsLoading(false);
    });
  }, [offset]);

  if (isLoading) {
    return (
      <Helmet>
        <title>読込中- CAwitter</title>
      </Helmet>
    );
  }

  return (
    <>
      <Helmet>
        <title>タイムライン- CAwitter</title>
      </Helmet>
      <TimelinePage timeline={timeline} />
    </>
  );
};

export { TimelineContainer };
