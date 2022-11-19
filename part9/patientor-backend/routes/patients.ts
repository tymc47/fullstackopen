import express from "express";
import patientService from "../services/patientService";
import { parsePatientInput, parseEntryInput } from "../util";

const router = express.Router();

router.get("/", (_req, res) => {
  console.log("Fetch all Patients");
  res.send(patientService.getNonSensitiveAll());
});

router.get("/:id", (req, res) => {
  console.log("Get one patient");
  const id = req.params.id;
  const patient = patientService.getOne(id);

  if (patient) {
    res.send(patient);
  } else {
    res.status(400).send(`Not patient found with id: ${id}`);
  }
});

router.post("/", (req, res) => {
  console.log("Add patient");

  try {
    const newPatientEntry = parsePatientInput(req.body);
    const newEntry = patientService.addNew(newPatientEntry);
    res.send(newEntry);
  } catch (err: unknown) {
    let errMsg = "Something went wrong. ";
    if (err instanceof Error) {
      errMsg += "Error: " + err.message;
    }
    res.status(400).send(errMsg);
  }
});

router.post("/:id/entries", (req, res) => {
  console.log("Post entry to patient");

  try {
    const patient = patientService.getOne(req.params.id);
    if (!patient) throw new Error("invalid ID");
    const newEntry = parseEntryInput(req.body);
    const result = patientService.addEntry(newEntry, patient);

    res.send(result);
  } catch (err: unknown) {
    let errMsg = "Something went wrong. ";
    if (err instanceof Error) {
      errMsg += "Error: " + err.message;
    }
    res.status(400).send(errMsg);
  }
});

export default router;
