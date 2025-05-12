import { SkeletonLoader } from '@/shared/components/SkeletonLoader';

import styles from './Skeleton.module.scss';

export const Skeleton = () => {
  return (
    <div className={styles.Skeleton}>
      <SkeletonLoader count={1} width={250} height={20} />

      <div className={styles.Header}>
        <div className={styles.Goals}>
          <SkeletonLoader count={3} width={250} height={20} />
        </div>
        <div className={styles.Statistics}>
          <SkeletonLoader count={1} width={150} height={150} />
        </div>
      </div>

      <SkeletonLoader count={1} width={250} height={20} />
      <div className={styles.Days}>
        <SkeletonLoader count={7} width={200} height={250} />
      </div>
    </div>
  );
};
