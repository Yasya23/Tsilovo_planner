import * as yup from 'yup';
import { emailRegx } from './email-regx';

export const registrationSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[a-zA-Zа-яА-ЯёЁіІїЇєЄ]+$/, "Ім'я може містити тільки літери")
    .min(3, "Ім'я користувача повинно містити не менше 3 символів")
    .required("Ім'я користувача обов'язкове"),
  email: yup
    .string()
    .matches(emailRegx, 'Невірна адреса електронної пошти')
    .required("Електронна пошта обов'язкова"),
  password: yup
    .string()
    .min(6, 'Пароль повинен містити не менше 6 символів')
    .test('password-strength', 'Слабкий пароль', (value) => {
      if (!value) return false;
      const hasUpperCase = /[A-Z]/.test(value);
      const hasNumber = /\d/.test(value);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

      const strength = [hasUpperCase, hasNumber, hasSpecialChar].filter(
        Boolean
      ).length;

      if (strength === 0) return false;
      if (strength === 1) throw new yup.ValidationError('Слабкий пароль');
      if (strength === 2) throw new yup.ValidationError('Середній пароль');
      if (strength === 3) return true;
      return false;
    })
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
