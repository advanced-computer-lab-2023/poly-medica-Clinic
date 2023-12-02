import { patientAxios, doctorAxios } from '../pages/utilities/AxiosConfig.js';

export const isSender = (id, message) => {
    return id === message.sender;
};

export const getReceiverId = (userId, users) => {
    return users[0].id === userId ? users[1].id : users[0].id;
};

export const getReceiver = (userId, users) => {
    return users[0].id === userId ? users[1] : users[0];
};

export const getUserName = async (user) => {
    if (user.userType === 'Patient') {
        const name = await getPatientName(user.id);
        return name;
    } else if (user.userType === 'Doctor') {
        const name = await getDoctorName(user.id);
        return name;
    } else {
        return 'Pharmacy';
    }
};

const getPatientName = async (id) => {
    try {
        const response = await patientAxios.get(`/patients/${id}`);
        return response.data.patient.name;
    } catch (err) {
        console.log(err);
    }
};

const getDoctorName = async (id) => {
    try {
        const response = await doctorAxios.get(`/doctor/${id}`);
        return response.data.doctor.userData.name;
    } catch (err) {
        console.log(err);
    }
};

export const chatExist = (chats, user1ID, user2ID) => {
    for (let i = 0; i < chats.length; i++) {
        if (
            chats[i].users[0].id === user1ID &&
            chats[i].users[1].id === user2ID
        )
            return true;
    }
    return false;
};
