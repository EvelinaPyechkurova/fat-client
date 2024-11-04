import {notEmptyString} from "./teacherValidators";
import {LECTURE_TYPE_VALUES} from "../constants";

async function validSubject(subject){
    // will rewrite later to work with API
}

const invalidSubjectMessage = "Cannot create lecture for not existing subject";

async function validTeacher(teacher){
    // will rewrite later to work with API
}

const invalidTeacherMessage = "Cannot create lecture for not existing teacher";

function validType(type){
    return notEmptyString(type) && LECTURE_TYPE_VALUES.includes(type);
}

const invalidTypeMessage = `Type of lecture must be one of ${LECTURE_TYPE_VALUES.join(", ")}`;

function validDate(date){
    const parsedDate = typeof date === 'string' ? new Date(date) : date;
    return parsedDate instanceof Date && !isNaN(parsedDate.getTime());
}

const invalidDateMessage = "Invalid date format or value";

async function validateCreateLecture(lecture){
    let errors = {};

    if(!lecture || typeof lecture !== "object" || Object.keys(lecture).length !== 4){
        errors.general = "Lecture object is missing or contains an invalid number of fields";
        return errors;
    }

    const {subject, teacher, type, date} = lecture;

    if(!(await validSubject(subject)))
        errors.subject = invalidSubjectMessage;

    if(!(await validTeacher(teacher)))
        errors.teacher = invalidTeacherMessage;

    if(!validType(type))
        errors.type = invalidTypeMessage;

    if(!validDate(date))
        errors.date = invalidDateMessage;

    return Object.keys(errors).length > 0 ? errors : null;
}

async function validateUpdateLecture(lecture){
    const allowedFields = ["subject", "teacher", "type", "date"];
    const errors = {};

    const fields = Object.keys(lecture);
    const invalidFields = fields.filter(field => !allowedFields.includes(field));

    if (invalidFields.length > 0)
        errors.invalidFields = `Invalid fields in the update: ${invalidFields.join(", ")}`;

    if ("subject" in lecture && !(await validSubject(lecture.subject)))
        errors.subject = invalidSubjectMessage;

    if ("teacher" in lecture && !(await validTeacher(lecture.teacher)))
        errors.teacher = invalidTeacherMessage;

    if ("type" in lecture && !validType(lecture.type))
        errors.type = invalidTypeMessage;

    if ("date" in lecture && !validDate(lecture.date))
        errors.date = invalidDateMessage;

    return Object.keys(errors).length > 0 ? errors : null;
}


export {
    validateCreateLecture,
    validateUpdateLecture
}