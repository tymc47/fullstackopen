import { useStateValue } from "../state";
import { HospitalEntry } from "../types";
import { Card, CardContent, List, ListItem, Typography } from "@mui/material";

const Hospital = ({ entry }: { entry: HospitalEntry }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Card variant="outlined">
      <CardContent sx={{ p: 2 }}>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {entry.type} {entry.date}
        </Typography>
        <Typography variant="body1">{entry.description}</Typography>
        <Typography variant="body1">Discharge:</Typography>
        <Typography variant="body2">
          {`${entry.discharge.date}   ${entry.discharge.criteria}`}
        </Typography>
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

export default Hospital;
