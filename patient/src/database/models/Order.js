import mongoose from 'mongoose';
import { ORDER_STATUS } from '../../utils/Constants';
import { ZERO_INDEX } from '../../../../clinic/src/utils/Constants';

const orderSchema = mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true,
    },
    details: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ORDER_STATUS,
        default: ORDER_STATUS[ZERO_INDEX],
    },
});

const OrderModel = mongoose.model('order', orderSchema);

export default OrderModel;
