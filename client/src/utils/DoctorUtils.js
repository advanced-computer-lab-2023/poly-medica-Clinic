


export const isIntersect = (from,availableSlots) => { 
            
    const until = new Date(from.getTime() + 60 * 60 * 1000); 
    
    
    for(let i = 0; i < availableSlots.length; i++) {
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
    today.setDate(today.getDate() + 1);
    today.setHours(0, 0, 0, 0);  
    return today;
  };