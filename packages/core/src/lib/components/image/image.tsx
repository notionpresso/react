"use client";
import React from "react";
import type { ImageArgs } from "../../types";
import RichText from "../internal/rich-text";
import ImageViewer from "./image-viewer";
import { useModal } from "./hooks";
import { extractImageUrl, findImageCaption } from "./lib";

type ImageProps = {
  children: React.ReactNode;
} & ImageArgs;

const DEFAULT_CAPTION = "posting image";

const Image: React.FC<ImageProps> = ({ children, ...props }) => {
  const {
    image: { caption, type },
  } = props;

  const url = extractImageUrl(props) || "";
  const { isOpen, open, close } = useModal();

  const foundCaption =
    props.blocks && props.blocks.length > 0
      ? findImageCaption(props.blocks, url)
      : null;

  const isViewer = url && isOpen;
  const isCaption = caption.length !== 0;

  return (
    <>
      {isViewer && (
        <ImageViewer
          url={url}
          close={close}
          caption={foundCaption || DEFAULT_CAPTION}
        />
      )}

      <figure className="notion-block notion-image">
        <div className="notion-image-content">
          {url ? (
            <img
              src={url}
              alt={caption[0]?.text?.content || DEFAULT_CAPTION}
              onClick={open}
              className="notion-viewer-opener"
            />
          ) : (
            <p>unsupported type: {type}</p>
          )}
        </div>

        {isCaption && (
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
