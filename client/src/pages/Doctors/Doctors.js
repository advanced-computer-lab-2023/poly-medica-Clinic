import { useState, useEffect } from 'react';
import { doctorAxios } from 'pages/utilities/AxiosConfig';
import MainCard from 'ui-component/cards/MainCard';
import DoctorList from './DoctorList.js';
import DoctorDetails from './DoctorDetails.js';

const Doctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    useEffect(() => {
        doctorAxios
            .get('/doctors')
            .then((response) => {
                setDoctors(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleDialogClose = () => {
        setSelectedDoctor(null);
    };

    return (
        <MainCard title='Doctors'>
            <DoctorList
                doctors={doctors}
                setSelectedDoctor={setSelectedDoctor}
            />
            <DoctorDetails
                selectedDoctor={selectedDoctor}
                handleDialogClose={handleDialogClose}
            />
        </MainCard>
    );
};

export default Doctors;
