import { useState, useRef, useCallback } from "react";

export const useCursorVisibility = () => {
  const [isCursorVisible, setIsCursorVisible] = useState(true);
  const cursorTimeOutRef = useRef<NodeJS.Timeout>();

  const handleMoveMouse = useCallback(() => {
    setIsCursorVisible(true);

    clearTimeout(cursorTimeOutRef.current);

    if (cursorTimeOutRef.current) {
      clearTimeout(cursorTimeOutRef.current);
    }

    cursorTimeOutRef.current = setTimeout(() => {
      setIsCursorVisible(false);
    }, 2000);
  }, []);

  return {
    isCursorVisible,
    handleMoveMouse,
  };
};
