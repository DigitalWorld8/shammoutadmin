import { useState } from 'react';

export const useToggleColumns = (initialCols: string[] = []) => {
  const [hiddenCols, setHiddenCols] = useState<string[]>(initialCols);

  const toggleColumn = (col: string) => {
    setHiddenCols((prevCols) =>
      prevCols.includes(col)
        ? prevCols.filter((c) => c !== col)
        : [...prevCols, col]
    );
  };

  const isHidden = (col: string) => hiddenCols.includes(col);

  return {
    hiddenCols,
    setHiddenCols,
    toggleColumn,
    isHidden,
  };
};
