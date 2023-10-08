import DoctorService from "../service/doctor-service.js";
import {
	EMPTY_SIZE,
	ERROR_STATUS_CODE,
	NOT_FOUND_STATUS_CODE,
	OK_STATUS_CODE,
} from "../utils/Constants.js";

export const doctor = (app) => {
	const service = new DoctorService();

	app.delete("/doctors/:id", async (req, res) => {
		try {
			const id = req.params.id;
			const deletedDoctor = await service.deleteDoctor(id);
			if (deletedDoctor === null)
				res.json({
					message: "doctor not found!",
					status: NOT_FOUND_STATUS_CODE,
				});
			// to do: adding the not found status code
			else
				res.json({
					message: "doctor deleted!",
					status: OK_STATUS_CODE,
					deleted_doctor: deletedDoctor,
				});
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ err: err.message });
		}
	});
};
