import React, { useEffect } from 'react';
import { useUserContext } from 'hooks/useUserContext.js';
import { useAdminContext } from 'hooks/useAdminContext.js';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MainCard from 'ui-component/cards/MainCard';
import AdminsList from './AdminsList';
import AdminDetails from './AdminDetails';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import AddAdminDialog from './AddAdminDialog';
import { clinicAxios } from 'utils/AxiosConfig';
import Message from 'ui-component/Message';
import { TWO_SECONDS } from 'utils/Constants';
import Loader from 'ui-component/Loader';
const Admins = () => {
	const { user } = useUserContext();
	const { setAdmins, setIsLoading, admins, setErrorMessage, isLoading, removeAdmin, addAdmin, setOpenAddDialog } = useAdminContext();

	useEffect(() => {
		clinicAxios
			.get('/admins')
			.then((response) => {
				console.log(response);
				setAdmins(
					response.data.admins.filter(
						(admin) => admin.userName !== user.userName,
					),
				);
				setIsLoading(false);
			})
			.catch(() => {
				setErrorMessage('Error fetching admins data');
				setIsLoading(false);
			});
	}, [admins.length]);

	const handleOpenAddDialog = () => {
		setOpenAddDialog(true);
	};


	return (
		<MainCard title='Admins'>
			{isLoading ? (
				<Loader/>
			) : (
				<>
					<AdminsList />

					<AdminDetails />

					<Fab
						color='secondary'
						aria-label='Add'
						onClick={handleOpenAddDialog}
						sx={{
							position: 'fixed',
							bottom: 16,
							right: 16,
							zIndex: 9999,
						}}
					>
						<AddIcon />
					</Fab>

					{addAdmin && (
						<Message
							message={'Admin added successfully!'}
							type={'success'}
							time={TWO_SECONDS}
							vertical={'bottom'}
							horizontal={'left'}
						/>
					)}

					{removeAdmin && (
						<Message
							message={'Admin removed successfully!'}
							type={'success'}
							time={TWO_SECONDS}
							vertical={'bottom'}
							horizontal={'left'}
						/>
					)}

					<AddAdminDialog />

					<DeleteConfirmationDialog
						title='Confirm Delete'
						content='Are you sure you want to delete this admin?'
					/>
				</>
			)}
		</MainCard>
	);
};

export default Admins;
