import React from 'react';
import { List } from '@mui/material';
import AdminCard from './AdminCard';
import { useUserContext } from 'hooks/useUserContext';

const AdminsList = ({ admins, handleRemoveAdmin, setSelectedAdmin }) => {
	const { user } = useUserContext();
	console.log({ user });
	return (
		<List>
			{Array.isArray(admins) &&
				admins.map((admin, index) => {
					return (
						<div key={index}>
							<div key={index}>
								<AdminCard
									admin={admin}
									handleRemoveAdmin={handleRemoveAdmin}
									setSelectedAdmin={setSelectedAdmin}
								>
									{' '}
								</AdminCard>
							</div>
						</div>
					);
				})}
		</List>
	);
};

export default AdminsList;
