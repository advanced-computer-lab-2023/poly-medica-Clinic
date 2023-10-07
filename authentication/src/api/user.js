import UserService from "../service/user-service.js";
import { BAD_REQUEST_CODE_400, DUPLICATE_KEY_ERROR_CODE, OK_REQUEST_CODE_200, ONE_DAY_MAX_AGE_IN_MIINUTS, ONE_DAY_MAX_AGE_IN_MILLEMIINUTS } from "../utils/Constants.js";
import jwt from "jsonwebtoken";

export const user = (app)=>{
    const user = new UserService();

    const createToken = (id) => {
        return jwt.sign({ id }, process.env.JWT_SECRET, {
          expiresIn: ONE_DAY_MAX_AGE_IN_MIINUTS
        });
      };

    app.post('/signup', async (req, res) =>{
        try{
            //TODO: the others api communication and the user will be from them (replace all req)
            const signedupUser = await user.signupUser(req);
            res.status(OK_REQUEST_CODE_200).end();
        } catch(err){
            if(err.code == DUPLICATE_KEY_ERROR_CODE){
                const duplicateKeyAttrb = Object.keys(err.keyPattern)[0];
                res.status(BAD_REQUEST_CODE_400).send(`that ${duplicateKeyAttrb} is already registered`);
            }
            else res.status(BAD_REQUEST_CODE_400).send(err.message);
        }
    });

    app.post('/login', async (req, res) =>{
        try{
            const logedinUser = await user.loginUser(req);
            const token = createToken(logedinUser._id);
            res.cookie('jwt', token, { httpOnly: true, maxAge: ONE_DAY_MAX_AGE_IN_MILLEMIINUTS });
            res.send({userId: logedinUser._id});
        } catch(err){
            res.status(BAD_REQUEST_CODE_400).send(err.message);
        }
    })
}