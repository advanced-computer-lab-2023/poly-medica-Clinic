export const displayOfferText = (status, name) => {
    return status
        ? 'Nice to have you in PolyMedica Team 😊'
        : `Hello Dr. ${name}, Glad to tell you that your request to be a doctor in PolyMedica is accepted. Please review our offer and respond as fast as possible by pressing on the Accept button below.`;
};



export const isIntersect = (from, availableSlots) => {

    const until = new Date(from.getTime() + 60 * 60 * 1000);


    for (let i = 0; i < availableSlots.length; i++) {
        const slot = availableSlots[i];

        const slotFrom = new Date(slot.from);
        const slotUntil = new Date(slot.until);


        if (
            (from >= slotFrom && from < slotUntil) ||
            (until > slotFrom && until <= slotUntil) ||
            (from <= slotFrom && until >= slotUntil)
        ) {
            return true;
        }
    }
    return false;
};

export const getTodayDate = () => {
    const today = new Date();
    today.setDate(today.getDate());
    today.setHours(0, 0, 0, 0);
    return today;
};