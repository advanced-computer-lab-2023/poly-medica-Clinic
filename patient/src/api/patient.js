import PatientService from '../service/patient-service.js';
import { EMPTY_SIZE, NOT_FOUND_STATUS_CODE, OK_STATUS_CODE } from '../utils/Constants.js';

export const patient = ( app ) => {
	const service = new PatientService();

	app.get( '/all-patients', async ( req,res ) => {
		//console.log( 'inside get all patients' );
		const allPatients = await service.getAllPatient(); 
		if( allPatients.length > EMPTY_SIZE ){
			res.status( OK_STATUS_CODE ).json( allPatients );
		}else{
			res.status( NOT_FOUND_STATUS_CODE ).json( { message:'patients not found' } );
		}
	} );
};