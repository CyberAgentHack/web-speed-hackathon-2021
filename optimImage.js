const imagemin = require('imagemin');
// const imageminMozjpeg = require('imagemin-mozjpeg');
// const imageminPngquant = require('imagemin-pngquant');
const imageminWebp = require('imagemin-webp');

(async () => {
  const files = await imagemin(['public/images/profiles/*.webp', 'images/*.webp'], {
    destination: 'destination_dir_profile',
    plugins: [
      imageminWebp({
        quality: 30,
        size: 1,
        // resize: {
        //   width: 2080,
        //   height: 0,
        // },
        method: 6,
      }),
    ],
  });
  console.log(files);
})();
