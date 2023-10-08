import axios from "axios";
import AdminService from "../service/admin-service.js";
import {
	ERROR_STATUS_CODE,
	NOT_FOUND_STATUS_CODE,
	UNAUTHORIZED_STATUS_CODE,
	OK_STATUS_CODE,
	CREATED_STATUS_CODE,
} from "../utils/Constants.js";

export const admin = (app) => {
	const service = new AdminService();

	app.post("/admins", async (req, res) => {
		try {
			const newAdmin = await service.createAdmin(req.body);
			res
				.status(CREATED_STATUS_CODE)
				.json({ message: "admin created!", newAdmin });
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ err: err.message });
		}
	});

	app.delete("/admins/:id", async (req, res) => {
		const id = req.params.id;
		try {
			const isMainAdmin = await service.checkMainAdmin(id);
			if (isMainAdmin) {
				res
					.status(ERROR_STATUS_CODE)
					.json({ message: "you can not delete main admin" });
			} else {
				const deletedAdmin = await service.deleteAdmin(id);

				if (deletedAdmin) {
					res
						.status(OK_STATUS_CODE)
						.json({ message: "admin deleted!", deletedAdmin });
				} else {
					res
						.status(NOT_FOUND_STATUS_CODE)
						.json({ message: "admin not found!" });
				}
			}
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ err: err.message });
		}
	});

	app.delete("/patients/:id", async (req, res) => {
		try {
			const role = "ADMIN"; // to be adjusted later on with the role of the logged in user
			if (role == "ADMIN") {
				const id = req.params.id;
				const deletePatientURL = `http://localhost:8002/patients/${id}`;
				const response = await axios.delete(deletePatientURL);

				if (response.data.status == NOT_FOUND_STATUS_CODE) {
					res.status(NOT_FOUND_STATUS_CODE).send({
						message: "patient not found!",
						status: NOT_FOUND_STATUS_CODE,
					});
				} else if (response.data.status == OK_STATUS_CODE) {
					res.status(OK_STATUS_CODE).send({
						message: "patient deleted!",
						status: OK_STATUS_CODE,
						deletePatient: response.data.deleted_patient,
					});
				}
			} else {
				res.status(UNAUTHORIZED_STATUS_CODE).send({
					message: "You are not authorized to delete a patient!",
				});
			}
		} catch (err) {
			res.status(ERROR_STATUS_CODE).send(err);
		}
	});

	app.delete("/doctors/:id", async (req, res) => {
		try {
			const role = "ADMIN"; // to be adjusted later on with the role of the logged in user
			if (role == "ADMIN") {
				const id = req.params.id;
				const deleteDoctorURL = `http://localhost:8001/doctors/${id}`;
				const response = await axios.delete(deleteDoctorURL);

				if (response.status == NOT_FOUND_STATUS_CODE) {
					res.status(NOT_FOUND_STATUS_CODE).send({
						message: "doctor not found!",
						status: NOT_FOUND_STATUS_CODE,
					});
				} else if (response.status == OK_STATUS_CODE) {
					res.status(OK_STATUS_CODE).send({
						message: "doctor deleted!",
						status: OK_STATUS_CODE,
						deleteDoctor: response.data.deleted_doctor,
					});
				}
			} else {
				res.status(UNAUTHORIZED_STATUS_CODE).send({
					message: "You are not authorized to delete a doctor!",
				});
			}
		} catch (err) {
			res.status(ERROR_STATUS_CODE).send(err);
		}
	});
};
