import * as yup from 'yup';

export const registrationSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, 'Username must be at least 3 characters')
    .required('Username is required'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .required()
    .when('password', {
      is: (password: string) => !!password,
      then: (schema) =>
        schema
          .oneOf([yup.ref('password')], 'Passwords must match')
          .required('Confirm password is required'),
      otherwise: (schema) => schema.notRequired(),
    }),
});
