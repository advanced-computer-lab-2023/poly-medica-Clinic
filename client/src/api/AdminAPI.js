import { authenticationAxios, clinicAxios } from 'utils/AxiosConfig';

export const getAdmins = async () => {
    const response = await clinicAxios.get('/admins');
    return response.data;
};

export const addAdmin = async (newAdmin) => {

    const response = await authenticationAxios.post('/admins/clinic', JSON.stringify(newAdmin), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;

};

export const deleteAdmin = async (adminToDelete) => {
    const response = await clinicAxios.delete(`/admins/${adminToDelete}`);
    return response.data;
};

export const getHealthPackages = async () => {
    const response = await clinicAxios.get('/packages');
    return response.data;
};

export const addHealthPackage = async (newPackage) => {
    const response = await clinicAxios.post('/packages', { newPackage });
    return response.data;
};

export const updateHealthPackage = async (selectedEditPackage) => {
    const response = await clinicAxios.patch(`/package/${selectedEditPackage._id}`, { selectedEditPackage });
    return response.data;
};

export const deleteHealthPackage = async (healthPackage) => {
    const response = await clinicAxios.delete(`/packages/${healthPackage._id}`);
    return response.data;
};