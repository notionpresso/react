"use client";

import React from "react";
import type { ImageArgs } from "../../types";
import RichText from "../internal/rich-text";
import ImageViewer from "./image-viewer";
import { extractImageUrl } from "./lib";

type ImageProps = {
  children: React.ReactNode;
} & ImageArgs;

const Image: React.FC<ImageProps> = ({ children, ...props }) => {
  const {
    image: { caption, type },
  } = props;

  const url = extractImageUrl(props);

  return (
    <>
      <figure className="notion-block notion-image">
        <div className="notion-image-content">
          {url ? (
            <ImageViewer url={url}>
              <img src={url} alt="posting image" />
            </ImageViewer>
          ) : (
            <p>unsupported type: {type}</p>
          )}
        </div>

        {caption.length !== 0 && (
          <figcaption className="notion-asset-caption">
            <RichText props={caption} />
          </figcaption>
        )}
      </figure>
      {children}
    </>
  );
};

export default Image;
