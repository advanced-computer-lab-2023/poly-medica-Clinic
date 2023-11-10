import React, { useState, useEffect } from 'react';
import { Typography ,Button, Fab,   Table,TableBody, TableCell, TableContainer, TableHead, TableRow, Paper  } from '@mui/material';
 
import { useUserContext } from 'hooks/useUserContext'; 
import { clinicAxios } from '../../utils/AxiosConfig';
import { Add } from '@mui/icons-material'; 
import { DatePicker } from '@mui/x-date-pickers';
import{ TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { isIntersect } from '../../utils/DoctorUtils';
 
import Swal from 'sweetalert2';
 
const DoctorAddAvailableSlots = () => {
    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);   
    const isButtonDisabled = !selectedDate || !selectedTime; 

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
    const getTodayDate = () => {
        const today = new Date(); 
        today.setDate(today.getDate() + 1);
        today.setHours(0, 0, 0, 0);  
        return today;
      };
       


    return(
        <> 
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

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>From</TableCell>
                            <TableCell>Until</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(availableSlots) &&
                            availableSlots.map((slot) => (
                                <TableRow key={slot.from}>
                                    <TableCell> 
                                        {new Date(slot.from).toLocaleString()}
                                    </TableCell>
                                    <TableCell>
                                        {new Date(slot.until).toLocaleString()}
                                    </TableCell>
                                </TableRow>

                            ))}

                    </TableBody>
                </Table>

                                
            </TableContainer>
        </>
    ) ; 
};
export default DoctorAddAvailableSlots;
