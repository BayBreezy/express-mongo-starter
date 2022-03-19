const multer = require("multer");
const cloudinary = require("cloudinary").v2;

//Cloudinary configuration
cloudinary.config({
	api_key: process.env.CLD_API_KEY,
	api_secret: process.env.CLD_API_SECRET,
	cloud_name: process.env.CLD_NAME,
});

//Multer storage
const memoryStorage = multer.memoryStorage();
//Single upload
//Limit of 50mb
const singleUpload = multer({
	storage: memoryStorage,
	limits: {
		fileSize: 50000000,
	},
});

/**
 * Method used to convert a buffer into a base64 image string
 *
 * @param {*} Buffer buffer
 * @returns String Base64
 */
const bufferToBase64Image = (buffer) => {
	try {
		let buf = Buffer.from(buffer).toString("base64");
		return `data:image/jpg;base64,${buf}`;
	} catch (error) {
		throw Error(error.message);
	}
};

/**
 * Method used to upload the given image to cloudinary
 *
 * @param {*} String image
 * @param {*} Object uploadConfig
 * @returns Clodinary Object
 */
const uploadToCloudinary = async (imageString, uploadConfig) => {
	try {
		let image = await cloudinary.uploader.upload(imageString, uploadConfig);
		return image;
	} catch (error) {
		throw Error(error.message);
	}
};

module.exports = {
	singleUpload,
	uploadToCloudinary,
	bufferToBase64Image,
};
