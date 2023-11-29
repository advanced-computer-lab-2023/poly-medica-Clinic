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
			patientFamilyMember
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

	async rescheduleAppointment(appointmentId, doctorId, availableSlotsIdx){
		
		const appointment = await this.repository.findAppointmentById(appointmentId);

		// add oldSlot to doctor available slots
		const dateFrom = appointment.date;
		const appointmentDoctor = await this.doctorRepository.addSlot(doctorId, dateFrom);

		// update the date of the appointment
		const newDate = new Date(appointmentDoctor.availableSlots[availableSlotsIdx].from);
		const updatedAppointment = await this.repository.updateAppointmentDate(appointmentId, newDate);

		// delete the newSlot from the doctor's availableSlots array
		await this.doctorRepository.deleteSlot(doctorId, availableSlotsIdx);
		
		return updatedAppointment;
	}
}

export default AppointmentService;
