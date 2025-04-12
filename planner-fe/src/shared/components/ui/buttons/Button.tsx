'use client';

import React, { MouseEventHandler } from 'react';
import Button from '@mui/material/Button';
import { useLocale } from 'next-intl';
type ButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  name: string;
  disabled?: boolean;
  className?: string;
  style?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary';
  href?: string;
};

export const ButtonCustom = ({
  onClick,
  iconStart,
  iconEnd,
  name,
  disabled = false,
  style = 'contained',
  color = 'secondary',
  href,
}: ButtonProps) => {
  const locale = useLocale();
  console.log(href);
  return (
    <Button
      variant={style}
      color={color}
      disabled={disabled}
      onClick={href ? undefined : onClick}
      href={`/${locale}/${href}`}
      startIcon={iconStart}
      endIcon={iconEnd}>
      {name}
    </Button>
  );
};

export default ButtonCustom;
