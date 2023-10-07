import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import { ADMIN_ENUM, ADMIN_TABLE_NAME, DOCTOR_ENUM, DOCTOR_TABLE_NAME, PATIENT_TABLE_NAME, USER_ARR_ENUM, USER_STATE_ARR } from "../../utils/Constants.js";

const userSchema = mongoose.Schema({
    _id:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        unique: true,
        ref: function(){
            if(this.type === ADMIN_ENUM)
                return ADMIN_TABLE_NAME;
            else if (this.type === DOCTOR_ENUM)
                return DOCTOR_TABLE_NAME;
            else 
                return PATIENT_TABLE_NAME
    
        }
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    userName:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    type:{
        type: String,
        enum: USER_ARR_ENUM,
        required:true
    },
    state:{
        type: String,
        required:true,
        enum: USER_STATE_ARR,
    }
    
});



// static method to userSchema
userSchema.static.login = async function (email, password){
    const user = await User.findIne({email: email})
    if(user){
        const auth = bcrypt.compare(password, user.password);
        if(auth){
            return user;
        } throw Error("incorrect Password")
    } throw Error("incorrect Email")
}

userSchema.static.signup = async function (_id, email, password, userName, type, state){
    const userRecord = new User({_id, email, password, userName, type, state});
    let result = await userRecord.save();
    return result;
}

const User = mongoose.model('User', userSchema);

export default User;