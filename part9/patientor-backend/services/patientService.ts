import patientData from "../data/patients";
import { newPatient, Patient, PublicPatient, EntryWithoutId } from "../types";
import { v1 as uuid } from "uuid";

const patients: Array<Patient> = patientData;

const getAll = (): Array<Patient> => {
  return patients;
};

const getNonSensitiveAll = (): PublicPatient[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      dateOfBirth,
      name,
      gender,
      occupation,
      entries,
    })
  );
};

const getOne = (id: string): Patient | undefined => {
  const target = patients.find((patient) => patient.id === id);

  if (target) return target;

  return undefined;
};

const addNew = (newPatientEntry: newPatient): Patient => {
  const newPatient: Patient = {
    ...newPatientEntry,
    id: uuid(),
  };
  patients.push(newPatient);
  return newPatient;
};

const addEntry = (
  newEntry: EntryWithoutId,
  patient: Patient
): Patient | undefined => {
  const entry = {
    ...newEntry,
    id: uuid(),
  };

  const target = patients.find((pat: Patient) => pat.id === patient.id);
  target?.entries.push(entry);

  return target;
};

export default {
  getAll,
  getNonSensitiveAll,
  addNew,
  getOne,
  addEntry,
};
