
import React from 'react';
import { Fab } from '@mui/material';
import { Add } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { getTodayDate } from '../../utils/DoctorUtils';



const DateSelector = ({ selectedDate, handleSelectedDate }) => {


    return (
        <DatePicker 
             sx={{
                margin: '10px',
               
             }} 
             
              dateAdapter={AdapterDayjs}
              
             value={selectedDate} 
             onChange={(date) => handleSelectedDate(date)}
             timezone='Africa/Cairo'
			minDate={getTodayDate()}
            >

            <Fab color="primary" aria-label="add" size="small">
                <Add />
            </Fab> 
            <input type="text" required />
            </DatePicker>
    );
};

export default DateSelector;