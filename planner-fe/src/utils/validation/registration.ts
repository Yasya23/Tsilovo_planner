import * as yup from 'yup';
import { emailRegx } from './login';

export const registrationSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Ім'я користувача повинно містити не менше 3 символів")
    .required("Ім'я користувача обов'язкове"),
  email: yup
    .string()
    .matches(emailRegx, 'Невірна адреса електронної пошти')
    .required("Електронна пошта обов'язкова"),
  password: yup
    .string()
    .min(6, 'Пароль повинен містити не менше 6 символів')
    .required("Пароль обов'язковий"),
  confirmPassword: yup
    .string()
    .required("Підтвердження паролю обов'язкове")
    .when('password', {
      is: (password: string) => !!password,
      then: (schema) =>
        schema
          .oneOf([yup.ref('password')], 'Паролі повинні співпадати')
          .required("Підтвердження паролю обов'язкове"),
      otherwise: (schema) => schema.notRequired(),
    }),
});
