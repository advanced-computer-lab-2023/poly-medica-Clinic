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
