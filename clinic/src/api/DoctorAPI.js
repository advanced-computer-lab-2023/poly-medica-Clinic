import DoctorService from '../service/doctor-service.js';
import { BAD_REQUEST_CODE_400, DUPLICATE_KEY_ERROR_CODE, OK_REQUEST_CODE_200 } from '../utils/constants.js';
//import { EMPTY_SIZE, ERROR_STATUS_CODE, NOT_FOUND_STATUS_CODE, OK_STATUS_CODE } from '../utils/Constants.js';

export const doctor = (app) => {
const service = new DoctorService();

app.post('/add-doctor', async (req, res) =>{
    try{
        const doctorUser = await service.addDoctor(req);
        req.body = {_id: doctorUser._id, email: doctorUser.email, password: doctorUser.password, userName: doctorUser.userName, type: DOCTOR_ENUM , state: INACTIVE_USER_STATE}
        //TODO: send the res to other micro
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