import PrescriptionItem from './PrescriptionItem';
import List from '@mui/material/List';

const PrescriptionsList = ({ prescriptions }) => {
	return (
		<>
			<List>
				{
					Array.isArray(prescriptions) 
					&&
					prescriptions.map((prescription, index) => {
						return( 
							<div key={index}>
								<PrescriptionItem key={index} prescription={prescription} />
							</div>
						);
					})
				}
			</List>
		</>
	);
};

export default PrescriptionsList;