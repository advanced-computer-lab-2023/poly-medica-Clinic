import { patientAxios, clinicAxios } from 'utils/AxiosConfig';

export const getPatients = async () => {
    const response = await patientAxios.get('/patients');
    return response.data;
};

export const deletePatient = async (patientToDelete) => {
    const response = await clinicAxios.delete(`/patients/${patientToDelete}`);
    return response.data;
};