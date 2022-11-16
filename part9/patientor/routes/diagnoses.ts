import express from "express";
import diagnoseService from "../services/diagnoseService";

const router = express.Router();

router.get("/", (_req, res) => {
  console.log("Fetch all Diagnoses");
  res.send(diagnoseService.getAll());
});

export default router;
