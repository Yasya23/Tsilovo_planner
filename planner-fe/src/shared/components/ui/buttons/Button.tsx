'use client';

import { MouseEventHandler } from 'react';
import Button from '@mui/material/Button';

interface ButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  name: string;
  disabled?: boolean;
  className?: string;
  style?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary';
  href?: string;
}

export const ButtonCustom = ({
  onClick,
  iconStart,
  iconEnd,
  name,
  disabled = false,
  style = 'contained',
  color = 'primary',
  href,
}: ButtonProps) => {
  return (
    <Button
      variant={style}
      color={color}
      disabled={disabled}
      onClick={href ? undefined : onClick}
      href={href}
      startIcon={iconStart}
      endIcon={iconEnd}>
      {name}
    </Button>
  );
};

export default ButtonCustom;
