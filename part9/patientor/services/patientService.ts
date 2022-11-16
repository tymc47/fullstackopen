import patientData from "../data/patients.json";
import { newPatientEntry, PatientEntry } from "../types";
import { v1 as uuid } from "uuid";

const patients: Array<PatientEntry> = patientData;

const getAll = (): Array<PatientEntry> => {
  return patients;
};

const getNonSensitiveAll = (): Array<Omit<PatientEntry, "ssn">> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    dateOfBirth,
    name,
    gender,
    occupation,
  }));
};

const addNew = (newEntry: newPatientEntry): PatientEntry => {
  const newPatient: PatientEntry = {
    ...newEntry,
    id: uuid(),
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getAll,
  getNonSensitiveAll,
  addNew,
};
