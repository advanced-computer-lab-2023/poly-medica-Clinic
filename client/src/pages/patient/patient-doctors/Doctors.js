import { useState, useEffect } from 'react';
import { doctorAxios, patientAxios } from 'pages/utilities/AxiosConfig';
import MainCard from 'ui-component/cards/MainCard';
import DoctorList from './DoctorList.js';
import DoctorDetails from './DoctorDetails.js';
import { useUserContext } from 'hooks/useUserContext';
import { useFilter } from 'contexts/FilterContext.js';
import { useSearch } from 'contexts/SearchContext.js';
import { isDateInAvailableSlots } from 'utils/AppointmentUtils.js';
import { useLocation } from 'react-router-dom';


const Doctors = () => {
    const { user } = useUserContext();
    const patientID = user.id;
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [originalDoctors, setOriginalDoctors] = useState([]);
    const [loggedInPatient, setLoggedInPatient] = useState(null);
    const [loggedInPatientHealthPackage, setLoggedInPatientHealthPackage] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [redirected, setRedirceted] = useState(false);
    const { filterData, updateFilter } = useFilter();
    const { searchQuery } = useSearch();
    const specialities = [];
    const location = useLocation();
    useEffect(() => {
        doctorAxios
            .get('/doctors')
            .then((response) => {
                setDoctors(response.data);
                setOriginalDoctors(response.data);
                for (let i = 0; i < response.data.length; i++) {
                    const doctor = response.data[i];
                    specialities.push(doctor.speciality);
                }
                console.log(response);
                updateFilter([
                    {
                        attribute: 'Speciality',
                        values: specialities,
                    },
                    {
                        attribute: 'Available Slots',
                    },
                    {
                        attribute: 'Search Method',
                        values: ['Name', 'Speciality', 'Both'],
                    },
                ]);
            })
            .catch((error) => {
                console.log(error);
            });

        if (location.state) {
            setSelectedDoctor(location.state.selectedDoctor);
            setRedirceted(true);
        }
    }, []);

    const applySelectedSearch = (doctor, value) => {
        if (value === 'Name') {
            return doctor.userData.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
        } else if (value === 'Speciality') {
            return doctor.speciality
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
        } else {
            return (
                doctor.userData.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                doctor.speciality
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
            );
        }
    };

    useEffect(() => {
        const filteredDoctors = originalDoctors.filter(
            (doctor) =>
                applySelectedSearch(
                    doctor,
                    filterData[2].selectedValue || 'Both'
                ) &&
                (!filterData[0].selectedValue ||
                    doctor.speciality.toString() ===
                    filterData[0].selectedValue.toString()) &&
                (!filterData[1].selectedValue ||
                    isDateInAvailableSlots(
                        new Date(filterData[1].selectedValue),
                        doctor.availableSlots
                    ))
        );

        setDoctors(filteredDoctors);
    }, [filterData, originalDoctors, searchQuery]);

    const handleDialogClose = () => {
        setSelectedDoctor(null);
    };

    useEffect(() => {
        patientAxios
            .get(`/patients/${patientID}`)
            .then((response) => {
                const patient = response.data.patient;
                const filteredMembers = patient.familyMembers.filter(member => !member.id);
                patient.familyMembers = filteredMembers;
                setLoggedInPatient(patient);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        patientAxios
            .get(`/patient/${patientID}/health-packages`)
            .then((response) => {
                let healthPackage = {
                    doctorDiscount: 0
                };
                const healthPackages = response.data.healthPackages;
                if (healthPackages.length) {
                    healthPackage = healthPackages[0];
                }
                setLoggedInPatientHealthPackage(healthPackage);
                setIsLoaded(true);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        isLoaded
        &&
        <MainCard title='Doctors'>
            <DoctorList
                doctors={doctors}
                setSelectedDoctor={setSelectedDoctor}
                loggedInPatientHealthPackage={loggedInPatientHealthPackage}
            />
            {redirected && <DoctorDetails
                selectedDoctor={selectedDoctor}
                handleDialogClose={handleDialogClose}
                loggedInPatient={loggedInPatient}
                loggedInPatientHealthPackage={loggedInPatientHealthPackage}
            />
            }
            <DoctorDetails
                selectedDoctor={selectedDoctor}
                handleDialogClose={handleDialogClose}
                loggedInPatient={loggedInPatient}
                loggedInPatientHealthPackage={loggedInPatientHealthPackage}
            />
        </MainCard>
    );
};

export default Doctors;
