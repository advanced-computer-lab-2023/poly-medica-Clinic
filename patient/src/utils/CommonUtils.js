import dayjs from 'dayjs';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import { FOURTEEN, TWELVE, HALF, ONE, ZERO_INDEX } from './Constants.js';
import path from 'path';
import { fileURLToPath } from 'url';
const currentFilePath = getFileUrl();
const __filename = fileURLToPath(currentFilePath);
const __dirname = path.dirname(__filename);

function getFileUrl() {
	const stackTraceFrames = String(new Error().stack)
		.replace(/^Error.*\n/, '')
		.split('\n');
	const callerFrame = stackTraceFrames[ZERO_INDEX];
	let url = callerFrame.match(/\(([^)]+\.js)/);
	if (url) url = url[ONE];
	return url.startsWith('file:///')
		? url.replace(/\\/g, '/')
		: 'file:///' + url.replace(/\\/g, '/');
}

export const getFile = (folder, fileName) => {
	try {
		const filePath = path.join(__dirname, 'upload', folder, fileName);
		return filePath;
	} catch (error) {
		console.log('error in getFile: ', error.message);
	}
};

export const generatePrescriptionPDF = async (prescription, date) => {
	const directory = 'src/utils/upload/prescriptions';

	if (!fs.existsSync(directory)) {
		fs.mkdirSync(directory, { recursive: true });
	}

	const filePath = path.join(
		directory,
		`prescription-${date}-${prescription._id}.pdf`,
	);

	const doc = new PDFDocument();
	const stream = fs.createWriteStream(filePath);

	const pdfPromise = new Promise((resolve, reject) => {
		doc.pipe(stream);

		doc
			.fontSize(FOURTEEN)
			.text('Prescription Details', { align: 'center' })
			.moveDown(HALF);
		doc.fontSize(TWELVE).text(`Doctor: ${prescription.doctorName}`);
		doc.text(`Date: ${dayjs(prescription.date)}`);
		doc.text(`Description: ${prescription.description}`).moveDown(HALF);

		doc.fontSize(TWELVE).text('Medicines:');
		prescription.medicines.forEach((medicine, index) => {
			doc.text(
				`${index + ONE}. Medicine Name: ${medicine.name}, Amount: ${
					medicine.amount
				}`,
			);
		});

		doc.end();

		stream.on('finish', resolve);
		stream.on('error', reject);
	});

	await pdfPromise;
};
