import { ReactElement } from 'react';

import Tooltip from '@mui/material/Tooltip';

interface BasicTooltipProps {
  title: string;
  children: ReactElement;
}

const TooltipCustom = ({ title, children }: BasicTooltipProps) => {
  return (
    <Tooltip
      title={title}
      slotProps={{
        popper: {
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, -10],
              },
            },
          ],
        },
      }}
    >
      {children}
    </Tooltip>
  );
};

export default TooltipCustom;
