import * as React from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';

import icons from '@/shared/icons/icons';

import styles from './Accordion.module.scss';

type AccordionItem = {
  title: React.ReactNode | string;
  description: React.ReactNode | string;
};

type AccordionProps = {
  items: AccordionItem[];
  level?: number;
};

export const AccordionUsage = ({ items, level = 0 }: AccordionProps) => {
  return (
    <div className={styles.Accordion}>
      {items.map((item, index) => (
        <Accordion
          key={index}
          className={`${styles.Wrapper} ${level > 0 ? styles.Nested : ''}`}
        >
          <AccordionSummary
            expandIcon={<icons.ChevronDown />}
            aria-controls={`panel${level}-${index}-content`}
            id={`panel${level}-${index}-header`}
          >
            <Typography component="div" className={styles.Title}>
              {item.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails className={styles.Details}>
            {item.description}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};
