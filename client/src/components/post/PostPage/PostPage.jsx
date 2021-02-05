import React from 'react';

import { CommentList } from '../CommentList';
import { PostItem } from '../PostItem';

/**
 * @typedef {object} Props
 * @property {*} post
 * @property {Array<*>} comments
 */
/** @type {React.VFC<Props>} */
const PostPage = ({ post, comments }) => {
  return (
    <>
      <PostItem post={post} />
      <CommentList comments={comments} />
    </>
  );
};

export { PostPage };
