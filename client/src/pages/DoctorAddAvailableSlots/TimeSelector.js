 
 import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Fab } from '@mui/material';
import { Add } from '@mui/icons-material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { getTodayDate } from '../../utils/DoctorUtils';


const TimeSelector = ({ selectedTime, handleSelectedTime }) => {


    return (
        <TimePicker 
            sx={{
                margin: '10px',
               
             }}    
             dateAdapter={AdapterDayjs} 
             
             value={selectedTime}  
             
             onChange={(time) => handleSelectedTime(time)}
			minTime={getTodayDate()}>
            <Fab color="primary" aria-label="add" size="small">
                <Add />
            </Fab>
            <input type="text" required />
            </TimePicker>
    );
};

export default TimeSelector;


