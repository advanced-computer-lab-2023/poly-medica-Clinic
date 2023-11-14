import moment from 'moment/moment';
import { DATE_FORAMT } from 'utils/Constants';
export const formatDate = (date) => {
	const momentDate = new moment(date);
	return momentDate.format(DATE_FORAMT);
};
