"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseEntryInput = exports.parsePatientInput = exports.assertNever = void 0;
const types_1 = require("./types");
const diagnoseService_1 = __importDefault(require("./services/diagnoseService"));
const assertNever = (value) => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};
exports.assertNever = assertNever;
const isString = (text) => {
    return typeof text === "string" || text instanceof String;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(types_1.Gender).includes(param);
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isRating = (param) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(types_1.HealthCheckRating).includes(param);
};
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error("Incorrect or missing name");
    }
    return name;
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error("Incorrect or missing date");
    }
    return date;
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error("Incorrect or missing gender");
    }
    return gender;
};
const parseOccupation = (occupation) => {
    if (!occupation || !isString(occupation)) {
        throw new Error("Incorrect or missing occupation");
    }
    return occupation;
};
const parseSsn = (ssn) => {
    if (!ssn || !isString(ssn)) {
        throw new Error("Incorrect or missing ssn");
    }
    return ssn;
};
const parseDescription = (description) => {
    if (!description || !isString(description)) {
        throw new Error("Incorrect or missing ssn");
    }
    return description;
};
const isDiagnosisCode = (code) => {
    let result = false;
    const diagnoses = diagnoseService_1.default.getAll();
    diagnoses.forEach((diagnose) => {
        if (diagnose.code === code)
            result = true;
    });
    return result;
};
const parseCode = (code) => {
    if (!code || !isString(code) || !isDiagnosisCode(code)) {
        throw new Error("incorrect diagnosis code");
    }
    return code;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseDiagnosisCodes = (codes) => {
    const result = [];
    if (!Array.isArray(codes)) {
        throw new Error("malformatted diagnosis codes");
    }
    codes.forEach((code) => {
        result.push(parseCode(code));
    });
    return result;
};
const parseHealthCheckRating = (rating) => {
    if (rating === undefined || !isRating(rating)) {
        throw new Error("Incorrect health check rating");
    }
    return rating;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parsePatientInput = (object) => {
    const newEntry = {
        name: parseName(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        ssn: parseSsn(object.ssn),
        entries: [],
    };
    return newEntry;
};
exports.parsePatientInput = parsePatientInput;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseDischarge = (discharge) => {
    if (!discharge.criteria || !discharge.date) {
        throw new Error("missing or misformatted discharge");
    }
    if (!isString(discharge.criteria) || !isString(discharge.criteria)) {
        throw new Error("missing or misformatted discharge");
    }
    return {
        criteria: String(discharge.criteria),
        date: parseDate(discharge.date),
    };
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseSickLeave = (sickLeave) => {
    if (!sickLeave.startDate || !sickLeave.endDate) {
        throw new Error("missing or malformatted sickLeave");
    }
    return {
        startDate: parseDate(sickLeave.startDate),
        endDate: parseDate(sickLeave.endDate),
    };
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseHealthCheckEntry = (object) => {
    return {
        type: "HealthCheck",
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseName(object.specialist),
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
    };
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseHospitalEntry = (object) => {
    return {
        type: "Hospital",
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseName(object.specialist),
        discharge: parseDischarge(object.discharge),
    };
};
const parseOccupationalEntry = (
// eslint-disable-next-line @typescript-eslint/no-explicit-any
object) => {
    return {
        type: "OccupationalHealthcare",
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseName(object.specialist),
        employerName: parseName(object.employerName),
    };
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseEntryInput = (object) => {
    if (!object.type)
        throw new Error("missing entry type");
    let newEntry;
    console.log(object.type);
    switch (object.type) {
        case "HealthCheck":
            newEntry = parseHealthCheckEntry(object);
            break;
        case "Hospital":
            newEntry = parseHospitalEntry(object);
            break;
        case "OccupationalHealthcare":
            newEntry = parseOccupationalEntry(object);
            if (object.sickLeave) {
                newEntry.sickLeave = parseSickLeave(object.sickLeave);
            }
            break;
        default:
            throw new Error("incorrect type for entry");
    }
    if (object.diagnosisCodes && object.diagnosisCodes.length !== 0) {
        newEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
    }
    return newEntry;
};
exports.parseEntryInput = parseEntryInput;
