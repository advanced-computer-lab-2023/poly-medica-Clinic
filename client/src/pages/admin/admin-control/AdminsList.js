import React from 'react';
import { List } from '@mui/material';
import AdminCard from './AdminCard';
import { useAdminContext } from 'hooks/useAdminContext';

const AdminsList = () => {
	const { admins } = useAdminContext();
	return (
		<List>
			{Array.isArray(admins) &&
				admins.map((admin, index) => {
					return (
						<div key={index}>
							<div key={index}>
								<AdminCard
									admin={admin}
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
