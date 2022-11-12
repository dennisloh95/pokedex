import { useState, useEffect, useRef } from "react";

const useDebounce = <T>(val: T, delay?: number): T => {
  const [value, setVal] = useState<T>(val);

  useEffect(() => {
    let timer: any;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      setVal(val);
      timer = null;
    }, delay || 500);

    return () => clearTimeout(timer);
  }, [val, delay]);

  return value;
};

interface StateUseFetch<T> {
  data?: T;
  error?: Error;
  loading: boolean;
}

export { useDebounce };
