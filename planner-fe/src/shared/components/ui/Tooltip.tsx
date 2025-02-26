import Tooltip from '@mui/material/Tooltip';
import { ReactElement } from 'react';

interface BasicTooltipProps {
  title: string;
  children: ReactElement;
}

const TooltipCustom = ({ title, children }: BasicTooltipProps) => {
  return <Tooltip title={title}>{children}</Tooltip>;
};

export default TooltipCustom;
