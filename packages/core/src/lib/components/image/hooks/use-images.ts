"use client";
import { useState, useEffect } from "react";

import { getVisibleImages } from "../lib";

export const useImages = (): string[] => {
  const [visibleImages, setVisibleImages] = useState<string[]>([]);

  useEffect(() => {
    setVisibleImages(getVisibleImages());
  }, []);

  return visibleImages;
};
