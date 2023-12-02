import AppointmentModel from '../models/Appointment.js';
import DoctorModel from '../models/Doctor.js';
import { ONE } from '../../utils/Constants.js';

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

	async createAppointment(appointment) {
		const newAppointment = new AppointmentModel(appointment);
		return await newAppointment.save();
	}

	// deletes the available slot from the doctor's availableSlots array
	async updateAvailableSlots(doctorId, availableSlotsIdx) {
		const doctor = await DoctorModel.findById(doctorId);
		// await printAllDoctors();
		const availableSlots = doctor.availableSlots;
		availableSlots.splice(availableSlotsIdx, ONE);
		await DoctorModel.findByIdAndUpdate(doctorId, { availableSlots });
	}

	async completeAppointment(appointmentId) {
		const appointment = await AppointmentModel.findById(appointmentId);
		appointment.status = 'Complete';
		return await appointment.save();
	}
}

export default AppointmentRepository;
