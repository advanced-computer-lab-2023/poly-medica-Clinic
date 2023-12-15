import PrescriptionItem from './PrescriptionItem';
import List from '@mui/material/List';

const PrescriptionsList = ({
	prescriptions,
	handleSelectingPrescription,
	handleEditButtonClick,
}) => {
	return (
		<List>
			{Array.isArray(prescriptions) &&
				prescriptions.map((prescription, index) => {
					return (
						<div key={index}>
							<PrescriptionItem
								key={index}
								prescription={prescription}
								handleClicking={handleSelectingPrescription}
								handleEditButtonClick={handleEditButtonClick}
							/>
						</div>
					);
				})}
		</List>
	);
};

export default PrescriptionsList;
