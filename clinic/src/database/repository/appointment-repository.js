import AppointmentModel from '../models/Appointment.js';
import DoctorModel from '../models/Doctor.js';
import { ONE } from '../../utils/Constants.js';

// const printAllDoctors = async () => {
// 	const num = 0;
// 	const docs = await DoctorModel.find({});
// 	console.log('docsLen', docs.length, 'num', num);
// 	docs.forEach((doc) => {
// 		console.log('doc', doc);
// 	});
// };

class AppointmentRepository {
	async findAppointmentsByUserId(id) {
		const appointments = await AppointmentModel.find({});
		return appointments.filter((appointment) =>
			appointment.patientId.toString() === id.toString() || appointment.doctorId.toString() === id.toString()
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
}

export default AppointmentRepository;
