import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
const currentFilePath = getFileUrl();
const __filename = fileURLToPath(currentFilePath);
const __dirname = path.dirname(__filename);

function getFileUrl() {
	const stackTraceFrames = String(new Error().stack)
		.replace(/^Error.*\n/, '')
		.split('\n');
	const callerFrame = stackTraceFrames[0];
	let url = callerFrame.match(/\(([^)]+\.js)/);
	if (url) url = url[1];
	return url.startsWith('file:///')
		? url.replace(/\\/g, '/')
		: 'file:///' + url.replace(/\\/g, '/');
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

export const getFile = (folder, fileName) => {
	try {
		const filePath = path.join(__dirname, 'upload', folder, fileName);
		return filePath;
	} catch (error) {
		console.log('error in getFile: ', error.message);
	}
};

export const deleteFile = (folder, fileName) => {
	try {
		const filePathToDelete = path.join(__dirname, 'upload', folder, fileName);
		console.log('filePathToDelete', filePathToDelete);
		fs.unlinkSync(filePathToDelete);
	} catch (err) {
		throw new Error('error in deleting file');
	}
};
