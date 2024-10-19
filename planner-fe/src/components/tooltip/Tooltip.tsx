import styles from './tooltip.module.scss';

interface TooltipProps {
  text: string;
  visible: boolean;
}

export const Tooltip = ({ text, visible }: TooltipProps) => {
  return (
    <div className={`${styles.tooltip} ${visible ? styles.visible : ''}`}>
      {text}
    </div>
  );
};

export default Tooltip;
