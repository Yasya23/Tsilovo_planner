export interface LoginFormValues {
  email: string;
  password: string;
  newPassword?: string;
}

export interface RegisterFormValues extends LoginFormValues {
  name: string;
}
