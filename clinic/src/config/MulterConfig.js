import multer from 'multer';
import path from 'path';
import fs from 'fs';

const getStorage = (folder) => {
	try {
		const folderPath = `./../clinic/src/utils/upload/${folder}`;
		if (!fs.existsSync(folderPath)) {
			fs.mkdirSync(folderPath, { recursive: true });
		}
		return multer.diskStorage({
			destination: (req, file, cb) => {
				cb(null, folderPath);
			},
			filename: function (req, file, cb) {
				cb(
					null,
					path.parse(file.originalname).name +
						Date.now() +
						path.extname(file.originalname),
				);
			},
		});
	} catch (error) {
		console.log(error);
	}
};

const upload = (folder) => {
	try {
		return multer({ storage: getStorage(folder) });
	} catch (error) {
		console.log(error);
	}
};

export default upload;
