'use client';

import { MouseEventHandler, useState } from 'react';
import { Tooltip } from '@/components/tooltip/Tooltip';
import { ButtonsStyle, ButtonsType } from '@/types/buttons.type';

import classNames from 'classnames';
import styles from './button.module.scss';

interface ButtonProps {
  label?: string;
  type?: ButtonsType;
  style?: ButtonsStyle;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  icon?: React.ReactNode;
  name?: string;
  disabled?: boolean;
  className?: string;
}

export const Button = ({
  label,
  type = 'button',
  onClick,
  icon,
  name,
  disabled = false,
  style = 'primary',
}: ButtonProps) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <button
        className={classNames(styles.btn, styles[`btn-${style}`])}
        onClick={onClick}
        onMouseEnter={() => setTooltipVisible(true)}
        onMouseLeave={() => setTooltipVisible(false)}
        type={type}
        disabled={disabled}>
        {icon}
        {name}
      </button>
      {label && <Tooltip text={label} visible={tooltipVisible} />}
    </div>
  );
};
