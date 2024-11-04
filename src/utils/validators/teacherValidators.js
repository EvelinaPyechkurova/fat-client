function notEmptyString(str){
    return str != null && typeof(str) === "string" && str.trim().length > 0;
}

const emptyStringMessage = "field cannot be empty or consist of only whitespace";

function isLetterString(str) {
    const letterPattern = /^[\p{L}]+$/u;
    return str != null && typeof str === "string" && letterPattern.test(str.trim());
}

const invalidLetterMessage = "field must contain only letters (no spaces, numbers, or special characters)";

function validPhoneNumber(number){
    const phoneNumberPattern = /^\+?[1-9]\d{0,2}[-.\s]?(\(?\d{2,4}\)?)[-.\s]?\d{3,4}[-.\s]?\d{3,4}$/;
    return notEmptyString(number) && phoneNumberPattern.test(number);
}

const invalidPhoneNumberMessage = "field is not valid phone number";

function validEmail(email){
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return notEmptyString(email) && emailPattern.test(email);
}

const invalidEmailMessage = "field is not valid email";

function validateCreateTeacher(teacher) {
    const errors = {};

    if (!teacher || typeof teacher !== "object" || Object.keys(teacher).length !== 4) {
        errors.general = "Teacher object is missing or contains an invalid number of fields";
        return errors;
    }

    const { name, surname, phone, email } = teacher;

    if (!notEmptyString(name)) 
        errors.name = "Name " + emptyStringMessage;
    if (!isLetterString(name))
        errors.name = "Name " + invalidLetterMessage;
    if (!notEmptyString(surname)) 
        errors.surname = "Surname " + emptyStringMessage;
    if (!isLetterString(surname))
        errors.surname = "Surname " + invalidLetterMessage;
    if (!validPhoneNumber(phone))
        errors.phone = "Phone " + invalidPhoneNumberMessage;
    if (!validEmail(email)) 
        errors.email = "Email " + invalidEmailMessage;

    return Object.keys(errors).length > 0 ? errors : null;
}

function validateUpdateTeacher(teacher) {
    const allowedFields = ["name", "surname", "phone", "email"];
    const errors = {};

    const fields = Object.keys(teacher);
    const invalidFields = fields.filter(field => !allowedFields.includes(field));

    if (invalidFields.length > 0)
        errors.invalidFields = `Invalid fields in the update: ${invalidFields.join(", ")}`;

    if ("name" in teacher && (!notEmptyString(teacher.name) || !isLetterString(teacher.name)))
        errors.name = "Name " + emptyStringMessage + ", " + invalidLetterMessage;

    if ("surname" in teacher && (!notEmptyString(teacher.surname) || !isLetterString(teacher.surname)))
        errors.surname = "Surname " + emptyStringMessage + ", " + invalidLetterMessage;

    if ("phone" in teacher && !validPhoneNumber(teacher.phone))
        errors.phone = "Phone " + invalidPhoneNumberMessage;

    if ("email" in teacher && !validEmail(teacher.email))
        errors.email = "Email " + invalidEmailMessage;

    return Object.keys(errors).length > 0 ? errors : null;
}

export {
    notEmptyString,
    emptyStringMessage,
    isLetterString,
    invalidLetterMessage,
    validateCreateTeacher,
    validateUpdateTeacher
};