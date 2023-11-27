import AppointmentModel from '../models/Appointment.js';
import DoctorModel from '../models/Doctor.js';
import { ONE } from '../../utils/Constants.js';

class AppointmentRepository {
	
	async findAppointmentsByUserId(id) {
		const appointments = await AppointmentModel.find({});
		console.log(appointments);
		return appointments.filter(
			(appointment) =>
				(appointment.patientId.toString() === id.toString() ||
                appointment.doctorId.toString() === id.toString()) && appointment.isValid
		);
	}

	async createAppointment(appointment) {
		const newAppointment = new AppointmentModel(appointment);
		return await newAppointment.save();
	}

	
	async updateAvailableSlots(doctorId, availableSlotsIdx) {
		const doctor = await DoctorModel.findById(doctorId);
		// await printAllDoctors();
		const availableSlots = doctor.availableSlots;
		availableSlots.splice(availableSlotsIdx, ONE);
		await DoctorModel.findByIdAndUpdate(doctorId, { availableSlots });
	}

	async updateAppointment(id, appointment) {
		
		const updatedAppointment = await AppointmentModel.findByIdAndUpdate(
			id,
			appointment,
			{ new: true }
		);
		return updatedAppointment;
	}
	async deleteAppointment(id) {
		//add the available slot back to the doctor's availableSlots array
		//then remove the appointment
	
		const appointment = await AppointmentModel.findByIdAndDelete(id);
		const doctorId = appointment.doctorId;
		const availableSlotsIdx = appointment.availableSlotIdx;
		await this.updateAvailableSlots(doctorId, availableSlotsIdx);
		return appointment;
	}
}

export default AppointmentRepository;
