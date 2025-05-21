import { Formats, TranslationValues } from 'next-intl';

import * as yup from 'yup';

export const updateNameSchema = (t: {
  <TargetKey extends any>(
    key: TargetKey,
    values?: TranslationValues,
    formats?: Formats
  ): string;
}) => {
  return yup.object().shape({
    name: yup
      .string()
      .matches(/^[a-zA-Zа-яА-ЯёЁіІїЇєЄ\s]+$/, t('form.validation.name.letters'))
      .min(3, t('form.validation.name.minLength'))
      .max(20, t('form.validation.maxLength'))
      .required(t('form.validation.name.required')),
  });
};
