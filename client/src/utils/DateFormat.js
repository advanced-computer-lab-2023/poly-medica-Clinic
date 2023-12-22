import moment from 'moment/moment';
import { DATE_FORAMT } from 'utils/Constants';
export const formatDate = (date) => {
	const momentDate = new moment(date);
	return momentDate.format(DATE_FORAMT);
};

export const formatDoctorDate = (dateString) => {
	const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
	return new Date(dateString).toLocaleDateString(undefined, options);
};