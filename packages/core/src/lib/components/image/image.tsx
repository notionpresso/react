"use client";
import React from "react";
import type { ImageArgs } from "../../types";
import RichText from "../internal/rich-text";
import ImageViewer from "./image-viewer";
import { extractImageUrl } from "./lib";
import { useModal } from "./hooks";
import { findImageCaption } from "./lib/find-image-caption";

type ImageProps = {
  children: React.ReactNode;
} & ImageArgs;

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
          caption={foundCaption || "posting image"}
        />
      )}

      <figure className="notion-block notion-image">
        <div className="notion-image-content">
          {url ? (
            <img
              src={url}
              alt={caption[0]?.text?.content || "posting image"}
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
