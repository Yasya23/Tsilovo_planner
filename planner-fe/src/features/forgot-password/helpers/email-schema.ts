import * as yup from 'yup';

import { getEmailField, TFunction } from '@/shared/helpers/validation-schemas';

export const checkEmailSchema = (t: TFunction) => {
  return yup.object().shape({
    email: getEmailField(t),
  });
};
