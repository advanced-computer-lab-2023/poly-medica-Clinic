import React, { useState, useEffect } from 'react';
import { Fab } from '@mui/material';
import MainCard from '../ui-component/cards/MainCard';
import { clinicAxios } from '../utils/AxiosConfig';
import HealthPackagesList from './HealthPackagesList';
import { Add } from '@mui/icons-material';

import AddHealthPackages from './AddHealthPackages';
//import EditHealthPackages from './EditMedicine';
//import { useSearch } from 'contexts/SearchContext';

const HealthPackages = () => {
	const [packages, setPackage] = useState([]);
	//const [originalPackages, setOriginalPackages] = useState([]);
	//const { searchQuery } = useSearch();
	//const [selectedPackages, setSelectedPackages] = useState(null);
	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
	const [loading, setLoading] = useState(true);
	const [newPackage, setNewPackage] = useState({
		name: '',
		price: '',
		discountOfDoctor: '',
		discountOfMedicin: '',
		discountOfFamily: '',
	});
	//const [selectedEditPackages, setSelectedEditPackages] = useState(null);
	//const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

	useEffect(() => {
		clinicAxios.get('/packages')
			.then((response) => {
				setPackage(response.data.allPackages);
				console.log('====================================');
				console.log(response.data.allPackages);
				console.log('====================================');
				setLoading(false);
				//setOriginalPackages(response.data.packages);
			})
			.catch(error => {
				console.log(error);
				setLoading(true);
			});
	}, []);

	// useEffect(() => {
	// 	const filteredMedicines = originalMedicines.filter((medicine) =>
	// 		medicine.name.toLowerCase().includes(searchQuery.toLowerCase())
	// 	);
	// 	setMedicines(filteredMedicines);
	// }, [searchQuery, originalMedicines]);

	// const handleDialogClose = () => {
	// 	setSelectedMedicine(null);
	// };

	const handleAddDialogOpen = () => {
		setIsAddDialogOpen(true);
	};

	const handleAddDialogClose = () => {
		setIsAddDialogOpen(false);
		setNewPackage({
			name: '',
			price: '',
			discountOfDoctor: '',
			discountOfMedicin: '',
			discountOfFamily: '',
		});
	};

	const handleFormInputChange = (e) => {
		const { name, value } = e.target;
		setNewPackage((prevPackage) => ({
			...prevPackage,
			[name]: value,
		}));
	};


	const handleAddPackages = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('newPackage', JSON.stringify(newPackage));

		clinicAxios.post('/packages', formData).then((response) => {
			const newPackageData = response.data;
			setPackage((prevPackage) => [...prevPackage, newPackageData]);
			handleAddDialogClose();
		})
			.catch((error) => {
				console.log('Error adding medicine:', error);
				handleAddDialogClose();
			});
	};

	// const handleEditButtonClick = (medicine, event) => {
	// 	event.stopPropagation();
	// 	setSelectedEditMedicine(medicine);
	// 	setIsEditDialogOpen(true);
	// };

	// const handleSaveEdit = () => {
	// 	if (selectedEditMedicine) {
	// 		pharmacyAxios.patch(`/medicines/${selectedEditMedicine._id}`, { updatedMedicine: selectedEditMedicine })
	// 			.then(() => {
	// 				setSelectedEditMedicine(null);
	// 				setIsEditDialogOpen(false);
	// 				setMedicines((prevMedicines) => {
	// 					const updatedMedicines = prevMedicines.map((med) => {
	// 						if (med._id === selectedEditMedicine._id) {
	// 							return selectedEditMedicine;
	// 						}
	// 						return med;
	// 					});
	// 					return updatedMedicines;
	// 				});
	// 			})
	// 			.catch((error) => {
	// 				console.log('Error updating medicine:', error);
	// 			});
	// 	}
	// };

	if (loading) return (<>Loading...</>);
	else {

		{
			console.log('====================================');
			console.log('packages = ', packages);
			console.log('====================================');
		}
		return (
			<MainCard title="Packages">
				<HealthPackagesList packages={packages} />
				<Fab
					color="secondary"
					aria-label="Add"
					onClick={handleAddDialogOpen}
					sx={{
						position: 'fixed',
						bottom: 16,
						right: 16,
						zIndex: 9999,
					}}
				>
					<Add />
				</Fab>
				<AddHealthPackages isAddDialogOpen={isAddDialogOpen} handleAddDialogClose={handleAddDialogClose}
					handleFormInputChange={handleFormInputChange} handleAddPackage={handleAddPackages} newPackage={newPackage} />

			</MainCard>
		);
	}
};

export default HealthPackages;