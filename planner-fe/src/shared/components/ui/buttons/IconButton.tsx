import IconButton from '@mui/material/IconButton';
import TooltipCustom from '@/shared/components/ui/Tooltip';
import { MouseEventHandler } from 'react';

interface Props {
  icon: React.ReactNode;
  name: string;
  size?: 'small' | 'medium' | 'large';
  type?: 'button' | 'submit' | 'reset';
  showName?: boolean;
  hasTooltip?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

/*************  ✨ Codeium Command ⭐  *************/
/**
 * A convenience wrapper around Material UI's IconButton. It adds:
 * * aria-label for accessibility
 * * Optional showName prop to display the name next to the icon
 * * Optional hasTooltip prop to wrap the button in a Tooltip with the name
 * * Optional type prop to set the button type
 *
 * @example
 * <IconButtonCustom icon={<FiPlus />} name="Add" onClick={() => console.log('Clicked')} />
 */
/******  3ed197b7-806b-4db6-834a-2b75b33cdb42  *******/ export const IconButtonCustom =
  ({
    icon,
    name,
    size = 'medium',
    showName = false,
    hasTooltip = true,
    type = 'button',
    onClick,
  }: Props) => {
    const button = (
      <IconButton size={size} onClick={onClick} aria-label={name} type={type}>
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
