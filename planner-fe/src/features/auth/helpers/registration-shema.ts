import { Formats, TranslationValues } from 'next-intl';

import * as yup from 'yup';

import { emailRegx } from '@/shared/utils/email-regx';

export const createRegistrationSchema = (t: {
  <TargetKey extends any>(
    key: TargetKey,
    values?: TranslationValues,
    formats?: Formats
  ): string;
}) => {
  return yup.object().shape({
    name: yup
      .string()
      .matches(/^[a-zA-Zа-яА-ЯёЁіІїЇєЄ]+$/, t('form.validation.name.letters'))
      .min(3, t('form.validation.name.minLength'))
      .required(t('form.validation.name.required')),
    email: yup
      .string()
      .matches(emailRegx, t('form.validation.email.invalid'))
      .required(t('form.validation.email.required')),
    password: yup
      .string()
      .min(6, t('form.validation.password.minLength'))
      .required(t('form.validation.password.required')),
    confirmPassword: yup
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
      }),
  });
};
