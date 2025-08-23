"use client";

import { useState, useRef, useCallback, useEffect } from "react";

export const useCursorVisibility = () => {
  const [isCursor, setIsCursor] = useState(true);
  const [isOverTools, setIsOverTools] = useState(false);
  const cursorTimeOutRef = useRef<NodeJS.Timeout>();

  const handleMoveMouse = useCallback(() => {
    setIsCursor(true);

    clearTimeout(cursorTimeOutRef.current);

    if (cursorTimeOutRef.current) {
      clearTimeout(cursorTimeOutRef.current);
    }

    if (!isOverTools) {
      cursorTimeOutRef.current = setTimeout(() => {
        setIsCursor(false);
      }, 2000);
    }
  }, [isOverTools]);

  useEffect(() => {
    const handleMouseMove = () => {
      handleMoveMouse();
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (cursorTimeOutRef.current) {
        clearTimeout(cursorTimeOutRef.current);
      }
    };
  }, [handleMoveMouse]);

  const handleMouseLeave = () => {
    setIsOverTools(false);
    setIsCursor(false);
  };

  const handleMouseEnter = () => {
    setIsOverTools(true);
    setIsCursor(true);
    clearTimeout(cursorTimeOutRef.current);
  };

  return { isCursor, handleMouseLeave, handleMouseEnter };
};
