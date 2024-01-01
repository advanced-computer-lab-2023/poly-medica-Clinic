import { patientAxios, clinicAxios } from 'utils/AxiosConfig';

export const getPatient = async (patientID) => {
    const response = await patientAxios.get(`/patients/${patientID}`);
    return response.data;
};

export const getPatientHealthPackage = async (patientID) => {
    const response = await patientAxios.get(`/patient/${patientID}/health-packages`);
    return response.data;
};

export const getPatients = async () => {
    const response = await patientAxios.get('/patients');
    return response.data;
};

export const deletePatient = async (patientToDelete) => {
    const response = await clinicAxios.delete(`/patients/${patientToDelete}`);
    return response.data;
};

export const getFamilyMembers = async (userId) => {
    const response = await patientAxios.get('/family-members/' + userId);
    return response.data;
};

export const updateFamilyMembers = async (userId, newMember) => {
    const response = await patientAxios.patch('/family-members/' + userId, { member: newMember });
    return response.data;
};

export const getPatientDiscount = async (user) => {
    const response = await patientAxios.get(`/patient/${user.id}/discount`);
    return response.data;
};

export const updateHealthPackageStatus = async (user, subscribedPackage) => {
    const response = await patientAxios.patch(`patient/${user.id}/health-packages/${subscribedPackage.packageId}`);
    return response.data;
};

export const getPatientPrescription = async (patientID) => {
    const response = await patientAxios.get(`patient/${patientID}/prescriptions`);
    return response.data;
};