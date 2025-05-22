import * as yup from 'yup';

import {
  getPasswordField,
  TFunction,
} from '@/shared/helpers/validation-schemas';

export const updatePasswordSchema = (t: TFunction) => {
  return yup.object().shape({
    password: getPasswordField(t),
    newPassword: yup
      .string()
      .min(6, t('form.validation.password.minLength'))
      .max(20, t('form.validation.maxLength'))
      .matches(
        /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?`~]+$/,
        t('form.validation.password.allowedSymbols')
      )
      .notOneOf([yup.ref('password')], t('form.validation.password.notSame'))
      .required(t('form.validation.password.required')),
    confirmPassword: yup
      .string()
      .required(t('form.validation.confirmPassword.required'))
      .oneOf(
        [yup.ref('newPassword')],
        t('form.validation.confirmPassword.match')
      ),
  });
};
