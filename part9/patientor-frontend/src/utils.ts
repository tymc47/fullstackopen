import { HealthCheckRating } from "./types";

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const getKeyByValue = (value: number): string => {
  const indexOfValue = Object.values(HealthCheckRating).indexOf(
    value as unknown as HealthCheckRating
  );
  const key = Object.keys(HealthCheckRating)[indexOfValue];
  return key;
};
