import {
  Diagnosis,
  Discharge,
  EntryWithoutId,
  Gender,
  HealthCheckEntry,
  HealthCheckRating,
  HospitalEntry,
  newPatient,
  OccupationalHealthcareEntry,
  SickLeave,
} from "./types";
import diagnoseService from "./services/diagnoseService";

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): date is string => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name");
  }
  return name;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date");
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender");
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }
  return occupation;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing ssn");
  }
  return ssn;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error("Incorrect or missing ssn");
  }
  return description;
};

const isDiagnosisCode = (code: string): code is Diagnosis["code"] => {
  let result = false;
  const diagnoses = diagnoseService.getAll();
  diagnoses.forEach((diagnose: Diagnosis) => {
    if (diagnose.code === code) result = true;
  });
  return result;
};

const parseCode = (code: unknown): Diagnosis["code"] => {
  if (!code || !isString(code) || !isDiagnosisCode(code)) {
    throw new Error("incorrect diagnosis code");
  }

  return code;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseDiagnosisCodes = (codes: any): Array<Diagnosis["code"]> => {
  const result: Array<Diagnosis["code"]> = [];

  if (!Array.isArray(codes)) {
    throw new Error("malformatted diagnosis codes");
  }
  codes.forEach((code: unknown) => {
    result.push(parseCode(code));
  });

  return result;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (rating === undefined || !isRating(rating)) {
    throw new Error("Incorrect health check rating");
  }
  return rating;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parsePatientInput = (object: any): newPatient => {
  const newEntry: newPatient = {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    ssn: parseSsn(object.ssn),
    entries: [],
  };
  return newEntry;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDischarge = (obj: any): obj is Discharge => {
  if (!obj.criteria || !obj.date) return false;
  if (!isString(obj.criteria) || !isString(obj.date)) return false;

  return true;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error("missing or misformatted discharge");
  }

  return discharge;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseSickLeave = (sickLeave: any): SickLeave => {
  if (!sickLeave.startDate || !sickLeave.endDate) {
    throw new Error("missing or malformatted sickLeave");
  }

  return {
    startDate: parseDate(sickLeave.startDate),
    endDate: parseDate(sickLeave.endDate),
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseHealthCheckEntry = (object: any): Omit<HealthCheckEntry, "id"> => {
  return {
    type: "HealthCheck",
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseName(object.specialist),
    healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseHospitalEntry = (object: any): Omit<HospitalEntry, "id"> => {
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
  object: any
): Omit<OccupationalHealthcareEntry, "id"> => {
  return {
    type: "OccupationalHealthcare",
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseName(object.specialist),
    employerName: parseName(object.employerName),
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseEntryInput = (object: any): EntryWithoutId => {
  if (!object.type) throw new Error("missing entry type");
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
