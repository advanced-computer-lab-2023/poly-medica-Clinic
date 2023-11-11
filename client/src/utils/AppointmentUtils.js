export const filterAppointmentsByDate = (appointment, selectedValue) => {
    const today = new Date();
    const appointmentDate = new Date(appointment.date);

    switch (selectedValue) {
        case 'Last week': {
            const lastWeek = new Date(today);
            lastWeek.setDate(lastWeek.getDate() - 7);
            return appointmentDate >= lastWeek && appointmentDate <= today;
        }
        case 'Last month': {
            const lastMonth = new Date(today);
            lastMonth.setMonth(lastMonth.getMonth() - 1);
            return appointmentDate >= lastMonth && appointmentDate <= today;
        }
        case 'Last year': {
            const lastYear = new Date(today);
            lastYear.setFullYear(lastYear.getFullYear() - 1);
            return appointmentDate >= lastYear && appointmentDate <= today;
        }
        default: {
            return true;
        }
    }
};

export const isDateInAvailableSlots = (selectedDate, availableSlots) => {
    for (const slot of availableSlots) {
      const from = new Date(slot.from);
      const until = new Date(slot.until);
      if (selectedDate >= from && selectedDate <= until) {
        return true;
      }
    }
    return false;
};

export const filterAppointmentByChronology = (appointment, selectedValue) => {
    const today = new Date();
    const appointmentDate = new Date(appointment.date);
    selectedValue = selectedValue.toUpperCase();
    switch (selectedValue) {
        case 'UPCOMING': {
            return appointmentDate >= today;
        }
        case 'PAST': {
            return appointmentDate < today;
        }
        default: {
            return true;
        }
    }
};
