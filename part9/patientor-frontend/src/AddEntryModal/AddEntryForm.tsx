import { Grid, Button } from "@material-ui/core";
import { Formik, Form } from "formik";
import { useState } from "react";

import { FormOption } from "../AddPatientModal/FormField";
import {
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from "../types";
import { SelectField } from "../AddPatientModal/FormField";
import HealthCheckEntryForm from "./HealthCheckEntryForm";
import HospitalEntryForm from "./HospitalEntryForm";
import OccupationalHealthcareEntryForm from "./OccupationalHealthcareEntryForm";

export type HealthCheckFormValues = Omit<HealthCheckEntry, "id">;
export type HospitalFormValues = Omit<HospitalEntry, "id">;
export type OccupationalFormValues = Omit<OccupationalHealthcareEntry, "id">;

export type FormValues =
  | HealthCheckFormValues
  | HospitalFormValues
  | OccupationalFormValues;

export interface formProps {
  onSubmit: (values: FormValues) => void;
  onCancel: () => void;
}

// interface Forms {
//   formInitialValues: FormValues;
//   formValidation: (value: FormValues) => void;
//   FormComponent: JSX.Element;
// }

const formOptions: FormOption[] = [
  { value: "HealthCheck", label: "Health Check" },
  { value: "Hospital", label: "Hospital" },
  { value: "OccupationalHealthcare", label: "Occupational Healthcare" },
];

export const AddEntryForm = ({ onSubmit, onCancel }: formProps) => {
  const [formType, setFormType] = useState<FormOption["value"]>("HealthCheck");
  const [changeForm, setChangeForm] = useState<boolean>(false);

  const onNext = ({ type }: { type: FormOption["value"] }) => {
    console.log(type);
    setFormType(type);
    setChangeForm(true);
  };

  if (!changeForm)
    return (
      <Formik
        initialValues={{
          type: formType,
        }}
        onSubmit={onNext}
      >
        {() => {
          return (
            <Form className="form ui">
              <SelectField
                label="Entry Type"
                name="type"
                options={formOptions}
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
                  >
                    Next
                  </Button>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    );

  if (changeForm && formType === "HealthCheck")
    return <HealthCheckEntryForm onSubmit={onSubmit} onCancel={onCancel} />;
  else if (changeForm && formType === "Hospital")
    return <HospitalEntryForm onSubmit={onSubmit} onCancel={onCancel} />;
  else
    return (
      <OccupationalHealthcareEntryForm
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    );
};

export default AddEntryForm;
