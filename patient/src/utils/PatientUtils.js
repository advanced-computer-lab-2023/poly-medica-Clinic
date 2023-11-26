export const patientHasPackage = (patient, packageChosen) => {
	const patientPackages = patient.healthPackages;
	for (let i = 0; i < patientPackages.length; i++) {
		const healthPackage = patientPackages[i];
		if (healthPackage && healthPackage.packageId.toString() === packageChosen._id.toString())
			return true;
	}
	return false;
};