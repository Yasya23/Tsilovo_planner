import { useRef } from 'react';

import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

import { useClickOutside } from '@/shared/hooks/ useClickOutside';

import styles from './EmojiPicker.module.scss';

interface EmojiPickerProps {
  onEmojiClick: (emojiData: EmojiClickData) => void;
  handleClickOuside?: () => void;
  width?: number;
  height?: number;
}
export const EmojiPickerCompoment: React.FC<EmojiPickerProps> = ({
  onEmojiClick,
  handleClickOuside,
  width = 300,
  height = 400,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside(dropdownRef, () => handleClickOuside);

  return (
    <div className={styles.Picker} ref={dropdownRef}>
      <EmojiPicker
        onEmojiClick={onEmojiClick}
        width={width}
        height={height}
        lazyLoadEmojis={true}
      />
    </div>
  );
};

