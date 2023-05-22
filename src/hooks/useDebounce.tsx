import { useCallback } from "react";
import debounce from "lodash.debounce";

export const useDebounce = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedCallback = useCallback(debounce(callback, delay), []);

  return debouncedCallback;
};
