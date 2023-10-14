import AppointmentModel from '../models/Appointment.js';
import mongoose from 'mongoose';

class AppointmentRepository {
    async findAppointmentsByUserId(id) {
        const userID = new mongoose.Types.ObjectId(id);
        const appointments = await AppointmentModel.find({
            $or: [{ patientId: userID }, { doctorId: userID }],
        });
        return appointments;
    }
}

export default AppointmentRepository;
