function saveSceneImage(uploadImage, saveImage) {
  return ({ sceneId, image }) =>
    uploadImage(image.name, image.data).then((image) =>
      saveImage(sceneId, image)
    );
}

const THUMBNAIL_WIDTH = 288;
const THUMBNAIL_HEIGHT = 192;

function uploadImageViaCloudinary(
  cloudinary = require('cloudinary').v2,
  defaultOptions = {
    eager: [
      /* eagerly generate the thumbnail */ {
        width: THUMBNAIL_WIDTH,
        height: THUMBNAIL_HEIGHT,
      },
    ],
  }
) {
  const upload = cloudinary.uploader.upload_stream;

  return (name, data /* buffer */, customOptions = {}) =>
    new Promise((resolve, reject) =>
      upload(
        { ...defaultOptions, ...customOptions, public_id: name },
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            const url = result.secure_url;
            resolve({
              url,
              thumbnailUrl: thumbnail(url),
            });
          }
        }
      ).end(data)
    );
}

function thumbnail(url) {
  return url.replace(
    /image\/upload/,
    `image/upload/w_${THUMBNAIL_WIDTH},h_${THUMBNAIL_HEIGHT}`
  );
}

module.exports = {
  uploadImageViaCloudinary,
  saveSceneImage,
};
