"use client";
import { useState, useEffect } from "react";

import { getVisibleImages } from "../lib";

export const useImages = () => {
  const [visibleImages, setVisibleImages] = useState<string[]>([]);

  useEffect(() => {
    setVisibleImages(getVisibleImages());
  }, []);

  return visibleImages;
};
