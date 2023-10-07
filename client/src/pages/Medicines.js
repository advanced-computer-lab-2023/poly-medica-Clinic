import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemAvatar, ListItemText, Collapse, Typography, Divider } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import MainCard from 'ui-component/cards/MainCard';

const Medicines = () => {
	const [medicines, setMedicines] = useState([]);
	const [open, setOpen] = useState({});
	const [isLoading, setIsLoading] = useState(true); // Add loading state

	useEffect(() => {
		fetch('http://localhost:8000/medicines')
			.then((response) => response.json())
			.then((data) => {
				setMedicines(data);
				setIsLoading(false); // Data has been loaded
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
				setIsLoading(false); // Handle the error and set isLoading to false
			});
	}, []);

	const handleClick = (index) => {
		setOpen((prevOpen) => ({
			...prevOpen,
			[index]: !prevOpen[index],
		}));
	}; 

	return (
		<MainCard title="Medicines">
			{isLoading ? (
				<p>Loading...</p> // Display a loading indicator while data is being fetched
			) : (
				<List>
					{Array.isArray(medicines) && medicines.map((medicine, index) => (
						<div key={index}>
							<div key={index}>
								<ListItem button onClick={() => handleClick(index)}>
									<ListItemAvatar>
										<img src={medicine.image} alt={medicine.name} width="50" height="50" />
									</ListItemAvatar>
									<ListItemText primary={medicine.name} secondary={`Price: $${medicine.price}`} />
									{open[index] ? <ExpandLess /> : <ExpandMore />}
								</ListItem>
								<Collapse in={open[index]} timeout="auto" unmountOnExit>
									<Divider />
									<Typography variant="subtitle1">Description:</Typography>
									<Typography variant="body1">{medicine.description}</Typography>
								</Collapse>
							</div>
						</div>
					))}
				</List>
			)}
		</MainCard>
	);
};

export default Medicines;
