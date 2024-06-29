import { useEffect, useState } from "react";

export const useDelayedBoolean = (bool: boolean, delay: number) => {
  const [value, setValue] = useState(false);
  useEffect(() => {
    if (bool === false) return setValue(false);

    const timeout = setTimeout(() => setValue(true), delay ?? 100);
    return () => clearTimeout(timeout);
  }, [bool, delay]);
  return value;
};
