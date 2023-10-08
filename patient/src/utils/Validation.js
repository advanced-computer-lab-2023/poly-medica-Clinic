import mongoose from 'mongoose';
import mongoose from 'mongoose';

export const isValidMongoId = (id) => {
    return mongoose.Types.ObjectId.isValid(id);
};
