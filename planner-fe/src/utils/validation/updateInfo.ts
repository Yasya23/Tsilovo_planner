import * as yup from 'yup';
import { emailRegx } from './emailRegx';

export const updateInfoSchema = yup.object().shape({
  email: yup
    .string()
    .matches(emailRegx, 'Невірна адреса електронної пошти')
    .required('Електронна пошта обов\'язкова'),
  password: yup
    .string()
    .min(6, 'Пароль повинен містити не менше 6 символів')
    .required('Пароль обов\'язковий'),
  confirmPassword: yup
    .string()
    .required('Підтвердження паролю обов\'язкове')
    .when('password', {
      is: (password: string) => !!password,
      then: (schema) =>
        schema
          .oneOf([yup.ref('password')], 'Паролі повинні співпадати')
          .required('Підтвердження паролю обов\'язкове'),
      otherwise: (schema) => schema.notRequired(),
    }),
});
