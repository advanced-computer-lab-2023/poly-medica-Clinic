import { patientAxios } from './AxiosConfig';
import { OK_STATUS_CODE } from './Constants';

export const formatMedicines = (medicines, prescription) => {

    const formattedMedicines = medicines.length > 0 && medicines
        .filter((medicine) =>
            prescription && prescription.medicines.some(
                (prescriptionMedicine) => prescriptionMedicine.medicineId.toString() === medicine._id.toString()
            )
        )
        .map((filteredMedicine) => {
            const prescriptionMedicine = prescription && prescription.medicines.find(
                (prescriptionMedicine) =>
                    prescriptionMedicine.medicineId.toString() === filteredMedicine._id.toString()
            );
            return {
                ...filteredMedicine,
                amount: prescriptionMedicine && prescriptionMedicine.amount,
            };
        });

    return formattedMedicines || [];
};


export const updatePrescription = (selectedPrescription, setSelectedPrescription) => {
    patientAxios.patch(`/prescriptions/${selectedPrescription._id}`, { prescription: selectedPrescription })
        .then(response => {
            if (response.status === OK_STATUS_CODE) {
                setSelectedPrescription(response.data);
            }
        });
};