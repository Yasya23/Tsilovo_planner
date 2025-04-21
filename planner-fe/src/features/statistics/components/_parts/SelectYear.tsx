'use client';

import { SelectCustom } from '@/shared/components/ui/select/SelectCustom';

type YearProps = {
  currentYear: number;
  availableYears: number[];
  onChange: (year: string) => void;
};

export const SelectYear = ({
  availableYears,
  currentYear,
  onChange,
}: YearProps) => {
  const years = [...availableYears]
    .sort((a, b) => b - a)
    .map((year) => ({
      label: year.toString(),
      value: year,
    }));

  return (
    <SelectCustom
      value={currentYear.toString()}
      onChange={(year) => {
        if (+year !== currentYear) {
          onChange(year);
        }
      }}
      options={years}
      format="outlined"
      disabled={false}
    />
  );
};
