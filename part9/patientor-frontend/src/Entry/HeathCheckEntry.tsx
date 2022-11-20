import { useStateValue } from "../state";
import { HealthCheckEntry } from "../types";
import { Card, CardContent, Typography } from "@mui/material";
import { getKeyByValue } from "../utils";

const HealthCheck = ({ entry }: { entry: HealthCheckEntry }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Card variant="outlined">
      <CardContent sx={{ p: 2 }}>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {entry.type} {entry.date}
        </Typography>
        <Typography variant="body1">
          {entry.description}
          <br />
          Health Rating: {getKeyByValue(entry.healthCheckRating)}
        </Typography>
        {entry.diagnosisCodes && entry.diagnosisCodes.length !== 0 ? (
          <>
            <Typography variant="body1">Disagnoses:</Typography>
            <ul>
              {entry.diagnosisCodes.map((code) => (
                <li key={code}>
                  {code}
                  {"     "}
                  {diagnoses[code].name}
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </CardContent>
      <Typography sx={{ pl: 2 }} color="text.secondary">
        diagnose by {entry.specialist}
      </Typography>
    </Card>
  );
};

export default HealthCheck;
