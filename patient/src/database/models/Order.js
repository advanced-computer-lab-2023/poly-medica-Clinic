import mongoose from 'mongoose';
import { ORDER_STATUS, ZERO_INDEX } from '../../utils/Constants.js';

const orderSchema = mongoose.Schema(
	{
		patientId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Patient',
			required: true,
		},
		details: [
			{
				medicineId: {
					type: mongoose.Schema.Types.ObjectId,
				},
				name: {
					type: String,
					required: true,
				},
				price: {
					type: Number,
					required: true,
				},
				quantity: {
					type: Number,
					default: 1,
				},
			},
		],
		amount: {
			type: Number,
			required: true,
		},
		status: {
			type: String,
			enum: ORDER_STATUS,
			default: ORDER_STATUS[ZERO_INDEX],
		},
	},
	{ timestamps: true },
);

const OrderModel = mongoose.model('order', orderSchema);

export default OrderModel;
