import SkeletonLoader from "@/shared/components/ui/SkeletonLoader";
import styles from "./Skeleton.module.scss";
export const Skeleton = () => {
  return (
    <div className={styles.Skeleton}>
      <SkeletonLoader
        items={[
          { variant: 'rectangular', width: 300, height: 200 },
          { variant: 'rectangular', width: '100%', height: 200 },
        ]}
      />
    </div>
  );
};

