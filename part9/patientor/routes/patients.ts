import express from "express";
import patientService from "../services/patientService";
import parsePatientInput from "../util";

const router = express.Router();

router.get("/", (_req, res) => {
  console.log("Fetch all Patients");
  res.send(patientService.getNonSensitiveAll());
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

export default router;
