import * as yup from 'yup';

import { emailRegx } from './email-regx';

export const updateInfoSchema = yup.object().shape({
  email: yup
    .string()
    .matches(emailRegx, 'Невірна адреса електронної пошти')
    .required("Електронна пошта обов'язкова"),
  password: yup
    .string()
    .min(6, 'Пароль повинен містити не менше 6 символів')
    .required("Пароль обов'язковий"),
  newPasswordCheckbox: yup.boolean(),
  newPassword: yup
    .string()
    .min(6, 'Пароль повинен містити не менше 6 символів')
    .when('newPasswordCheckbox', {
      is: true,
      then: (schema) =>
        schema
          .required("Новий пароль обов'язковий")
          .test(
            'not-same',
            'Новий пароль не може бути таким самим, як старий',
            function (value) {
              const { password } = this.parent;
              return value !== password;
            }
          ),
      otherwise: (schema) => schema.notRequired(),
    }),
  confirmNewPassword: yup.string().when('newPasswordCheckbox', {
    is: true,
    then: (schema) =>
      schema
        .oneOf([yup.ref('newPassword')], 'Паролі повинні співпадати')
        .required("Підтвердження паролю обов'язкове"),
    otherwise: (schema) => schema.notRequired(),
  }),
});
