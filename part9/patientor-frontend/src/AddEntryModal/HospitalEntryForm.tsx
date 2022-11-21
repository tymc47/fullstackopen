import { TextField } from "../AddPatientModal/FormField";
import { Field } from "formik";
import { HospitalFormValues } from "./AddEntryForm";
import { formProps } from "./AddEntryForm";
import { Formik, Form } from "formik";
import { useStateValue } from "../state";
import { DiagnosisSelection } from "../AddPatientModal/FormField";
import { Grid, Button } from "@material-ui/core";

const formInitialValues: HospitalFormValues = {
  type: "Hospital" as const,
  description: "",
  date: "",
  specialist: "",
  discharge: {
    criteria: "",
    date: "",
  },
  diagnosisCodes: [],
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const formValidation = (values: any) => {
  const requiredError = "Field is required";
  const errors: { [field: string]: string | object } = {};
  console.log(errors);
  if (!values.description) {
    errors.description = requiredError;
  }
  if (!values.date) {
    errors.date = requiredError;
  }
  if (!values.specialist) {
    errors.specialist = requiredError;
  }
  if (!values.discharge.date || !values.discharge.criteria) {
    errors.discharge = {
      date: requiredError,
      criteria: requiredError,
    };
  }
  return errors;
};

const FormComponent = (
  <>
    <h3>Hospital Entry Form</h3>
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
    <Field
      label="Discharge Date"
      placeholder="YYYY-MM-DD"
      name="discharge.date"
      component={TextField}
    />
    <Field
      label="Discharge Criteria"
      placeholder="Discharge Criteria"
      name="discharge.criteria"
      component={TextField}
    />
  </>
);

const HospitalEntryForm = ({ onSubmit, onCancel }: formProps) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      enableReinitialize
      initialValues={formInitialValues}
      onSubmit={onSubmit}
      validate={formValidation}
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

export default HospitalEntryForm;
