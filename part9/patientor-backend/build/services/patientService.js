"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../data/patients"));
const uuid_1 = require("uuid");
const patients = patients_1.default;
const getAll = () => {
    return patients;
};
const getNonSensitiveAll = () => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        dateOfBirth,
        name,
        gender,
        occupation,
        entries,
    }));
};
const getOne = (id) => {
    const target = patients.find((patient) => patient.id === id);
    if (target)
        return target;
    return undefined;
};
const addNew = (newPatientEntry) => {
    const newPatient = Object.assign(Object.assign({}, newPatientEntry), { id: (0, uuid_1.v1)() });
    patients.push(newPatient);
    return newPatient;
};
const addEntry = (newEntry, patient) => {
    const entry = Object.assign(Object.assign({}, newEntry), { id: (0, uuid_1.v1)() });
    const target = patients.find((pat) => pat.id === patient.id);
    target === null || target === void 0 ? void 0 : target.entries.push(entry);
    return target;
};
exports.default = {
    getAll,
    getNonSensitiveAll,
    addNew,
    getOne,
    addEntry,
};
