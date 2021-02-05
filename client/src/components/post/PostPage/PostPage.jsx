import React from 'react';

import { CommentList } from '../CommentList';
import { PostItem } from '../PostItem';

/**
 * @typedef {object} Props
 * @property {Array<Models.Comment>} comments
 * @property {Models.Post} post
 */

/** @type {React.VFC<Props>} */
const PostPage = ({ comments, post }) => {
  return (
    <>
      <PostItem post={post} />
      <CommentList comments={comments} />
    </>
  );
};

export { PostPage };
