import * as yup from 'yup';
import { TranslationValues, Formats } from 'next-intl';
import { emailRegx } from './email-regx';

export const createLoginSchema = (t: {
  <TargetKey extends any>(
    key: TargetKey,
    values?: TranslationValues,
    formats?: Formats
  ): string;
}) => {
  return yup.object().shape({
    email: yup
      .string()
      .matches(emailRegx, t('form.validation.email.invalid'))
      .required(t('form.validation.email.required')),
    password: yup
      .string()
      .min(5, t('form.validation.password.minLength'))
      .required(t('form.validation.password.required')),
  });
};
