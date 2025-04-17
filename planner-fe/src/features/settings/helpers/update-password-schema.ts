import { Formats, TranslationValues } from 'next-intl';

import * as yup from 'yup';

export const createUpdateEmailSchema = (t: {
  <TargetKey extends any>(
    key: TargetKey,
    values?: TranslationValues,
    formats?: Formats
  ): string;
}) => {
  return yup.object().shape({
    password: yup
      .string()
      .min(6, t('form.validation.password.minLength'))
      .required(t('form.validation.password.required')),
    newPassword: yup
      .string()
      .min(6, t('form.validation.password.minLength'))
      .required(t('form.validation.confirmPassword.required')),
    confirmPassword: yup
      .string()
      .required(t('form.validation.confirmPassword.required'))
      .when('newPassword', {
        is: (newPassword: string) => !!newPassword,
        then: (schema) =>
          schema
            .oneOf(
              [yup.ref('newPassword')],
              t('form.validation.confirmPassword.match')
            )
            .required(t('form.validation.confirmPassword.required')),
        otherwise: (schema) => schema.notRequired(),
      }),
  });
};
