import IconButton from '@mui/material/IconButton';
import TooltipCustom from '@/shared/components/ui/Tooltip';
import {
  FiLogOut,
  FiEdit2,
  FiTrash2,
  FiDownload,
  FiSmile,
  FiXCircle,
  FiMoon,
  FiSun,
  FiMonitor,
} from 'react-icons/fi';
import { MouseEventHandler } from 'react';

const buttons = {
  mood: { icon: <FiSmile />, name: 'Змінити настрій' },
  download: { icon: <FiDownload />, name: 'Завантажити' },
  trash: { icon: <FiTrash2 />, name: 'Видалити' },
  logout: { icon: <FiLogOut />, name: 'Вийти' },
  edit: { icon: <FiEdit2 />, name: 'Редагувати' },
  close: { icon: <FiXCircle />, name: 'Зачинити' },
  lightTheme: { icon: <FiSun />, name: 'Світла тема' },
  darkTheme: { icon: <FiMoon />, name: 'Темна тема' },
  systemTheme: { icon: <FiMonitor />, name: 'Системна тема' },
};

interface Props {
  icon: React.ReactNode;
  name: string;
  size?: 'small' | 'medium' | 'large';
  showName?: boolean;
  hasTooltip?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const IconButtonCustom = ({
  icon,
  name,
  size = 'medium',
  showName = false,
  hasTooltip = true,
  onClick,
}: Props) => {
  const button = (
    <IconButton size={size} onClick={onClick} aria-label={name}>
      {icon} {showName && name}
    </IconButton>
  );

  return hasTooltip ? (
    <TooltipCustom title={name}>{button}</TooltipCustom>
  ) : (
    button
  );
};
export default IconButtonCustom;
