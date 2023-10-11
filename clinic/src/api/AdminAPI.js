import AdminService from '../service/admin-service.js';
import { ADMIN_ENUM, BAD_REQUEST_CODE_400, DUPLICATE_KEY_ERROR_CODE } from '../utils/Constants.js';

export const AdminAPI = (app) => {
const service = new AdminService();

 app.post('/add-admin', async (req, res) =>{
    try{
        const adminUser = await service.addAdmin(req);
        req.body = {userId: adminUser._id, email: adminUser.userData.email, password: adminUser.userData.password, userName: adminUser.userData.userName, type: ADMIN_ENUM}
        res.send(req.body);
    } catch(err){
        if(err.code == DUPLICATE_KEY_ERROR_CODE){
            const duplicateKeyAttrb = Object.keys(err.keyPattern)[0];
            let keyAttrb = duplicateKeyAttrb.split('.')
            res.status(BAD_REQUEST_CODE_400).send({errCode:DUPLICATE_KEY_ERROR_CODE ,errMessage:`that ${keyAttrb[keyAttrb.length - 1]} is already registered`});
        }
        else res.status(BAD_REQUEST_CODE_400).send({errMessage: err.message});
    }
});
}