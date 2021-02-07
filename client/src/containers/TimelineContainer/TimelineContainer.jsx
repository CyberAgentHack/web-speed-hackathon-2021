import React from 'react';
// import Helmet from 'react-helmet';

import { TimelinePage } from '../../components/timeline/TimelinePage';
import { useRegisterOnReachBottom } from '../../hooks/use_register_on_reach_bottom';
import { fetchTimeline } from '../../utils/fetchers';

const LIMIT = 10;

/** @type {React.VFC} */
const TimelineContainer = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  // const [allTimeline, setAllTimeline] = React.useState([]);
  const [timeline, setTimeline] = React.useState([]);

  const [offset, setOffset] = React.useState(0);

  React.useEffect(() => {
    (async () => {
      const timeline10 = await fetchTimeline({ limit: LIMIT, offset: undefined });
      // setAllTimeline(allTimeline);

      // 初回は10件のみ表示する
      // setTimeline((prev) => [...prev, ...allTimeline.slice(offset, offset + LIMIT)]);
      setTimeline((prev) => [...prev, ...timeline10]);
      setOffset((offset) => offset + LIMIT);
    })().finally(() => {
      setIsLoading(false);
    });
  }, []);

  // 画面最下部までスクロールしたときには、10件読み込む
  useRegisterOnReachBottom(() => {
    (async () => {
      const timeline10 = await fetchTimeline({ limit: LIMIT, offset: offset });

      setTimeline((prev) => [...prev, ...timeline10]);
      //setTimeline((prev) => [...prev, ...allTimeline.slice(offset, offset + LIMIT)]);
      setOffset((offset) => offset + LIMIT);
    })().finally(() => {
      setIsLoading(false);
    });
  }, [timeline, offset]);

  // if (isLoading) {
  //   return (
  //     <Helmet>
  //       <title>読込中- CAwitter</title>
  //     </Helmet>
  //   );
  // }
  React.useEffect(() => {
    if (isLoading) {
      document.title = `読込中- CAwitter`;
      return;
    }
    document.title = `タイムライン- CAwitter`;
  }, [isLoading]);

  return (
    <>
      {/*
      <Helmet>
        <title>タイムライン- CAwitter</title>
      </Helmet>
      */}
      <TimelinePage timeline={timeline} />
    </>
  );
};

export { TimelineContainer };
