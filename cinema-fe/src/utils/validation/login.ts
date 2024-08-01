import * as yup from 'yup';

export const emailRegx =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .matches(emailRegx, 'Invalid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(5, 'Password must be at least 6 characters')
    .required('Password is required'),
});
