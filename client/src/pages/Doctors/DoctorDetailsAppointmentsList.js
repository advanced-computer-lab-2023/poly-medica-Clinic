import { Grid } from '@mui/material';
import DoctorDetailsAppointmentsCard from './DoctorDetailsAppointmentsCard';

const DoctorDetailsAppointmentsList = ({ selectedDoctor, pateintId }) => {
    const { availableSlots } = selectedDoctor;
    return (
        <>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {Array.isArray(availableSlots) && availableSlots.map((slot, index) => (
                    <Grid item key={index} xs={4} sm={6}>
                        <DoctorDetailsAppointmentsCard
                            selectedDoctor={selectedDoctor}
                            availableSlotsIdx={index}
                            patientId={pateintId}
                        />
                    </Grid>
                ))}
            </Grid>
        </>

	);
};

export default DoctorDetailsAppointmentsList;