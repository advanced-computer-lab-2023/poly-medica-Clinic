import PrescriptionItem from './PrescriptionItem';
import List from '@mui/material/List';

const PrescriptionsList = ({ prescriptions, handleSelectingPrescription }) => {
	return (
		<>
			<List>
				{
					Array.isArray(prescriptions) 
					&&
					prescriptions.map((prescription, index) => {
						return( 
							<div key={index}>
								<PrescriptionItem 
									key={index} 
									prescription={prescription}
									handleClicking={handleSelectingPrescription}
								/>
							</div>
						);
					})
				}
			</List>
		</>
	);
};

export default PrescriptionsList;