import * as yup from 'yup';

import { getNameField, TFunction } from '@/shared/helpers/validation-schemas';

export const updateNameSchema = (t: TFunction) => {
  return yup.object().shape({
    name: getNameField(t),
  });
};
