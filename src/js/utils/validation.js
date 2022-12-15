function validateEmail(email) {
    const regEx =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(stud.noroff.no|noroff.no)$/;
    return !!email.match(regEx);
}

function validatePassword(password, confirmPassword) {
    console.log(password);
    console.log(confirmPassword);
    if (!password) {
        return false;
    }
    if (!confirmPassword) {
        return false;
    }
    if (password !== confirmPassword) {
        return false;
    } 
        return true;
    
}

export { validateEmail, validatePassword };
