import { checkUser, requireAuth } from "../../../clinic/src/middleware/authMiddleware.js";
import PatientService from "../service/patient-service.js";
import { ACTIVE_USER_STATE, BAD_REQUEST_CODE_400, DUPLICATE_KEY_ERROR_CODE, OK_REQUEST_CODE_200, PATIENT_ENUM } from "../utils/Constants.js";
import PatientService from '../service/patient-service.js';
import { EMPTY_SIZE, NOT_FOUND_STATUS_CODE, OK_STATUS_CODE } from '../utils/Constants.js';

export const patient = ( app ) => {
	const service = new PatientService();

    app.use('*', requireAuth);
    app.use('*', checkUser);

    app.get( '/all-patients', async ( req,res ) => {
		const allPatients = await service.getAllPatient();
		if( allPatients.length > EMPTY_SIZE ){
			res.status( OK_STATUS_CODE ).json( allPatients );
		}else{
			res.status( NOT_FOUND_STATUS_CODE ).json( { message:'patients not found' } );
		}
	} );


    app.post('/signup', async (req, res) =>{
        try{
            const signedupUser = await service.signupUser(req);
            req.body = {_id: signedupUser._id ,email: signedupUser.email , password:signedupUser.password, userName:signedupUser.userName, type: PATIENT_ENUM , state: ACTIVE_USER_STATE}
            //TODO: here the communication should happen (go to auth)
            res.status(OK_REQUEST_CODE_200).end();
        } catch(err){
            if(err.code == DUPLICATE_KEY_ERROR_CODE){
                const duplicateKeyAttrb = Object.keys(err.keyPattern)[0];
                res.status(BAD_REQUEST_CODE_400).send(`that ${duplicateKeyAttrb} is already registered`);
            }
            else res.status(BAD_REQUEST_CODE_400).send(err.message);
        }
    });

}
