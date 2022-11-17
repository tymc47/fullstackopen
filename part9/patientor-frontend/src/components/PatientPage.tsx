import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { updatePatient, useStateValue } from "../state";

import {
  Typography,
  Box,
  Table,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();

  const fetchPatientData = async () => {
    console.log("fetching patient data");
    try {
      if (id) {
        const { data } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(updatePatient(data));
        setPatient(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const patient = Object.values(patients).find(
      (obj: Patient) => obj.id === id
    );

    if (!patient?.ssn) {
      void fetchPatientData();
    } else {
      setPatient(patient);
    }
  }, []);

  return (
    <div>
      <Box m={2}>
        <Typography variant="h6">
          {patient?.name}
          {patient?.gender === "male" ? (
            <MaleIcon />
          ) : patient?.gender === "female" ? (
            <FemaleIcon />
          ) : null}
        </Typography>
      </Box>
      <Table size="small">
        <colgroup>
          <col style={{ width: "20%" }} />
          <col style={{ width: "80%" }} />
        </colgroup>
        <TableBody>
          <TableRow>
            <TableCell variant="head">SSN</TableCell>
            <TableCell>{patient?.ssn}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">Occupation</TableCell>
            <TableCell>{patient?.occupation}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default PatientPage;
