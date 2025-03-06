import { useRef, useState } from 'react';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import useClickOutside from '@/shared/hooks/ useClickOutside';
import styles from './EmojiPicker.module.scss';

interface EmojiPickerProps {
  onEmojiClick?: (emoji: EmojiClickData) => void;
  emoji: string;
  width?: number;
  height?: number;
}

const EmojiPickerCompoment: React.FC<EmojiPickerProps> = ({
  onEmojiClick,
  emoji,
  width = 300,
  height = 400,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <div ref={dropdownRef} className={styles.PickerWrapper}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={styles.EmojiButton}
        type="button">
        {emoji}
      </button>
      {isOpen && (
        <div className={styles.Picker}>
          <EmojiPicker
            onEmojiClick={(emojiData) => {
              if (onEmojiClick) {
                onEmojiClick(emojiData);
              }
              setIsOpen(false);
            }}
            width={width}
            height={height}
            lazyLoadEmojis={true}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerCompoment;
