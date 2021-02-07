import { gzip } from 'pako';

/**
 * @param {object} params
 * @param {string} params.url
 * @returns {Promise<ArrayBuffer>}
 */
async function fetchBinary({ url }) {
  const result = await $.ajax({
    method: 'GET',
    url,
    async: true,
    dataType: 'binary',
    responseType: 'arraybuffer',
  });
  return result;
}

/**
 * @param {object} params
 * @param {string} params.postId
 * @returns {Promise<Post>}
 */
async function fetchPost({ postId }) {
  const result = await $.ajax({
    method: 'GET',
    url: `/api/v1/posts/${postId}`,
    dataType: 'json',
    async: true,
  });
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

  const result = await $.ajax({
    method: 'GET',
    url: `/api/v1/posts/${postId}/comments`,
    dataType: 'json',
    async: true,
  });
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

  const result = await $.ajax({
    method: 'GET',
    url: `/api/v1/posts?${searchParams}`,
    dataType: 'json',
    async: true,
  });
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

  const result = await $.ajax({
    method: 'GET',
    url: `/api/v1/users/${userId}/posts`,
    dataType: 'json',
    async: true,
  });
  return result;
}

/**
 * @param {object} params
 * @param {string} params.userId
 * @returns {Promise<User>}
 */
async function fetchUser({ userId }) {
  const result = await $.ajax({
    method: 'GET',
    url: `/api/v1/users/${userId}`,
    dataType: 'json',
    async: true,
  });
  return result;
}

/**
 * @returns {Promise<User>}
 */
async function fetchActiveUser() {
  const result = await $.ajax({
    method: 'GET',
    url: '/api/v1/me',
    dataType: 'json',
    async: true,
  });
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
  const result = await $.ajax({
    method: 'POST',
    url: '/api/v1/signup',
    dataType: 'json',
    data: compressed,
    processData: false,
    async: true,
    headers: {
      'Content-Type': 'application/json',
      'Content-Encoding': 'gzip',
    },
  });
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
  const result = await $.ajax({
    method: 'POST',
    url: '/api/v1/signin',
    dataType: 'json',
    data: compressed,
    processData: false,
    async: true,
    headers: {
      'Content-Type': 'application/json',
      'Content-Encoding': 'gzip',
    },
  });
  return result;
}

/**
 * @param {object} params
 * @param {File} params.movie
 * @returns {Promise<Movie>}
 */
async function sendNewMovie({ movie }) {
  const result = await $.ajax({
    method: 'POST',
    url: '/api/v1/movies',
    dataType: 'json',
    data: movie,
    processData: false,
    async: true,
    headers: {
      'Content-Type': 'application/octet-stream',
    },
  });
  return result;
}

/**
 * @param {object} params
 * @param {File} params.sound
 * @returns {Promise<Sound>}
 */
async function sendNewSound({ sound }) {
  const result = await $.ajax({
    method: 'POST',
    url: '/api/v1/sounds',
    dataType: 'json',
    data: sound,
    processData: false,
    async: true,
    headers: {
      'Content-Type': 'application/octet-stream',
    },
  });
  return result;
}

/**
 * @param {object} params
 * @param {File} params.image
 * @returns {Promise<Image>}
 */
async function sendNewImage({ image }) {
  const result = await $.ajax({
    method: 'POST',
    url: '/api/v1/images',
    dataType: 'json',
    data: image,
    processData: false,
    async: true,
    headers: {
      'Content-Type': 'application/octet-stream',
    },
  });
  return result;
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
  const result = await $.ajax({
    method: 'POST',
    url: '/api/v1/posts',
    dataType: 'json',
    data: compressed,
    processData: false,
    async: true,
    headers: {
      'Content-Type': 'application/json',
      'Content-Encoding': 'gzip',
    },
  });
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
