import Link from 'next/link';
import { routes } from '@/constants/routes';
import styles from './MessageNavigator.module.scss';

interface LinkItem {
  href: string;
  label: string;
  className?: string;
}

interface MessageNavigatorProps {
  message: string;
  links?: LinkItem[];
}

const defaultLinks = [
  { href: routes.home, label: 'На головну', className: styles.buttonToMain },
  {
    href: routes.planner,
    label: 'До планувальника',
    className: styles.buttonToPlanner,
  },
];

export const MessageNavigator = ({
  message,
  links = defaultLinks,
}: MessageNavigatorProps) => {
  return (
    <div className={styles.wrapper}>
      <p>{message}</p>
      <div className={styles.linksContainer}>
        {links.map(({ href, label, className }, index) => (
          <Link
            key={index}
            href={href}
            className={className || styles.defaultButton}>
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
};
