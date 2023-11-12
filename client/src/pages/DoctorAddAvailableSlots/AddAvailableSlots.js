import React, { useState, useEffect } from 'react';
import { Typography ,Button } from '@mui/material';
 
import { useUserContext } from 'hooks/useUserContext'; 
import { clinicAxios } from '../../utils/AxiosConfig';
import { isIntersect,getTodayDate } from '../../utils/DoctorUtils'; 
import Swal from 'sweetalert2';
import TimeSelector from './TimeSelector';
import DateSelector from './DateSelector';
import AvailableSlotsTable from './AvailableSlotsTable'; 
 
const DoctorAddAvailableSlots = () => {
    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);   
    const isButtonDisabled = !selectedDate || !selectedTime|| selectedDate < getTodayDate(); 

    const { user } = useUserContext(); 
    useEffect(() => {
        clinicAxios.get(`/doctors/${user.id}/slots`)
            .then((res) => { 
                setAvailableSlots(res.data);
                
            })
            .catch((err) => {
                console.log(err);
            }
            );
            
    }
        , []);
        
    const onClick = () => {
         
        const from = new Date(selectedDate);  
        from.setHours(selectedTime.getHours());
        from.setMinutes(selectedTime.getMinutes());
        from.setSeconds(selectedTime.getSeconds());
        from.setMilliseconds(selectedTime.getMilliseconds());
          
        if (isIntersect(from,availableSlots)) {
           Swal.fire({
                title: 'Error!',
                text: 'The entered slot intersects with an existing slot',
                icon: 'error',
                button: 'OK',
            }); 
        }
        else{
        clinicAxios.post(`/doctors/${user.id}/slots`,{ from })
            .then((res) => { 
                  setAvailableSlots(res.data); 
            })
            .catch((err) => {
                console.log(err);
            });

            Swal.fire({
                title: 'Success!',
                text: 'The slot has been added successfully',
                icon: 'success',
                button: 'OK',
            });
        }
    };
    const handleSelectedDate = (date) => {
        setSelectedDate(date);
    };
    const handleSelectedTime = (time) => {
        setSelectedTime(time);
    };
    
       


    return(
        <> 
            <DateSelector selectedDate={selectedDate} handleSelectedDate={handleSelectedDate} />    
    
            <TimeSelector selectedTime={selectedTime} handleSelectedTime={handleSelectedTime} />
        
              <Typography marginLeft={
                '10px'
              } variant="caption" display="block" gutterBottom>
                Note: The slot duration is 1 hour
            </Typography>
 
        <Button variant="contained" color="primary" sx={{
                margin: '10px',
               
             }}
             onClick={ onClick }
             disabled={isButtonDisabled} >
                Add New Slot
            </Button>  
            {/*add header to the Table    */}

            <Typography marginLeft={
                '10px'
              } 
              fontSize={20} 
              variant="caption" display="block" gutterBottom>
                The available slots
            </Typography>

           <AvailableSlotsTable  availableSlots={availableSlots}/>
        </>
    ) ; 
};
export default DoctorAddAvailableSlots;
