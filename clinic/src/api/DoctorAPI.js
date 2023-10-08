import DoctorService from '../service/doctor-service.js';
import { BAD_REQUEST_CODE_400, DOCTOR_ENUM, DUPLICATE_KEY_ERROR_CODE, INACTIVE_USER_STATE, OK_REQUEST_CODE_200 } from '../utils/Constants.js';
//import { EMPTY_SIZE, ERROR_STATUS_CODE, NOT_FOUND_STATUS_CODE, OK_STATUS_CODE } from '../utils/Constants.js';

export const DoctorAPI = (app) => {
const service = new DoctorService();

app.post('/add-doctor', async (req, res) =>{
    try{
        const doctorUser = await service.addDoctor(req);
        req.body = {userId: doctorUser._id, email: doctorUser.userData.email, password: doctorUser.userData.password, userName: doctorUser.userData.userName, type: DOCTOR_ENUM , state: INACTIVE_USER_STATE}
        res.send(req.body);
    } catch(err){
        if(err.code == DUPLICATE_KEY_ERROR_CODE){
            const duplicateKeyAttrb = Object.keys(err.keyPattern)[0];
            res.status(BAD_REQUEST_CODE_400).send({errCode:DUPLICATE_KEY_ERROR_CODE ,errMessage:`that ${duplicateKeyAttrb.split('.')[1]} is already registered`});
        } else res.status(BAD_REQUEST_CODE_400).send({errMessage: err.message});
    }
});
    
}