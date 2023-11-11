import { format } from 'date-fns';

// used for formatting date in booking an appointment and scheduling a follow up

// assuming that from and until have the same day
export const getDay = (date) => {
    return format(new Date(date), 'd MMM, yyyy');
};
export const getTime = (date) => {
    //Note: localizes the date 
    //   adds 2 hours to the time considering our location and assuming given is GMT 
    return format(new Date(date), 'p');
};