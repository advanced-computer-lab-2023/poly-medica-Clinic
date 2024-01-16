import React, { useEffect } from 'react';
import { Fab } from '@mui/material';
import MainCard from '../../ui-component/cards/MainCard';
import HealthPackagesList from './HealthPackagesList';
import { Add } from '@mui/icons-material';
import AddHealthPackages from './AddHealthPackages';
import EditHealthPackages from './EditHealthPackage';
import Loader from 'ui-component/Loader';
import { ADMIN_TYPE_ENUM, PATIENT_TYPE_ENUM } from 'utils/Constants';
import { getHealthPackages } from 'api/AdminAPI';
import { getPatientHealthPackage, getPatientDiscount } from 'api/PatientAPI';
import { useAdminContext } from 'hooks/useAdminContext';
import { usePatientContext } from 'hooks/usePatientContext';
import { useSelector } from 'react-redux';

const HealthPackages = () => {

	const { setPackages, setSubscribedPackage, isLoading: loading,
		setIsLoading: setLoading, setDiscount, isPaymentOpen } = usePatientContext();
	const { setOpenAddDialog: setIsAddDialogOpen } = useAdminContext();
	const { user } = useSelector(state => state.user);

	useEffect(() => {
		getHealthPackages().then((response) => {
			setPackages(response.allPackages);
		}).then(() => {
			if (user.type === PATIENT_TYPE_ENUM) {
				getPatientHealthPackage(user.id).then((response) => {
					setSubscribedPackage(response.healthPackages[0]);
				}).then(() => {
					getPatientDiscount(user).then((response) => {
						setDiscount(response.maxDiscount);
						setLoading(false);
					}
					);
				});
			}
			else {
				setLoading(false);
			}
		});

	}, [isPaymentOpen]);

	const handleAddDialogOpen = () => {
		setIsAddDialogOpen(true);
	};


	if (loading) return (<Loader />);
	else {
		return (
			<MainCard title="Packages">
				<HealthPackagesList />
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
				<AddHealthPackages />
				<EditHealthPackages />
			</MainCard>
		);
	}
};

export default HealthPackages;