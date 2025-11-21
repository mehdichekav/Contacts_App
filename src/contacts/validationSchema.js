import * as yup from "yup";

export const contactSchema = yup.object().shape({
  name: yup
    .string()
    .required("First name is required"),

  lastName: yup
    .string()
    .required("Last name is required"),

  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),

  phone: yup
    .string()
    .matches(/^[0-9]{11}$/, "Phone must be exactly 11 digits")
    .required("Phone is required"),
});
