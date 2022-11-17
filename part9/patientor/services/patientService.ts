import patientData from "../data/patients";
import { newPatient, Patient, PublicPatient } from "../types";
import { v1 as uuid } from "uuid";

const patients: Array<Patient> = patientData;

const getAll = (): Array<Patient> => {
  return patients;
};

const getNonSensitiveAll = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    dateOfBirth,
    name,
    gender,
    occupation,
  }));
};

const getOne = (id: string): Patient | undefined => {
  const target = patients.find((patient) => patient.id === id);

  if (target) return target;

  return undefined;
};

const addNew = (newEntry: newPatient): Patient => {
  const newPatient: Patient = {
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
  getOne,
};
