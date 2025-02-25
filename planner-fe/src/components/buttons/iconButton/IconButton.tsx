import IconButton from '@mui/material/IconButton';
import TooltipCustom from '@/components/Tooltip';
import {
  FiLogOut,
  FiEdit2,
  FiTrash2,
  FiDownload,
  FiSmile,
  FiXCircle,
} from 'react-icons/fi';
import { MouseEventHandler } from 'react';

import styles from './IconButton.module.scss';

const buttons = {
  download: { icon: <FiDownload />, name: 'Завантажити' },
  trash: { icon: <FiTrash2 />, name: 'Видалити' },
  logout: { icon: <FiLogOut />, name: 'Вийти' },
  edit: { icon: <FiEdit2 />, name: 'Редагувати' },
  mood: { icon: <FiSmile />, name: 'Змінити настрій' },
  close: { icon: <FiXCircle />, name: 'Зачинити' },
};

interface Props {
  type: 'download' | 'trash' | 'logout' | 'edit' | 'mood' | 'close';
  size?: 'small' | 'medium' | 'large';
  showName?: boolean;
  hasTooltip?: boolean;
  toolipTitle?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  sx?: object;
}

export const IconButtonCustom = ({
  type,
  size = 'large',
  showName = false,
  hasTooltip = true,
  toolipTitle,
  onClick,
  sx,
}: Props) => {
  const icon = buttons[type]?.icon;
  const name = buttons[type]?.name ?? '';

  if (!hasTooltip) {
    return <IconButton className={styles.Button}>{icon}</IconButton>;
  }

  return (
    <TooltipCustom title={toolipTitle ?? name}>
      <IconButton size={size} onClick={onClick} sx={sx} aria-label={name}>
        {buttons[type].icon} {showName && name}
      </IconButton>
    </TooltipCustom>
  );
};

export default IconButtonCustom;
