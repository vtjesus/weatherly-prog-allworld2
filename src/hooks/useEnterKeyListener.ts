import { useEffect } from "react";

type KeyEventHandler = (event: KeyboardEvent) => void;

const useEnterKeyListener = (callback: KeyEventHandler) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        callback(event);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [callback]);
};

export default useEnterKeyListener;
