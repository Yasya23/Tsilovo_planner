import * as yup from 'yup';

export const emailRegx =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .matches(emailRegx, 'Невірна адреса електронної пошти')
    .required("Електронна пошта обов'язкова"),
  password: yup
    .string()
    .min(5, 'Пароль повинен містити не менше 6 символів')
    .required("Пароль обов'язковий"),
});
