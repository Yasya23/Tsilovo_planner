import IconButton from '@mui/material/IconButton';
import TooltipCustom from '@/components/Tooltip';
import { AiOutlineDownload } from 'react-icons/ai';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { MouseEventHandler } from 'react';

import styles from './IconButton.module.scss';

const buttons = {
  download: { icon: <AiOutlineDownload />, name: 'Завантажити' },
  trash: { icon: <FaRegTrashAlt />, name: 'Видалити' },
  logout: { icon: <FiLogOut />, name: 'Вийти' },
};

interface Props {
  type: 'download' | 'trash' | 'logout';
  size?: 'small' | 'medium' | 'large';
  hasTooltip?: boolean;
  toolipTitle?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const IconButtonCustom = ({
  type,
  size = 'large',
  hasTooltip = true,
  toolipTitle,
  onClick,
}: Props) => {
  const icon = buttons[type]?.icon;
  const name = buttons[type]?.name ?? '';

  if (!hasTooltip) {
    return <IconButton className={styles.Button}>{icon}</IconButton>;
  }

  return (
    <TooltipCustom title={toolipTitle ?? name}>
      <IconButton size={size} onClick={onClick}>
        {buttons[type].icon}
      </IconButton>
    </TooltipCustom>
  );
};

export default IconButtonCustom;
