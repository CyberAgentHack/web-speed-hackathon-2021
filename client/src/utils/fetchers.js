import { gzip } from 'pako';

/**
 * @param {object} params
 * @param {string} params.url
 * @returns {Promise<ArrayBuffer>}
 */
async function fetchBinary({ url }) {
  const res = await fetch(url, {
    method: 'GET',
  });
  const result = await res.arrayBuffer();

  return result;
}

/**
 * @param {object} params
 * @param {string} params.postId
 * @returns {Promise<Post>}
 */
async function fetchPost({ postId }) {
  const res = await fetch(`/api/v1/posts/${postId}`, {
    method: 'GET',
  });
  const result = await res.json();

  return result;
}

/**
 * @param {object} params
 * @param {string} postId
 * @param {number} limit
 * @param {number} offset
 * @returns {Promise<Array<Comment>>}
 */
async function fetchCommentsByPost({ postId, limit, offset }) {
  const searchParams = new URLSearchParams();
  if (limit) {
    searchParams.append('limit', limit);
  }
  if (offset) {
    searchParams.append('offset', offset);
  }

  const res = await fetch(`/api/v1/posts/${postId}/comments`, {
    method: 'GET',
  });

  const result = await res.json();

  return result;
}

/**
 * @param {object} params
 * @param {number} limit
 * @param {number} offset
 * @returns {Promise<Array<Post>>}
 */
async function fetchTimeline({ limit, offset }) {
  const searchParams = new URLSearchParams();
  if (limit) {
    searchParams.append('limit', limit);
  }
  if (offset) {
    searchParams.append('offset', offset);
  }

  const res = await fetch(`/api/v1/posts?${searchParams}`, {
    method: 'GET',
  });

  const result = await res.json();

  return result;
}

/**
 * @param {object} params
 * @param {string} userId
 * @param {number} limit
 * @param {number} offset
 * @returns {Promise<Array<Post>>}
 */
async function fetchTimelineByUser({ userId, limit, offset }) {
  const searchParams = new URLSearchParams();
  if (limit) {
    searchParams.append('limit', limit);
  }
  if (offset) {
    searchParams.append('offset', offset);
  }

  const res = await fetch(`/api/v1/users/${userId}/posts`, {
    method: 'GET',
  });
  const result = await res.json();

  return result;
}

/**
 * @param {object} params
 * @param {string} params.userId
 * @returns {Promise<User>}
 */
async function fetchUser({ userId }) {
  const res = await fetch(`/api/v1/users/${userId}`, {
    method: 'GET',
  });
  const result = await res.json();

  return result;
}

/**
 * @returns {Promise<User>}
 */
async function fetchActiveUser() {
  const res = await fetch('/api/v1/me', {
    method: 'GET',
  });
  const result = await res.json();

  if (result.message === 'Unauthorized') {
    return null;
  }

  return result;
}

/**
 * @param {object} params
 * @param {string} params.username
 * @param {string} params.name
 * @param {string} params.password
 * @returns {Promise<User>}
 */
async function sendRegister(params) {
  const uint8Array = new TextEncoder().encode(JSON.stringify(params));
  const compressed = gzip(uint8Array);

  const res = await fetch('/api/v1/signup', {
    method: 'POST',
    body: compressed,
    headers: {
      'Content-Type': 'application/json',
      'Content-Encoding': 'gzip',
    },
  });

  const result = await res.json();

  return result;
}

/**
 * @param {object} params
 * @param {string} params.username
 * @param {string} params.password
 * @returns {Promise<User>}
 */
async function sendSignin(params) {
  const uint8Array = new TextEncoder().encode(JSON.stringify(params));
  const compressed = gzip(uint8Array);
  const result = await fetch('/api/v1/signin', {
    method: 'POST',
    body: compressed,
    headers: {
      'Content-Type': 'application/json',
      'Content-Encoding': 'gzip',
    },
  });

  return result.json();
}

/**
 * @param {object} params
 * @param {File} params.movie
 * @returns {Promise<Movie>}
 */
async function sendNewMovie({ movie }) {
  const result = await fetch('/api/v1/movies', {
    method: 'POST',
    body: movie,
    headers: {
      'Content-Type': 'application/octet-stream',
    },
  });
  return await result.json();
}

/**
 * @param {object} params
 * @param {File} params.sound
 * @returns {Promise<Sound>}
 */
async function sendNewSound({ sound }) {
  const result = await fetch('/api/v1/sounds', {
    method: 'POST',
    body: sound,
    headers: {
      'Content-Type': 'application/octet-stream',
    },
  });
  return await result.json();
}

/**
 * @param {object} params
 * @param {File} params.image
 * @returns {Promise<Image>}
 */
async function sendNewImage({ image }) {
  const result = await fetch('/api/v1/images', {
    method: 'POST',
    body: image,
    headers: {
      'Content-Type': 'application/octet-stream',
    },
  });
  return await result.json();
}

/**
 * @param {object} params
 * @param {File} [params.movie]
 * @param {File} [params.sound]
 * @param {Array<File>} [params.images]
 * @param {string} params.text
 * @returns {Promise<Post>}
 */
async function sendNewPost({ movie, sound, images, text }) {
  const payload = {
    text,
    movie: movie ? await sendNewMovie({ movie }) : undefined,
    sound: sound ? await sendNewSound({ sound }) : undefined,
    images: images ? await Promise.all(images.map((image) => sendNewImage({ image }))) : [],
  };

  const uint8Array = new TextEncoder().encode(JSON.stringify(payload));
  const compressed = gzip(uint8Array);
  const res = await fetch('/api/v1/posts', {
    method: 'POST',
    body: compressed,
    headers: {
      'Content-Type': 'application/json',
      'Content-Encoding': 'gzip',
    },
    body: compressed,
  });

  const result = res.json();

  return result;
}

export {
  fetchBinary,
  fetchActiveUser,
  fetchPost,
  fetchCommentsByPost,
  fetchTimeline,
  fetchTimelineByUser,
  fetchUser,
  sendRegister,
  sendSignin,
  sendNewPost,
};
