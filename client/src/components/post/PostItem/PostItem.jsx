import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';

import { getProfileImagePath } from '../../../utils/get_path';
import { ImageArea } from '../../post/ImageArea';
import { MovieArea } from '../../post/MovieArea';
import { SoundArea } from '../../post/SoundArea';

/**
 * @typedef {object} Props
 * @property {Models.Post} post
 */

/** @type {React.VFC<Props>} */
const PostItem = ({ post }) => {
  return (
    <article className="px-1 sm:px-4">
      <div className="pb-4 pt-4 px-4 border-b border-gray-300">
        <div className="flex items-center justify-center">
          <div className="flex-grow-0 flex-shrink-0 pr-2">
            <Link
              className="block w-14 h-14 bg-gray-300 border border-gray-300 rounded-full hover:opacity-95 overflow-hidden sm:w-16 sm:h-16"
              to={`/users/${post.user.username}`}
            >
              <img alt={post.user.profileImage.alt} src={getProfileImagePath(post.user.profileImage.id)} />
            </Link>
          </div>
          <div className="flex-grow flex-shrink min-w-0 whitespace-nowrap overflow-hidden overflow-ellipsis">
            <p>
              <Link className="text-gray-800 hover:underline font-bold" to={`/users/${post.user.username}`}>
                {post.user.name}
              </Link>
            </p>
            <p>
              <Link className="text-gray-500 hover:underline" to={`/users/${post.user.username}`}>
                @{post.user.username}
              </Link>
            </p>
          </div>
        </div>
        <div className="pt-2 sm:pt-4">
          <p className="text-gray-800 text-xl leading-relaxed">{post.text}</p>
          {post.images?.length > 0 ? (
            <div className="relative mt-2 w-full">
              <ImageArea images={post.images} />
            </div>
          ) : null}
          {post.movie ? (
            <div className="relative mt-2 w-full">
              <MovieArea movie={post.movie} />
            </div>
          ) : null}
          {post.sound ? (
            <div className="relative mt-2 w-full">
              <SoundArea sound={post.sound} />
            </div>
          ) : null}
          <p className="mt-2 text-sm sm:mt-4">
            <Link className="text-gray-500 hover:underline" to={`/posts/${post.id}`}>
              <time dateTime={moment(post.createdAt).toISOString()}>
                {moment(post.createdAt).locale('ja').format('LL')}
              </time>
            </Link>
          </p>
        </div>
      </div>
    </article>
  );
};

export { PostItem };
