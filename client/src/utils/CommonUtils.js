export const downloadDocument = (data) => {
	const blob = new Blob([data], { type: 'application/octet-stream' });
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = document.documentName;
	a.click();
	URL.revokeObjectURL(url);
};
