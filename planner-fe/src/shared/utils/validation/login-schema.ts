import * as yup from 'yup';
import { emailRegx } from './email-regx';
import { getTranslations } from 'next-intl/server';

export const createLoginSchema = async (locale: string) => {
  const t = await getTranslations({ locale, namespace: 'Common' });

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
