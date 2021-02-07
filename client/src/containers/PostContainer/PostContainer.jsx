import React from 'react';
// import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

import { PostPage } from '../../components/post/PostPage';
import { useRegisterOnReachBottom } from '../../hooks/use_register_on_reach_bottom';
import { fetchPost, fetchCommentsByPost } from '../../utils/fetchers';
import { NotFoundContainer } from '../NotFoundContainer';

const LIMIT = 10;

/** @type {React.VFC} */
const PostContainer = () => {
  const { postId } = useParams();

  const [isLoading, setIsLoading] = React.useState(true);
  const [post, setPost] = React.useState(null);

  const [allComments, setAllComments] = React.useState([]);
  const [comments, setComments] = React.useState([]);

  const [offset, setOffset] = React.useState(0);

  React.useEffect(() => {
    (async () => {
      setIsLoading(true);
      const post = await fetchPost({ postId });
      setPost(post);

      const allComments = await fetchCommentsByPost({
        postId,
        limit: undefined,
        offset: undefined,
      });
      setAllComments(allComments);

      // 初回は10件のみ表示する
      setComments((prev) => [...prev, ...allComments.slice(offset, offset + LIMIT)]);
      setOffset((offset) => offset + LIMIT);
    })().finally(() => {
      setIsLoading(false);
    });
  }, [postId]);

  // 画面最下部までスクロールしたときには、10件読み込む
  useRegisterOnReachBottom(() => {
    setComments((prev) => [...prev, ...allComments.slice(offset, offset + LIMIT)]);
    setOffset((offset) => offset + LIMIT);
  }, [allComments, offset]);

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
    if (post != null && post.user != null) {
      document.title = `${post.user.name} さんのつぶやき- CAwitter`;
    }
  }, [isLoading, post]);

  if (post === null) {
    return <NotFoundContainer />;
  }

  return (
    <>
      {/*
      <Helmet>
        <title>{post.user.name} さんのつぶやき- CAwitter</title>
      </Helmet>
      */}
      <PostPage post={post} comments={comments} />
    </>
  );
};

export { PostContainer };
