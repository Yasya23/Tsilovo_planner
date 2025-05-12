import { MouseEventHandler } from 'react';

import IconButton from '@mui/material/IconButton';

import TooltipCustom from '@/shared/components/Tooltip';

interface Props {
  icon: React.ReactNode;
  name: string;
  size?: 'small' | 'medium' | 'large';
  type?: 'button' | 'submit' | 'reset';
  showName?: boolean;
  hasTooltip?: boolean;
  color?: 'secondary' | 'default' | 'warning';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export const IconButtonCustom = ({
  icon,
  name,
  size = 'medium',
  showName = false,
  hasTooltip = true,
  type = 'button',
  color = 'default',
  onClick,
  disabled = false,
}: Props) => {
  const button = (
    <IconButton
      size={size}
      onClick={onClick}
      aria-label={name}
      type={type}
      color={color}
      disabled={disabled}
    >
      {icon} {showName && name}
    </IconButton>
  );

  return hasTooltip ? (
    <TooltipCustom title={name}>{button}</TooltipCustom>
  ) : (
    button
  );
};
