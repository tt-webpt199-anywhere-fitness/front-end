import * as yup from "yup";

export default yup.object().shape({
  username: yup.string().required("User name is required"),
  password: yup
    .string()
    .required("Please enter your password")
    .min(4, "your password should be a minimum of 4 characters"),
  role_id: yup.boolean(),
});
