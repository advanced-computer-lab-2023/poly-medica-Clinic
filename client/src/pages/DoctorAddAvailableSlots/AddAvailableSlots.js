import React, { useState, useEffect } from 'react';
import { Button, Fab } from '@mui/material';
// import MainCard from '../../ui-component/cards/MainCard';
import { useUserContext } from 'hooks/useUserContext'; 
import { clinicAxios } from '../../utils/AxiosConfig';
import { Add } from '@mui/icons-material';
//date picker
import { DatePicker } from '@mui/x-date-pickers';
import{ TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
//import swal from 'sweetalert';
 
import Swal from 'sweetalert2';






//doctor add available slots through this component from dateInput and timeInput
const DoctorAddAvailableSlots = () => {
    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);  
    
    const isButtonDisabled = !selectedDate || !selectedTime;
    // const selectedDate= new Date();
    // const selectedTime= new Date();

    //const [loading, setLoading] = useState(true);
    // const [newSlot, setNewSlot] = useState({
    //     from: '',
    //     until: '',
    // });
    const getTime = (date) => {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        return `${hours}:${minutes}:${seconds}`;

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
        const isIntersect = (from) => { 
            console.log('from'+' '+'chk');
                //copy from to until and add one hour to it
                const until = new Date(from.getTime() + 60 * 60 * 1000);
                console.log('fromchk'+' '+from);   
                console.log('utilchk'+' '+until);
                 
                
                for(let i = 0; i < availableSlots.length; i++) {
                    const slot = availableSlots[i];
                    const slotFrom = slot.from;
                    const slotUntil = slot.until;
                    console.log('slotFrom'+' '+slotFrom);
                    console.log('slotUntil'+' '+slotUntil);
                    if (
                        (from >= slotFrom && from < slotUntil) ||
                        (until > slotFrom && until <= slotUntil) ||
                        (from <= slotFrom && until >= slotUntil)
                    ) {
                        return true;
                    }
                } 
                console.log('false');                
                return false;
            };
    const handleSubmit = () => {
        //construct new date object from date and time
        const from = new Date(selectedDate);
        from.setHours(selectedTime.getHours());
        from.setMinutes(selectedTime.getMinutes());
        from.setSeconds(selectedTime.getSeconds());
        from.setMilliseconds(selectedTime.getMilliseconds()); 
        //check if the data intersect with the existing slots the date is one hour ahead
        if (isIntersect(from)) {
            
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
            });}
    };
    const handleSelectedDate = (date) => {
        setSelectedDate(date);
    };
    const handleSelectedTime = (time) => {
        setSelectedTime(time);
    };
    const getTodayDate = () => {
        const today = new Date(); 
        today.setDate(today.getDate() + 1);
        today.setHours(0, 0, 0, 0); // Set time to the beginning of the day
        return today;
      };


    return(
        <div> 
            <DatePicker 
             sx={{
                margin: '10px',
               
             }}  dateAdapter={AdapterDayjs}
              
             value={selectedDate} 
             onChange={handleSelectedDate}
			minDate={getTodayDate()}
            >

            <Fab color="primary" aria-label="add" size="small">
                <Add />
            </Fab> 
            <input type="text" required />
            </DatePicker>
            

            <TimePicker 
            sx={{
                margin: '10px',
               
             }}
             dateAdapter={AdapterDayjs} 
             
             value={selectedTime} 
             onChange={handleSelectedTime}
			minTime={getTodayDate()}>
            <Fab color="primary" aria-label="add" size="small">
                <Add />
            </Fab>
            <input type="text" required />
            </TimePicker>
          
            <br></br>
            
            <Button variant="contained" color="primary" sx={{
                margin: '10px',
               
             }}
             onClick={handleSubmit}
             disabled={isButtonDisabled} >
                Add New Slot
            </Button>             
           
        </div>


    ) ;


};
export default DoctorAddAvailableSlots;
