import AppointmentModel from '../models/Appointment.js';
import DoctorModel from '../models/Doctor.js';
import { ONE, SIXTY, THOUSAND } from '../../utils/Constants.js';

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

	async addAvailableSlots(doctorId, newAvailableSlot) { 
		const doctor = await DoctorModel.findById(doctorId);
		const doctorAvailableSlots = doctor.availableSlots;
		doctorAvailableSlots.push(newAvailableSlot);
		await DoctorModel.findByIdAndUpdate(doctorId, { availableSlots: doctorAvailableSlots });


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
		
		const appointment = await AppointmentModel.findByIdAndDelete(id);
		const from = appointment.date;
		const doctorId = appointment.doctorId;
		const until = new Date(from.getTime() + THOUSAND * SIXTY * SIXTY ); 
		const availableSlot = {
			from,
			until,
		};
		await this.addAvailableSlots(doctorId, availableSlot);
		return appointment;
		
	}
}

export default AppointmentRepository;
