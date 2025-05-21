import { Formats, TranslationValues } from 'next-intl';

import * as yup from 'yup';

export const createUpdatePasswordSchema = (
  t: <TargetKey extends any>(
    key: TargetKey,
    values?: TranslationValues,
    formats?: Formats
  ) => string
) => {
  return yup.object().shape({
    password: yup
      .string()
      .min(6, t('form.validation.password.minLength'))
      .max(20, t('form.validation.maxLength'))
      .required(t('form.validation.password.required')),

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
