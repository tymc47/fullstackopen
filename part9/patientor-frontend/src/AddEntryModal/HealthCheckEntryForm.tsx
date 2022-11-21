import { RatingOption } from "../AddPatientModal/FormField";
import { HealthCheckRating } from "../types";
import { TextField } from "../AddPatientModal/FormField";
import { Field } from "formik";
import { SelectField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { formProps, FormValues } from "./AddEntryForm";
import { Formik, Form } from "formik";
import { Grid, Button } from "@material-ui/core";
import { useStateValue } from "../state";

const ratingOptions: RatingOption[] = [
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.LowRisk, label: "Low Risk" },
  { value: HealthCheckRating.HighRisk, label: "High Risk" },
  { value: HealthCheckRating.CriticalRisk, label: "Critical Risk" },
];

const formInitialValues: FormValues = {
  type: "HealthCheck" as const,
  description: "",
  date: "",
  specialist: "",
  healthCheckRating: HealthCheckRating.Healthy,
  diagnosisCodes: [],
};

const HealthCheckEntryForm = ({ onSubmit, onCancel }: formProps) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      enableReinitialize
      initialValues={formInitialValues}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <h3>Health Check Entry</h3>
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <SelectField
              label="Health Check Rating"
              name="healthCheckRating"
              options={ratingOptions}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />

            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default HealthCheckEntryForm;
