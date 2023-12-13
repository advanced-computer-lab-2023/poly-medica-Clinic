export const calcAge = (dateOfBirth) => {
	const today = new Date();
	const birthDate = new Date(dateOfBirth);
	return today.getFullYear() - birthDate.getFullYear();
};