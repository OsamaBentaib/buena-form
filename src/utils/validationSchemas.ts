import * as yup from "yup";

export const validationSchemas = [
    yup.object().shape({
      fullName: yup.string().required("Full Name is required"),
    }),
    yup.object().shape({
      email: yup
        .string()
        .email("Please enter a valid email address")
        .required("Please enter an email address"),
    }),
    yup.object().shape({
      phoneNumber: yup.string().required("Please enter a phone number"),
    }),
    yup.object().shape({
      salary: yup.string().required("Please choose a salary range"),
    }),
  ];