import AdminService from '../service/admin-service.js';
import { BAD_REQUEST_CODE_400, DUPLICATE_KEY_ERROR_CODE, OK_REQUEST_CODE_200 } from '../utils/constants.js';

export const admin = (app) => {
const service = new AdminService();
 
app.post('/add-admin', async (req, res) =>{
    try{
        const adminUser = await service.addAdmin(req);
        req.body = {_id: adminUser._id, email: adminUser.email, password: adminUser.password, userName: adminUser.userName, type: ADMIN_ENUM , state: ACTIVE_USER_STATE}
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