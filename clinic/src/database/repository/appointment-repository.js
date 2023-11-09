import AppointmentModel from '../models/Appointment.js';

class AppointmentRepository {
    async findAppointmentsByUserId(id) {
        const appointments = await AppointmentModel.find({});
        console.log(appointments);
        return appointments.filter(
            (appointment) =>
                appointment.patientId.toString() === id.toString() ||
                appointment.doctorId.toString() === id.toString()
        );
    }
}

export default AppointmentRepository;
