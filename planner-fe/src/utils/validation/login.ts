import * as yup from 'yup';
import { emailRegx } from './emailRegx';

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .matches(emailRegx, 'Невірна адреса електронної пошти')
    .required('Електронна пошта обов\'язкова'),
  password: yup
    .string()
    .min(5, 'Пароль повинен містити не менше 6 символів')
    .required('Пароль обов\'язковий'),
});
