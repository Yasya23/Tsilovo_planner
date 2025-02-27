import IconButtonCustom from '@/shared/components/ui/buttons/IconButton';
import * as React from 'react';
import { useTaskStore } from '@/shared/store';
import SelectCustom from '@/shared/components/ui/Select';
import styles from './MoodSelector.module.scss';
import {
  FiLogOut,
  FiEdit2,
  FiTrash2,
  FiDownload,
  FiSmile,
} from 'react-icons/fi';

export const moodIcons = {
  Happy: '😊',
  Sad: '😢',
  Angry: '😡',
  'In love': '😍',
};

const Languages = [
  { label: '☺︎', value: 'None' },
  { label: '😊', value: 'Happy' },
  { label: '😢', value: 'Sad' },
];

export const MoodSelector = () => {
  const [showIcons, setShowIcons] = React.useState(false);
  const [selectedMood, setSelectedMood] = React.useState(null);
  const { setMoode } = useTaskStore();

  const [selectedValue, setSelectedValue] = React.useState(Languages[0].value);

  const year = new Date().getFullYear();

  const handleChange = (value: string) => {
    console.log(value);
    setSelectedValue(value);
  };

  const handleIconClick = (mood: string) => {
    setMoode(mood);
    setShowIcons(false);
  };

  return (
    <div className={styles.Wrapper}>
      <SelectCustom
        value={selectedValue}
        onChange={handleChange}
        options={Languages}
        helper="Настрій дня"
        minSize={120}
        showValue={true}
      />

      {showIcons && (
        <div className={styles.IconsContainer}>
          {Object.entries(moodIcons).map(([description, icon]) => (
            <p
              key={description}
              className={styles.Icon}
              onClick={() => handleIconClick(description)}
              style={{ cursor: 'pointer', marginRight: '10px' }}>
              {icon} {description}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default MoodSelector;
