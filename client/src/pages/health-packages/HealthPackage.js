import React, { useState, useEffect } from 'react';
import { Fab } from '@mui/material';
import MainCard from '../../ui-component/cards/MainCard';
import { clinicAxios } from '../../utils/AxiosConfig';
import HealthPackagesList from './HealthPackagesList';
import { Add } from '@mui/icons-material';
import AddHealthPackages from './AddHealthPackages';
import EditHealthPackages from './EditHealthPackage';
import { useUserContext } from 'hooks/useUserContext';
import { patientAxios } from 'pages/utilities/AxiosConfig';
import Loader from 'ui-component/Loader';
import { ADMIN_TYPE_ENUM, PATIENT_TYPE_ENUM } from 'utils/Constants';

const HealthPackages = () => {
	const [packages, setPackage] = useState([]);
	const [subscribedPackage, setSubscribedPackage] = useState(null);
	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
	const [loading, setLoading] = useState(true);
	const [discount, setDiscount] = useState(0);
	const [newPackage, setNewPackage] = useState({
		name: '',
		price: '',
		discountOfDoctor: '',
		discountOfMedicin: '',
		discountOfFamily: '',
	});
	const [selectedEditPackages, setSelectedEditPackages] = useState(null);
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
	const { user } = useUserContext();
	const [isPaymentOpen, setIsPaymentOpen] = useState(false);

	useEffect(() => {
		clinicAxios.get('/packages')
			.then((response) => {
				console.log(response.data.allPackages);
				setPackage(response.data.allPackages);

			}).then(() => {
				if (user.type === PATIENT_TYPE_ENUM) {
					patientAxios.get(`/patient/${user.id}/health-packages`).then((response) => {
						setSubscribedPackage(response.data.healthPackages[0]);
					}).then(() => {
						patientAxios.get(`/patient/${user.id}/discount`).then((response) => {
							setDiscount(response.data.maxDiscount);
							setLoading(false);
						}
						);
					});
				}
				else {
					setLoading(false);
				}
			})
			.catch(error => {
				console.log(error);
				setLoading(false);
			});


	}, [isPaymentOpen]);

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

		clinicAxios.post('/packages', { newPackage }).then((response) => {
			const newPackageData = response.data.data;
			setPackage((prevPackage) => [...prevPackage, newPackageData]);
			handleAddDialogClose();
		})
			.catch((error) => {
				console.log('Error adding health package:', error);
				handleAddDialogClose();
			});
	};

	const handleEditButtonClick = (packages, event) => {
		event.stopPropagation();
		setSelectedEditPackages(packages);
		setIsEditDialogOpen(true);
	};

	const handleDeleteButtonClick = (pack) => {
		console.log(pack);
		clinicAxios.delete(`/packages/${pack._id}`)
			.then(() => {
				setPackage((prevPackage) => {
					const updatedPackages = prevPackage.filter((packages) => {
						if (pack._id !== packages._id) {
							return packages;
						}
					});
					return updatedPackages;
				});
			}).catch((error) => {
				console.log('Error deleting health package:', error);
			});
	};

	const handleSaveEdit = (e) => {
		e.preventDefault();
		if (selectedEditPackages) {
			clinicAxios.patch(`/package/${selectedEditPackages._id}`, { selectedEditPackages })
				.then(() => {
					setIsEditDialogOpen(false);
					setPackage((prevPackage) => {
						const updatedPackages = prevPackage.map((packages) => {
							if (packages._id === selectedEditPackages._id) {
								return selectedEditPackages;
							}
							return packages;
						});
						return updatedPackages;
					});
					setSelectedEditPackages(null);
				})
				.catch((error) => {
					console.log('Error updating health package:', error);
				});
		}
	};

	if (loading) return (<Loader></Loader>);
	else {
		console.log(discount);
		return (
			<MainCard title="Packages">
				<HealthPackagesList packages={packages} isPaymentOpen={isPaymentOpen} setIsPaymentOpen={setIsPaymentOpen} handleEditButtonClick={handleEditButtonClick} handleDeleteButtonClick={handleDeleteButtonClick} subscribedPackage={subscribedPackage} setSubscribedPackage={setSubscribedPackage} discount={discount} />
				{
					user.type === ADMIN_TYPE_ENUM
					&&
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
				}
				<AddHealthPackages isAddDialogOpen={isAddDialogOpen} handleAddDialogClose={handleAddDialogClose}
					handleFormInputChange={handleFormInputChange} handleAddPackage={handleAddPackages} newPackage={newPackage} />
				<EditHealthPackages isEditDialogOpen={isEditDialogOpen} setIsEditDialogOpen={setIsEditDialogOpen}
					setSelectedEditPackage={setSelectedEditPackages} handleSaveEdit={handleSaveEdit} selectedEditPackage={selectedEditPackages} />
			</MainCard>
		);
	}
};

export default HealthPackages;