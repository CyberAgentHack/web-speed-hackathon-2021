import React from 'react';
import { useParams } from 'react-router-dom';

import { UserProfilePage } from '../../components/user_profile/UserProfilePage';
import { useRegisterOnReachBottom } from '../../hooks/use_register_on_reach_bottom';
import { fetchTimelineByUser, fetchUser } from '../../utils/fetchers';
import { NotFoundContainer } from '../NotFoundContainer';

const LIMIT = 10;

/** @type {React.VFC} */
const UserProfileContainer = () => {
  const { userId } = useParams();

  const [isLoading, setIsLoading] = React.useState(true);

  const [user, setUser] = React.useState(null);

  const [allTimeline, setAllTimeline] = React.useState([]);
  const [timeline, setTimeline] = React.useState([]);

  const [offset, setOffset] = React.useState(0);

  React.useEffect(() => {
    (async () => {
      setIsLoading(true);
      const user = await fetchUser({ userId });
      setUser(user);

      const allTimeline = await fetchTimelineByUser({
        userId,
        limit: undefined,
        offset: undefined,
      });
      setAllTimeline(allTimeline);

      // 初回は10件のみ表示する
      setTimeline((prev) => [...prev, ...allTimeline.slice(offset, offset + LIMIT)]);
      setOffset((offset) => offset + LIMIT);
    })().finally(() => {
      setIsLoading(false);
    });
  }, [userId]);

  // 画面最下部までスクロールしたときには、10件読み込む
  useRegisterOnReachBottom(() => {
    setTimeline((prev) => [...prev, ...allTimeline.slice(offset, offset + LIMIT)]);
    setOffset((offset) => offset + LIMIT);
  }, [allTimeline, offset]);

  if (isLoading) {
    document.title = "読込中- CAwitter"
    return (
      <></>
    );
  }

  if (user === null) {
    return <NotFoundContainer />;
  }

  document.title = `${user.name} さんのタイムライン- CAwitter`
  return (
    <>
      <UserProfilePage timeline={timeline} user={user} />
    </>
  );
};

export { UserProfileContainer };
