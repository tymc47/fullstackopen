import { useStateValue } from "../state";
import { OccupationalHealthcareEntry } from "../types";
import { Card, CardContent, List, ListItem, Typography } from "@mui/material";

const OccupationalHealthcare = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Card variant="outlined">
      <CardContent sx={{ p: 2 }}>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {entry.type} {entry.date}
          <br />
          {entry.employerName}
        </Typography>
        <Typography variant="body1">{entry.description}</Typography>
        {entry.sickLeave ? (
          <>
            <Typography variant="body1">Sick Leave:</Typography>
            <Typography variant="body2">
              {`from ${entry.sickLeave.startDate} to ${entry.sickLeave.endDate}`}
            </Typography>
          </>
        ) : null}
        {entry.diagnosisCodes && entry.diagnosisCodes.length !== 0 ? (
          <>
            <Typography variant="body1">Disagnoses:</Typography>
            <List>
              {entry.diagnosisCodes.map((code) => (
                <ListItem key={code}>
                  {code}
                  {"     "}
                  {diagnoses[code].name}
                </ListItem>
              ))}
            </List>
          </>
        ) : null}
      </CardContent>
      <Typography sx={{ pl: 2 }} color="text.secondary">
        diagnose by {entry.specialist}
      </Typography>
    </Card>
  );
};

export default OccupationalHealthcare;
