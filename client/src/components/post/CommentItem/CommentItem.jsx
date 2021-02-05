import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';

import { getProfileImagePath } from '../../../utils/get_path';

/**
 * @typedef {object} Props
 * @property {Models.Comment} comment
 */

/** @type {React.VFC<Props>} */
const CommentItem = ({ comment }) => {
  return (
    <article className="px-1 hover:bg-gray-50 sm:px-4">
      <div className="flex pb-4 pt-2 px-2 border-b border-gray-300 sm:px-4">
        <div className="flex-grow-0 flex-shrink-0 pr-2 sm:pr-4">
          <Link
            className="block w-8 h-8 bg-gray-300 border border-gray-300 rounded-full hover:opacity-75 overflow-hidden sm:w-12 sm:h-12"
            to={`/users/${comment.user.username}`}
          >
            <img alt={comment.user.profileImage.alt} src={getProfileImagePath(comment.user.profileImage.id)} />
          </Link>
        </div>
        <div className="flex-grow flex-shrink min-w-0">
          <p className="whitespace-nowrap text-xs overflow-hidden overflow-ellipsis">
            <Link className="pr-1 text-gray-800 hover:underline font-bold" to={`/users/${comment.user.username}`}>
              {comment.user.name}
            </Link>
            <Link className="pr-1 text-gray-500 hover:underline" to={`/users/${comment.user.username}`}>
              @{comment.user.username}
            </Link>
          </p>
          <p className="text-gray-800 text-sm leading-relaxed">{comment.text}</p>
          <p className="text-gray-500 text-xs">
            <time dateTime={moment(comment.createdAt).toISOString()}>
              {moment(comment.createdAt).locale('ja').format('LL')}
            </time>
          </p>
        </div>
      </div>
    </article>
  );
};

export { CommentItem };
