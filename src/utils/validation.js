
export const validatePassword =(label,password)=>{
    let errMsg=""
    let regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;

    // (?=.*[0-9]) - Assert a string has at least one number;
    // (?=.*[!@#$%^&*]) - Assert a string has at least one special character.

    if(!password){
        return  errMsg=`Please enter ${label}`
    }
    if(!regularExpression.test(password)){
        return errMsg="Password should be minimum 8 , maximum 16 character long including atleast 1 string, 1 special and 1 numeric character"
    }
    return  ;
}

export const validateEmail=( email)=>{
    let errMsg=""
    let regularExpression = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

    if(!email){
        return false //errMsg="Please enter email"
    }
    if(!regularExpression.test(email)){
        return  false//errMsg="Invalid Email "
    }
    return true;
}

export const validateNickname=val=>{
    console.log("nickname===", val)
    let regularExpression=/[^a-zA-Z0-9 ]/
    if(!val.length){
        return "Please enter nickname " +val
    }
    else if(val.length <5 || val.length>=30){
        return "Nickname minimum length should be 5 and maximum length should be 30 character long"
    }
   else if(regularExpression.test(val)){
        return "Special characters are not allowed"
    }
}


export const comparePassword=(password1, password2)=>{
    if(password1!==password2){
        return "Password should be same"
    }
    return;
}

export const requiredValidation=(label, val)=>{
    if(!val){
        return `Please enter ${label}`
    }
}