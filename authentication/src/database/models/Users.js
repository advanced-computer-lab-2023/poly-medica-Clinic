import mongoose from "mongoose";
import { ADMIN_ENUM, ADMIN_TABLE_NAME, DOCTOR_ENUM, DOCTOR_TABLE_NAME, PATIENT_TABLE_NAME, USER_ARR_ENUM, USER_STATE_ARR } from "../../utils/Constants.js";

const userSchema = mongoose.Schema({
    userId:{
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




userSchema.statics.signup = async function (userId, email, password, userName, type, state){
    const userRecord = new this({userId: new mongoose.Types.ObjectId(userId), email, password, userName, type, state});
    let result = await userRecord.save();
    return result;
}

const User = mongoose.model('User', userSchema);

export default User;