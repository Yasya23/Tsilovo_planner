import { Formats, TranslationValues } from 'next-intl';

import * as yup from 'yup';

import {
  getEmailField,
  getPasswordField,
  TFunction,
} from '@/shared/helpers/validation-schemas';

export const updateEmailSchema = (t: TFunction) => {
  return yup.object().shape({
    email: getEmailField(t),
    password: getPasswordField(t),
  });
};
