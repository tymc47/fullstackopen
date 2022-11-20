import { Grid, Button } from "@material-ui/core";
import { Formik, Form } from "formik";
import { useState } from "react";

import { FormOption } from "../AddPatientModal/FormField";
import { HealthCheckEntry, HospitalEntry } from "../types";
import { SelectField } from "../AddPatientModal/FormField";
import HealthCheckEntryForm from "./HealthCheckEntryForm";
import HospitalEntryForm from "./HospitalEntryForm";

export type HealthCheckFormValues = Omit<HealthCheckEntry, "id">;
export type HospitalFormValues = Omit<HospitalEntry, "id">;

export type FormValues = HealthCheckFormValues | HospitalFormValues;
export type FormTypes = "HealthCheck" | "Hospital";

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
  { value: "HealthCheck", label: "HealthCheck" },
  { value: "Hospital", label: "Hospital" },
];

export const AddEntryForm = ({ onSubmit, onCancel }: formProps) => {
  const [formType, setFormType] = useState<FormTypes>("HealthCheck");
  const [changeForm, setChangeForm] = useState<boolean>(false);

  const onNext = ({ type }: { type: FormTypes }) => {
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
  return null;
};

export default AddEntryForm;
