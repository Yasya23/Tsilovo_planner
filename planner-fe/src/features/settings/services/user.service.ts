import { axiosAuth } from '@/api/interceptors';

import { services } from '@/features/settings/constants/api-services';

import {
  ChangeEmailType,
  ChangeNameType,
  ChangePasswordType,
} from '../types/settings';

export const UserService = {
  async changeAvatar(imageUrl: string): Promise<void> {
    await axiosAuth.put(services.updateAvatar, { image: imageUrl });
  },

  async changeName({ name }: ChangeNameType): Promise<void> {
    await axiosAuth.put(services.updateName, { name });
  },

  async changeEmail({ email, password }: ChangeEmailType): Promise<void> {
    await axiosAuth.put(services.updateEmail, { email, password });
  },

  async changePassword({
    password,
    newPassword,
  }: ChangePasswordType): Promise<void> {
    await axiosAuth.put(services.updatePassword, { password, newPassword });
  },

  async deleteProfile(): Promise<void> {
    await axiosAuth.post(services.deleteProfile);
  },
};
