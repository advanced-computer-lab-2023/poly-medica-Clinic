import PatientService from '../service/patient-service.js';
import { EMPTY_SIZE, NOT_FOUND_STATUS_CODE, OK_STATUS_CODE, ERROR_STATUS_CODE } from '../utils/Constants.js';

export const patient = ( app ) => {
	const service = new PatientService();

	app.get( '/patients', async ( req,res ) => {
		try {
			const patients = await service.getAllPatients();
			if( patients.length > EMPTY_SIZE ){
				res.status( OK_STATUS_CODE ).json( { patients } );
			}else{
				res.status( NOT_FOUND_STATUS_CODE ).json( { message:'No patients found!' } );
			}
		} catch( err ){
			res.status( ERROR_STATUS_CODE ).json( { err:err.message } );
		}
	} );

	app.delete( '/patients/:id', async ( req,res ) => {
		try {
			const id = req.params.id;
			const deletedPatient = await service.deletePatient( id );
			if( deletedPatient ){
				res.status( OK_STATUS_CODE ).json( { message:'patient deleted!',deletedPatient } );
			}else{
				res.status( NOT_FOUND_STATUS_CODE ).json( { message:'patient not found!' } );
			}
		} catch( err ){
			res.status( ERROR_STATUS_CODE ).json( { err:err.message } );
		}
	} );
};