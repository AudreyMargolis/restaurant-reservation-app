export const formatNumber = (number) => {
    let r = /(\D+)/g, first3 ="", next3 = "", last4 = "";
    let num = number.replace(r, "");

    if (num.length > 0) {
        first3 = num.substr(0,3);
        next3 = num.substr(3, 3);
        last4 = num.substr(6,4);
        if(num.length > 6){
            num = first3 + "-" + next3 + "-" + last4;
        } else if(num.length > 3) {
            num = first3 + "-" + next3;
        } else if(num.length < 4) {
            num = first3;
        }
    }
    return num;
}
export const validateReservation = (formData) =>{
    try{
        if(formData.first_name === "first name" || formData.first_name === "" || formData.first_name.includes(" "))
            throw new Error("Need a valid First Name!")
        else if(formData.last_name === "last name" || formData.last_name === "")
            throw new Error("Need a valid Last Name!")
        else if(formData.mobile_number.length !== 12 || formData.mobile_number === "555-555-5555" )
            throw new Error("Need a valid phone number!")
        else if(Date.parse(formData.reservation_date) < Date.now())
            throw new Error("Cannot use a past date!")
        else if(new Date(formData.reservation_date).getDay()+1 === 2)
            throw new Error("We are closed on Tuesdays! Pick a day when we are open.");
    }catch(error){
        console.log(error);
        return error;
    }
    return null;
}
