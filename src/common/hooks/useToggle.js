import { useState } from 'react';

export const useToggle = ({ initialValue = false, toggleFunction } = {}) => {
  const [on, setOn] = useState(initialValue);

  const handleToggle = (value) => {
    const hasValue = typeof value === 'boolean';

    if (toggleFunction) {
      setOn(toggleFunction(hasValue ? value : on));
    }

    setOn(hasValue ? value : !on);
  };

  const reset = () => {
    setOn(initialValue);
  };

  return {
    on,
    reset,
    toggle: handleToggle,
  };
};
