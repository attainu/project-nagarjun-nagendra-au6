const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
cloudinary.config({
    cloud_name: "chat-hub",
    api_key: "381359245634283",
    api_secret: "v0a5KvKFUuXEjOt2cnF8u-YlFfU",
});
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    folder: "app",
    allowedFormats: ["jpg", "png", "jpeg"],
    transformation: [{ width: 100, height: 100, crop: "limit" }],
});

//for local storage.
// const upload = multer({ dest: 'uploads/' });
//for cloudinary storage.
const upload = multer({ storage: storage })
module.exports = upload;