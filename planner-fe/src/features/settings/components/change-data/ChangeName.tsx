'use client';

import { useForm } from 'react-hook-form';

import { useTranslations } from 'next-intl';

import { yupResolver } from '@hookform/resolvers/yup';

import { ButtonCustom } from '@/shared/components/buttons/Button';
import Input from '@/shared/components/input/Input';
import { SkeletonLoader } from '@/shared/components/SkeletonLoader';
import icons from '@/shared/icons/icons';
import { useAuthContext } from '@/shared/providers/AuthProvider';

import { updateNameSchema } from '@/features/settings/helpers/update-name-schema';
import { useChangeName } from '@/features/settings/hooks/useChangeName';
import { ChangeNameType } from '@/features/settings/types/updateData';

import styles from './ChangeData.module.scss';

export const ChangeName = () => {
  const { user, refetch } = useAuthContext();
  const t = useTranslations('Common');
  const { changeName, isPending } = useChangeName(refetch);

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<ChangeNameType>({
    resolver: yupResolver(updateNameSchema(t)),
    mode: 'onChange',
    defaultValues: { name: '' },
  });

  const onSubmit = (values: ChangeNameType) => {
    changeName(values);
  };

  const errorMessage = errors.name?.message;
  const disabledInput = isSubmitting || !user;
  const disabledButton = disabledInput || !!errorMessage || !isValid;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.Wrapper}>
      <h2 className={styles.Title}>{t('settings.changeName')}</h2>
      {isPending || !user ? (
        <div className={styles.OldData}>
          <SkeletonLoader count={1} width={100} />
        </div>
      ) : (
        <p className={styles.OldData}>
          {t('form.labels.name')}: {user.name}
        </p>
      )}

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
