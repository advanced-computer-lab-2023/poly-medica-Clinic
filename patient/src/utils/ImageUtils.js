import path from 'path';
import { fileURLToPath } from 'url';
//import { ZERO_INDEX, ONE } from './Constants.js';
import fs from 'fs';
//const currentFilePath = getFileUrl();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// function getFileUrl() {
// 	const stackTraceFrames = String(new Error().stack)
// 		.replace(/^Error.*\n/, '')
// 		.split('\n');
// 	const callerFrame = stackTraceFrames[ZERO_INDEX];
// 	let url = callerFrame.match(/\(([^)]+\.js)/);
// 	if (url) url = url[ONE];
// 	return url.startsWith('file:///') ? url.replace(/\\/g, '/') : 'file:///' + url.replace(/\\/g, '/');
// }

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