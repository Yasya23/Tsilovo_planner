import Skeleton from '@mui/material/Skeleton';

interface SkeletonItem {
  variant: 'rounded' | 'circular' | 'rectangular';
  width: number | string;
  height: number;
}

interface SkeletonLoaderProps {
  count?: number;
  width?: number | string;
  height?: number;
  variant?: 'rounded' | 'circular' | 'rectangular';
  items?: SkeletonItem[];
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  count = 3,
  width = 320,
  height = 20,
  variant = 'rounded',
  items,
}) => {
  return (
    <>
      {items
        ? items.map((item, index) => (
            <Skeleton
              key={index}
              variant={item.variant}
              width={item.width}
              height={item.height}
            />
          ))
        : [...Array(count)].map((_, index) => (
            <Skeleton
              key={index}
              variant={variant}
              width={width}
              height={height}
            />
          ))}
    </>
  );
};
