import IconButton from '@mui/material/IconButton';
import TooltipCustom from '@/shared/components/ui/Tooltip';
import { MouseEventHandler } from 'react';

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
