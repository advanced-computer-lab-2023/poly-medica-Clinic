export const calcDoctorSalary = (appointmentPrice) => {
    const doctorSalary = (10/11) * appointmentPrice;
    return doctorSalary.toFixed(2);
}