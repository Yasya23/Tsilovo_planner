'use client';

import { useForm } from 'react-hook-form';

import { useTranslations } from 'next-intl';

import { yupResolver } from '@hookform/resolvers/yup';

import { ButtonCustom } from '@/shared/components/buttons/Button';
import Input from '@/shared/components/input/Input';
import icons from '@/shared/icons/icons';

import { updateNameSchema } from '@/features/settings/helpers/update-name-schema';

import styles from './ChangeData.module.scss';

type FormValues = { name: string };

type Props = {
  name: string;
  isPending: boolean;
  updateName: (payload: FormValues) => void;
};

export const ChangeName = ({ isPending, updateName, name }: Props) => {
  const t = useTranslations('Common');

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<FormValues>({
    resolver: yupResolver(updateNameSchema(t)),
    mode: 'onChange',
    defaultValues: { name: '' },
  });

  const onSubmit = (values: FormValues) => updateName(values);

  const errorMessage = errors.name?.message;
  const disabledInput = isPending || isSubmitting;
  const disabledButton = disabledInput || !!errorMessage || !isValid;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.Wrapper}>
      <h2 className={styles.Title}>{t('settings.changeName')}</h2>
      <p className={styles.OldData}>
        {t('form.labels.name')}: {name}
      </p>
      <Input
        {...register('name', {
          onBlur: (e) => {
            if (!e.target.value.trim()) {
              clearErrors('name');
            }
          },
        })}
        type="text"
        label={t('form.labels.newName')}
        placeholder={t('form.placeholders.newName')}
        icon={<icons.Home />}
        hasAbilityHideValue
        error={errorMessage}
        isDirty={isDirty}
        disabled={disabledInput}
      />

      <ButtonCustom
        type="submit"
        style="outlined"
        name={t('buttons.update')}
        disabled={disabledButton}
        onClick={handleSubmit(onSubmit)}
      />
    </form>
  );
};
