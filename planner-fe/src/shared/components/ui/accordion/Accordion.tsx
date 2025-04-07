import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import icons from '@/shared/icons/icons';

type AccordionItem = {
  title: React.ReactNode | string;
  description: React.ReactNode | string;
};

type AccordionProps = {
  items: AccordionItem[];
};

export const AccordionUsage = ({ items }: AccordionProps) => {
  return (
    <div>
      {items.map((item, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<icons.ChevronDown />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}>
            <Typography component="div" sx={{ width: '100%' }}>
              {item.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>{item.description}</AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};
