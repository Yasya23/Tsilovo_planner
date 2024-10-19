'use client';

import { MouseEventHandler, useState } from 'react';
import { Tooltip } from '@/components';

import styles from './button.module.scss';
import classNames from 'classnames';

interface ButtonProps {
  label?: string;
  type?: 'button' | 'reset' | 'submit';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  icon?: React.ReactNode;
  name?: string;
  disabled?: boolean;
  className?: string;
}

//TODO
// Button styles in styles

export const Button = ({
  label,
  type = 'button',
  onClick,
  icon,
  name,
  disabled = false,
  className,
}: ButtonProps) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <button
        className={classNames(
          styles.button,
          className ? styles[className] : ''
        )}
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

export default Button;
