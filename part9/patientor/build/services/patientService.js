"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_json_1 = __importDefault(require("../data/patients.json"));
const uuid_1 = require("uuid");
const patients = patients_json_1.default;
const getAll = () => {
    return patients;
};
const getNonSensitiveAll = () => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        dateOfBirth,
        name,
        gender,
        occupation,
    }));
};
const addNew = (newEntry) => {
    const newPatient = Object.assign(Object.assign({}, newEntry), { id: (0, uuid_1.v1)() });
    patients.push(newPatient);
    return newPatient;
};
exports.default = {
    getAll,
    getNonSensitiveAll,
    addNew,
};
