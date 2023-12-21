import { clinicAxios, communicationAxios } from 'utils/AxiosConfig';
import {
    DOCTOR_TYPE_ENUM,
    PHARMACIST_TYPE_ENUM,
    PHARMACY_MONGO_ID,
} from 'utils/Constants';

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

export const addDoctorChat = async (doctor) => {
    communicationAxios.post('/chat', {
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