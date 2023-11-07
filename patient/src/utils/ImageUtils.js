import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getImage = (folder, imageName) => {
	try {
		const imagePath = path.join(__dirname, 'upload', folder, imageName);
		return imagePath;
	} catch (error) {
		console.log('error in getImage: ',error.message);
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