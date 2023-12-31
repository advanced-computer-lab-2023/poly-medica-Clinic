import { clinicAxios, communicationAxios, patientAxios } from 'utils/AxiosConfig';
import {
    DOCTOR_TYPE_ENUM,
    PHARMACIST_TYPE_ENUM,
    PHARMACY_MONGO_ID,
} from 'utils/Constants';


export const getDoctor = async (id) => {
    const response = await clinicAxios.get(`/doctor/${id}`);
    return response.data;
};

export const getDoctors = async () => {
    const response = await clinicAxios.get('/doctors');
    return response.data;
};

export const deleteDoctor = async (doctorToDelete) => {
    const response = await clinicAxios.delete(`/doctors/${doctorToDelete}`);
    return response.data;
};

export const addDoctor = async (doctorReq) => {
    const response = await clinicAxios.post('/doctors', JSON.stringify(doctorReq), {
        headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
};

export const getDoctorSlots = async (user) => {
    const response = await clinicAxios.get(`/doctors/${user.id}/slots`);
    return response.data;
};

export const addDoctorSlot = async (from, user) => {
    const response = await clinicAxios.post(`/doctors/${user.id}/slots`, { from });
    return response.data;
};

export const getAppointments = async (id) => {
    const response = await clinicAxios.get(`/appointments/${id}`);
    return response.data;
};

export const addAppointment = async (appointment) => {
    const response = await clinicAxios
        .post('/appointments', { items: appointment });
    return response.data;
};

export const getDoctorPatients = async (id) => {
    const response = await clinicAxios
        .get('/doctors/' + id + '/patients');
    return response.data;
};

export const getDoctorStatus = async (id) => {
    const response = await clinicAxios.get('doctors/' + id + '/status');
    return response.data;
};

export const updateDoctorStatus = async (id) => {
    const response = await clinicAxios.post('doctors/' + id + '/status');
    return response.data;

};

export const addDoctorChat = async (doctor) => {
    await communicationAxios.post('/chat', {
        chat: {
            chatName: 'Pharmacy',
            users: [
                {
                    id: PHARMACY_MONGO_ID,
                    userType: PHARMACIST_TYPE_ENUM,
                },
                {
                    id: doctor._id,
                    userType: DOCTOR_TYPE_ENUM,
                },
            ],
        },
    });
};

export const updatePrescription = async (selectedEditPrescription) => {
    const response = await patientAxios.patch('/prescriptions/' + selectedEditPrescription._id, {
        prescription: selectedEditPrescription,
    });
    return response.data;
};

export const createPrescription = async (prescription) => {
    const response = await patientAxios.post('/prescriptions', { prescription });
    return response.data;
};