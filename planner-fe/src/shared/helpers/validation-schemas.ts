import { Formats, TranslationValues } from 'next-intl';

import * as yup from 'yup';

import { emailRegx } from '@/shared/utils/email-regx';

export type TFunction = {
  <TargetKey extends any>(
    key: TargetKey,
    values?: TranslationValues,
    formats?: Formats
  ): string;
};
export const getEmailField = (t: TFunction) =>
  yup
    .string()
    .matches(emailRegx, t('form.validation.email.invalid'))
    .required(t('form.validation.email.required'));

export const getPasswordField = (t: TFunction) =>
  yup
    .string()
    .min(6, t('form.validation.password.minLength'))
    .max(20, t('form.validation.maxLength'))
    .matches(
      /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?`~]+$/,
      t('form.validation.password.allowedSymbols')
    )
    .required(t('form.validation.password.required'));

export const getNameField = (t: TFunction) =>
  yup
    .string()
    .matches(/^[a-zA-Zа-яА-ЯёЁіІїЇєЄ\s]+$/, t('form.validation.name.letters'))
    .min(3, t('form.validation.name.minLength'))
    .max(20, t('form.validation.maxLength'))
    .required(t('form.validation.name.required'));

export const getConfirmPasswordField = (t: TFunction) =>
  yup
    .string()
    .required(t('form.validation.confirmPassword.required'))
    .when('password', {
      is: (password: string) => !!password,
      then: (schema) =>
        schema
          .oneOf(
            [yup.ref('password')],
            t('form.validation.confirmPassword.match')
          )
          .required(t('form.validation.confirmPassword.required')),
      otherwise: (schema) => schema.notRequired(),
    });
