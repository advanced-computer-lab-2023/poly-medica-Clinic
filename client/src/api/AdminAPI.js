import { authenticationAxios, clinicAxios } from 'utils/AxiosConfig';

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
