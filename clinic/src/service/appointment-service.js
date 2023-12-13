import AppointmentRepository from '../database/repository/appointment-repository.js';
import DoctorRepository from '../database/repository/doctor-repository.js';

class AppointmentService {
	constructor() {
		this.repository = new AppointmentRepository();
		this.doctorRepository = new DoctorRepository();
	}

	async getAppointmentsByUserId(id) {
		return await this.repository.findAppointmentsByUserId(id);
	}

	async createAppointment(appointment) {
		const { 
			patientId,
			doctorId,
			patientName,
			doctorName,
			date,
			status,
			type,
			pricePaidByPatient,
			pricePaidToDoctor,
			availableSlotsIdx,
			patientFamilyMember,
			isValid,
		} = appointment;

		// deletes the available slot from the doctor's availableSlots array
		await this.doctorRepository.deleteSlot(doctorId, availableSlotsIdx);
		
		const appointmentModelData = {
			patientId,
			doctorId,
			patientName,
			doctorName,
			date,
			status,
			type,
			pricePaidByPatient: parseFloat(pricePaidByPatient),
			pricePaidToDoctor: parseFloat(pricePaidToDoctor)
		};
		if(patientFamilyMember){
			appointmentModelData.patientFamilyMember = patientFamilyMember;
		}
		return await this.repository.createAppointment(appointmentModelData);
	}

	async completeAppointment(appointmentId) {
		return await this.repository.completeAppointment(appointmentId);
	}

	async rescheduleAppointment(appointmentId, doctorId, availableSlotsIdx){
		
		const appointment = await this.repository.findAppointmentById(appointmentId);

		// add oldSlot to doctor available slots
		const dateFrom = appointment.date;
		const appointmentDoctor = await this.doctorRepository.addSlot(doctorId, dateFrom);

		// update the date of the appointment
		const newDate = new Date(appointmentDoctor.availableSlots[availableSlotsIdx].from);
		await this.repository.updateAppointmentDate(appointmentId, newDate);
		const updatedAppointment = await this.repository.updateAppointmentStatus(appointmentId, 'Rescheduled');

		// delete the newSlot from the doctor's availableSlots array
		await this.doctorRepository.deleteSlot(doctorId, availableSlotsIdx);
		
		return updatedAppointment;
	}

	async cancelAppointment(appointmentId, doctorId, appointmentDate){

		// add oldSlot to doctor available slots
		await this.doctorRepository.addSlot(doctorId, appointmentDate);
		
		// update appointment status
		const updatedAppointment = await this.repository.updateAppointmentStatus(appointmentId, 'Cancelled');
		return updatedAppointment;

		
	}
}

export default AppointmentService;
