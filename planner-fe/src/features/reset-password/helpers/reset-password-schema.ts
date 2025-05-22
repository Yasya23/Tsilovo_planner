import * as yup from 'yup';

import {
  getConfirmPasswordField,
  getPasswordField,
  TFunction,
} from '@/shared/helpers/validation-schemas';

export const resetPasswordSchema = (t: TFunction) => {
  return yup.object().shape({
    password: getPasswordField(t),
    confirmPassword: getConfirmPasswordField(t),
  });
};
