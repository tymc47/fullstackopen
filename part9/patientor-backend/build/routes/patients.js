"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const util_1 = require("../util");
const router = express_1.default.Router();
router.get("/", (_req, res) => {
    console.log("Fetch all Patients");
    res.send(patientService_1.default.getNonSensitiveAll());
});
router.get("/:id", (req, res) => {
    console.log("Get one patient");
    const id = req.params.id;
    const patient = patientService_1.default.getOne(id);
    if (patient) {
        res.send(patient);
    }
    else {
        res.status(400).send(`Not patient found with id: ${id}`);
    }
});
router.post("/", (req, res) => {
    console.log("Add patient");
    try {
        const newPatientEntry = (0, util_1.parsePatientInput)(req.body);
        const newEntry = patientService_1.default.addNew(newPatientEntry);
        res.send(newEntry);
    }
    catch (err) {
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
        const patient = patientService_1.default.getOne(req.params.id);
        if (!patient)
            throw new Error("invalid ID");
        const newEntry = (0, util_1.parseEntryInput)(req.body);
        const result = patientService_1.default.addEntry(newEntry, patient);
        res.send(result);
    }
    catch (err) {
        let errMsg = "Something went wrong. ";
        if (err instanceof Error) {
            errMsg += "Error: " + err.message;
        }
        res.status(400).send(errMsg);
    }
});
exports.default = router;
