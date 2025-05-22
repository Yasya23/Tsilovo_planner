import * as yup from 'yup';

import {
  getConfirmPasswordField,
  getEmailField,
  getNameField,
  getPasswordField,
  TFunction,
} from '@/shared/helpers/validation-schemas';

export const createRegistrationSchema = (t: TFunction) => {
  return yup.object().shape({
    name: getNameField(t),
    email: getEmailField(t),
    password: getPasswordField(t),
    confirmPassword: getConfirmPasswordField(t),
  });
};
