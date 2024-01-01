import React, {  useEffect } from 'react';
import { Typography, Button } from '@mui/material';

import { useUserContext } from 'hooks/useUserContext';
import { isIntersect, getTodayDate } from '../../../utils/DoctorUtils';
import Swal from 'sweetalert2';
import TimeSelector from '../../../ui-component/pickers/TimeSelector';
import DateSelector from '../../../ui-component/pickers/DateSelector';
import AvailableSlotsTable from './AvailableSlotsTable';
import { addDoctorSlot, getDoctorSlots } from 'api/DoctorAPI';
import { useDoctorContext } from 'hooks/useDoctorContext';

const DoctorAddAvailableSlots = () => {

    const { availableSlots, setAvailableSlots, selectedDate, setSelectedDate, selectedTime, setSelectedTime } = useDoctorContext();
    
    const { user } = useUserContext();

    const isButtonDisabled = !selectedDate || !selectedTime || selectedDate < getTodayDate();

    useEffect(() => {
        getDoctorSlots(user)
            .then((res) => {
                setAvailableSlots(res);

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

        if (isIntersect(from, availableSlots)) {
            Swal.fire({
                title: 'Error!',
                text: 'The entered slot intersects with an existing slot',
                icon: 'error',
                button: 'OK',
            });
        }
        else {
            addDoctorSlot(from, user)
                .then((res) => {
                    setAvailableSlots(res);
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

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <section>
                    <Typography
                        marginLeft={'10px'}
                        fontSize={20}
                        variant="caption"
                        display="block"
                        gutterBottom
                    >
                        My available slots
                    </Typography>
                    <AvailableSlotsTable />
                </section>

                <section style={{ marginTop: '5em' }}>
                    <section style={{ display: 'flex', flexDirection: 'column' }}>
                        <DateSelector selectedDate={selectedDate} handleSelectedDate={handleSelectedDate} />
                        <TimeSelector selectedTime={selectedTime} handleSelectedTime={handleSelectedTime} />
                    </section>

                    <section style={{ marginLeft: '0.6em' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ margin: '10px' }}
                            onClick={onClick}
                            disabled={isButtonDisabled}
                        >
                            Add New Slot
                        </Button>
                        <Typography
                            marginLeft={'10px'}
                            variant="caption"
                            display="block"
                            gutterBottom
                        >
                            Kindly note that the slot duration is 1 hour
                        </Typography>
                    </section>
                </section>
            </div>
        </>
    );
};
export default DoctorAddAvailableSlots;
