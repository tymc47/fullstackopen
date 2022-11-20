import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Patient, Entry } from "../types";
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
import { Button } from "@mui/material";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import EntryDetails from "../Entry";
import AddEntryModal from "../AddEntryModal";
import { FormValues } from "../AddEntryModal/AddEntryForm";

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: FormValues) => {
    try {
      if (id) {
        console.log(values.diagnosisCodes);
        const { data: updatedPatient } = await axios.post<Patient>(
          `${apiBaseUrl}/patients/${id}/entries`,
          values
        );
        dispatch(updatePatient(updatedPatient));
        setPatient(updatedPatient);
      }
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(String(e?.response?.data) || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

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

  if (!patient) return null;

  return (
    <div>
      <Box m={2}>
        <Typography variant="h6">
          {patient.name}
          {patient.gender === "male" ? (
            <MaleIcon />
          ) : patient.gender === "female" ? (
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
            <TableCell>{patient.ssn}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">Occupation</TableCell>
            <TableCell>{patient.occupation}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Box m={2} sx={{ display: "flex" }}>
        <Typography variant="h6">Entries</Typography>
        <Button
          sx={{ ml: 1 }}
          variant="outlined"
          onClick={() => setModalOpen(true)}
        >
          Add New Entry
        </Button>
      </Box>
      <AddEntryModal
        modalOpen={modalOpen}
        onClose={closeModal}
        error={error}
        onSubmit={submitNewEntry}
      />
      {patient.entries.map((entry: Entry) => (
        <EntryDetails key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

export default PatientPage;
