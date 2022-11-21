import { TextField } from "../AddPatientModal/FormField";
import { Field } from "formik";
import { DiagnosisSelection } from "../AddPatientModal/FormField";
import { formProps } from "./AddEntryForm";
import { Formik, Form } from "formik";
import { Grid, Button } from "@material-ui/core";
import { useStateValue } from "../state";

const OccupationalHealthcareEntryForm = ({ onSubmit, onCancel }: formProps) => {
  const [{ diagnoses }] = useStateValue();

  const FormComponent = (
    <>
      <h3>Occupational Healthcare Entry</h3>
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
        label="Employer"
        placeholder="Employer"
        name="employerName"
        component={TextField}
      />
      <Field
        label="Date"
        placeholder="YYYY-MM-DD"
        name="date"
        component={TextField}
      />
      <Field
        label="Sick Leave Start Date"
        placeholder="YYYY-MM-DD"
        name="sickLeave.startDate"
        component={TextField}
      />
      <Field
        label="Sick Leave End Date"
        placeholder="YYYY-MM-DD"
        name="sickLeave.endDate"
        component={TextField}
      />
    </>
  );

  return (
    <Formik
      enableReinitialize
      initialValues={{
        type: "OccupationalHealthcare" as const,
        description: "",
        date: "",
        specialist: "",
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: "",
        },
        diagnosisCodes: [],
      }}
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
        if (!values.employerName) {
          errors.employerName = requiredError;
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
            {FormComponent}
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

export default OccupationalHealthcareEntryForm;
