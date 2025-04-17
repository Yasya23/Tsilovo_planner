'use client';

import React, { MouseEventHandler } from 'react';

import { useLocale } from 'next-intl';

import Button from '@mui/material/Button';

type ButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  name: string;
  disabled?: boolean;
  className?: string;
  style?: 'contained' | 'outlined' | 'text';
  color?:  'secondary' | 'warning' | 'success' | 'error';
  href?: string;
};

export const ButtonCustom = ({
  onClick,
  iconStart,
  iconEnd,
  name,
  disabled = false,
  style = 'contained',
  color = 'warning',
  href,
}: ButtonProps) => {
  const locale = useLocale();

  return (
    <Button
      variant={style}
      color={color}
      disabled={disabled}
      onClick={href ? undefined : onClick}
      href={`/${locale}/${href}`}
      startIcon={iconStart}
      endIcon={iconEnd}
    >
      {name}
    </Button>
  );
};
