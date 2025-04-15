'use client';

import Spinner from '@/shared/components/ui/Spinner';
import styles from './Error.module.scss';

type FormErrorProps = {
  isPending: boolean;
  error?: string;
};

export const FormError = ({ isPending, error }: FormErrorProps) => {
  return <div className={styles.Error}>{isPending ? <Spinner /> : error}</div>;
};

export default FormError;
