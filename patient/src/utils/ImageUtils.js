import path from 'path';
import { fileURLToPath } from 'url';
//import { ZERO_INDEX, ONE } from './Constants.js';
import fs from 'fs';
const currentFilePath = getFileUrl();
const __filename = fileURLToPath(currentFilePath);
const __dirname = path.dirname(__filename);

function getFileUrl() {
	//retun meta data of the current file
	return import.meta.url;
}

export const getImage = (folder, imageName) => {
	try {
		const imagePath = path.join(__dirname, 'upload', folder, imageName);
		return imagePath;
	} catch (error) {
		console.log('error in getImage: ', error.message);
	}
};

export const deleteImage = (folder, imageName) => {
	try {
		const imagePathToDelete = `./utils/upload/${folder}/${imageName}`;
		fs.unlinkSync(imagePathToDelete);
	} catch (err) {
		console.log('error in deleting task');
	}
};