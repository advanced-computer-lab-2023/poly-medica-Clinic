import { checkUser, requireAuth } from "../middleware/authMiddleware.js";
import ClinicService from "../service/clinic-service.js";
import { ACTIVE_USER_STATE, ADMIN_ENUM, BAD_REQUEST_CODE_400, DOCTOR_ENUM, DUPLICATE_KEY_ERROR_CODE, INACTIVE_USER_STATE, OK_REQUEST_CODE_200 } from "../utils/constants.js";

export const clinic = (app) =>{
    const service = new ClinicService();

    app.use('*', requireAuth);
    app.use('*', checkUser);
    app.get('/all-packages', async (req,res)=>{
        const allPackages = await service.getAllPackages();
        if(allPackages.length > 0){
            res.status(200).json({allPackages});
        }else{
            res.status(404).json({message:"patients not found"});
        }
    });

    app.post('/new-package', async (req, res)=>{
        
            const {name, price, discountOfDoctor, discountOfMedicin, discountOfFamily} = req.body;
            console.log({name});
       
            const data = await service.createNewPackage(name, price, discountOfDoctor, discountOfMedicin, discountOfFamily);
        if(data){
            res.status(200).json({data});
        }else{
            res.status(500);
        }
    });

    app.patch('/edit-package', async (req,res)=>{

    });

    app.delete('/remove-package/:id',  async (req,res)=>{
        const id = req.params.id;
        try{
            console.log(id);
            const deletedPackage = await service.deletePackage(id);
            res.status(200).json({deletedPackage});
        }catch(err){
            res.status(500).json({err : err.message});
        }   
    });

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
