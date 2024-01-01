import { useState, useEffect } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import DoctorList from './DoctorList.js';
import DoctorDetails from './DoctorDetails.js';
import { useFilter } from 'contexts/FilterContext.js';
import { useSearch } from 'contexts/SearchContext.js';
import { isDateInAvailableSlots } from 'utils/AppointmentUtils.js';
import { useLocation } from 'react-router-dom';
import { useDoctorContext } from 'hooks/useDoctorContext.js';
import { usePatientContext } from 'hooks/usePatientContext.js';
import { getDoctors } from 'api/DoctorAPI.js';
import { getPatient, getPatientHealthPackage } from 'api/PatientAPI.js';
import { useSelector } from 'react-redux';
const Doctors = () => {
    const { user } = useSelector(state => state.user);
    const patientID = user.id;
    const { setDoctors, originalDoctors, setOriginalDoctors, setSelectedDoctor } = useDoctorContext();
    const { setLoggedInPatient, setLoggedInPatientHealthPackage } = usePatientContext();
    const [isLoaded, setIsLoaded] = useState(false);
    const [redirected, setRedirceted] = useState(false);
    const { filterData, updateFilter } = useFilter();
    const { searchQuery } = useSearch();
    const specialities = [];
    const location = useLocation();

    useEffect(() => {
        getDoctors()
            .then((response) => {
                setDoctors(response);
                setOriginalDoctors(response);
                for (let i = 0; i < response.length; i++) {
                    const doctor = response[i];
                    specialities.push(doctor.speciality);
                }
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

    useEffect(() => {
        getPatient(patientID)
            .then((response) => {
                const patient = response.patient;
                const filteredMembers = patient.familyMembers.filter(member => !member.id);
                patient.familyMembers = filteredMembers;
                setLoggedInPatient(patient);
            });
    }, []);

    useEffect(() => {
        getPatientHealthPackage(patientID)
            .then((response) => {
                let healthPackage = {
                    doctorDiscount: 0
                };
                const healthPackages = response.healthPackages;
                if (healthPackages.length) {
                    healthPackage = healthPackages[0];
                }
                setLoggedInPatientHealthPackage(healthPackage);
                setIsLoaded(true);
            });
    }, []);

    return (
        isLoaded
        &&
        <MainCard title='Doctors'>
            <DoctorList />
            {redirected && <DoctorDetails />
            }
            <DoctorDetails />
        </MainCard>
    );
};

export default Doctors;
