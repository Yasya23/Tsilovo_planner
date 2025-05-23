'use client';

import React, { MouseEventHandler } from 'react';

import { useLocale } from 'next-intl';

import Button from '@mui/material/Button';
import classNames from 'classnames';

import styles from './Button.module.scss';

type ButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  name: string;
  disabled?: boolean;
  className?: string;
  style?: 'contained' | 'outlined' | 'text';
  color?: 'secondary' | 'success' | 'error';
  type?: 'button' | 'submit' | 'reset';
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
  type = 'button',
}: ButtonProps) => {
  const locale = useLocale();
  const boldText = style === 'outlined' || style === 'text';

  return (
    <Button
      type={type}
      variant={style}
      color={color}
      disabled={disabled}
      onClick={href ? undefined : onClick}
      href={`/${locale}/${href}`}
      startIcon={iconStart}
      endIcon={iconEnd}
      size="medium"
      className={classNames(styles.Button, {
        [styles.Outline]: boldText,
        [styles.Contained]: color === 'secondary' && !boldText,
        [styles.Disabled]: disabled,
      })}
    >
      {name}
    </Button>
  );
};
