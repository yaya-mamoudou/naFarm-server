const cloudinary = require('cloudinary').v2;

const {
	CLOUDINARY_API_SECRET,
	CLOUDINARY_API_KEY,
	CLOUDINARY_CLOUD_NAME,
} = require('@config/config');

cloudinary.config({
	cloud_name: CLOUDINARY_CLOUD_NAME,
	api_key: CLOUDINARY_API_KEY,
	api_secret: CLOUDINARY_API_SECRET,
});

const uploadTocloudinary = (path, folder) => {
	return cloudinary.uploader
		.upload(path, { folder })
		.then((data) => {
			return { url: data.url, public_id: data.public_id };
		})
		.catch((err) => {
			console.log(err);
		});
};

const removeFromCloudinary = async (public_id) => {
	await cloudinary.uploader.destroy(public_id, (err, result) => {
		console.log(result, error);
	});
};

module.exports = { uploadTocloudinary, removeFromCloudinary };
