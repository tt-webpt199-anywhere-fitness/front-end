import * as yup from "yup";

export const inputValidation = (
  name,
  value,
  schema,
  setFormErrors,
  formErrors
) => {
  yup
    .reach(schema, name)
    .validate(value)
    .then(() => {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    })
    .catch((err) => {
      setFormErrors({
        ...formErrors,
        [name]: err.formErrors[0],
      });
    });
};
