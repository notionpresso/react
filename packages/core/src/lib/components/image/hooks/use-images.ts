"use client";
import { useState, useEffect } from "react";

import { getVisibleImages } from "../lib/get-visible-images";

export const useImages = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    setImageUrls(getVisibleImages());
  }, []);

  return imageUrls;
};
