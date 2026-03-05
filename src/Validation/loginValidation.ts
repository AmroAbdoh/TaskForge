import * as yup from "yup";

const loginSchema = yup.object({
  email: yup.string().email("Invalid Email").required("EMAIL IS REQUIRED"),

  password: yup
    .string()
    .min(8, "Password Must Be at least 8 characters")
    .required("PASSWORD IS REQUIRED"),
});

export default loginSchema;
