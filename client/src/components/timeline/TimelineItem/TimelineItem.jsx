import moment from 'moment';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import { getProfileImagePath } from '../../../utils/get_path';
import { ImageArea } from '../../post/ImageArea';
import { MovieArea } from '../../post/MovieArea';
import { SoundArea } from '../../post/SoundArea';

const isClickedAnchorOrButton = (target, currenTarget) => {
  while (currenTarget !== target && target.parentNode) {
    const tagName = target.tagName.toLowerCase();
    if (['button', 'a'].includes(tagName)) {
      return true;
    }
    target = target.parentNode;
  }
  return false;
};

/**
 * @typedef {object} Props
 * @property {*} post
 */

/** @type {React.VFC<Props>} */
const TimelineItem = ({ post }) => {
  const history = useHistory();

  /**
   * ボタンやリンク以外の箇所をクリックしたとき かつ 文字が選択されてないとき、投稿詳細ページに遷移する
   * @type {React.MouseEventHandler}
   */
  const handleClick = React.useCallback(
    (ev) => {
      const isSelectedText = document.getSelection().isCollapsed === false;
      if (!isClickedAnchorOrButton(ev.target, ev.currenTarget) && !isSelectedText) {
        history.push(`/posts/${post.id}`);
      }
    },
    [post],
  );

  const image = React.useMemo(() => {
    if (post.images?.length > 0) {
      return (
        <div className="relative mt-2 w-full">
          <ImageArea images={post.images} />
        </div>
      );
    }
  }, [post.image]);

  const movie = React.useMemo(() => {
    if (post.movie) {
      return (
        <div className="relative mt-2 w-full">
          <MovieArea movie={post.movie} />
        </div>
      );
    }
  }, [post.movie]);

  const sound = React.useMemo(() => {
    if (post.sound) {
      return (
        <div className="relative mt-2 w-full">
          <SoundArea sound={post.sound} />
        </div>
      );
    }
  }, [post.sound]);

  return (
    <article className="px-1 hover:bg-gray-50 sm:px-4" onClick={handleClick}>
      <div className="flex pb-4 pt-2 px-2 border-b border-gray-300 sm:px-4">
        <div className="flex-grow-0 flex-shrink-0 pr-2 sm:pr-4">
          <Link
            className="block w-12 h-12 bg-gray-300 border border-gray-300 rounded-full hover:opacity-75 overflow-hidden sm:w-16 sm:h-16"
            to={`/users/${post.user.username}`}
          >
            <img alt={post.user.profileImage.alt} src={getProfileImagePath(post.user.profileImage.id)} />
          </Link>
        </div>
        <div className="flex-grow flex-shrink min-w-0">
          <p className="whitespace-nowrap text-sm overflow-hidden overflow-ellipsis">
            <Link className="pr-1 text-gray-800 hover:underline font-bold" to={`/users/${post.user.username}`}>
              {post.user.name}
            </Link>
            <Link className="pr-1 text-gray-500 hover:underline" to={`/users/${post.user.username}`}>
              @{post.user.username}
            </Link>
            <span className="pr-1 text-gray-500">-</span>
            <Link className="pr-1 text-gray-500 hover:underline" to={`/posts/${post.id}`}>
              <time dateTime={moment(post.createdAt).toISOString()}>
                {moment(post.createdAt).locale('ja').format('LL')}
              </time>
            </Link>
          </p>
          <p className="text-gray-800 leading-relaxed">{post.text}</p>
          {/*
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
          */}

          {image}
          {movie}
          {sound}
          
        </div>
      </div>
    </article>
  );
};

export { TimelineItem };
