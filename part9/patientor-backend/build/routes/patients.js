"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const util_1 = __importDefault(require("../util"));
const router = express_1.default.Router();
router.get("/", (_req, res) => {
    console.log("Fetch all Patients");
    res.send(patientService_1.default.getNonSensitiveAll());
});
router.post("/", (req, res) => {
    console.log("Add patient");
    try {
        const newPatientEntry = (0, util_1.default)(req.body);
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
exports.default = router;
