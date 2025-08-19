import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { motionAnimate } from "./constants";

import {
  useCursorVisibility,
  useNavigation,
  useImageScale,
  usePreventScroll,
  useModal,
  useImages,
  useActiveIndex,
} from "./hooks";

import { getCursorStyle } from "./lib";

import ViewerTools from "./viewer-tools";

type ImageViewerProps = {
  url: string;
  children: React.ReactNode;
};

const ImageViewer: React.FC<ImageViewerProps> = ({ url, children }) => {
  const { isOpen, open, close } = useModal();
  const { imageUrls, collectImages } = useImages();
  const { activeImageIndex, setActiveImageIndex } = useActiveIndex(
    url,
    imageUrls,
  );

  const { toNextImage, toPreviousImage, hasNext, hasPrevious } = useNavigation(
    activeImageIndex,
    imageUrls.length,
    setActiveImageIndex,
  );

  const {
    imageRef,
    scaleInputRef,
    isScaleFocus,
    setIsScaleFocus,
    handleScaleBlur,
    handleScaleFocus,
    handleScaleEnter,
    handleScaleChange,
    scale,
    displayScale,
    setScale,
    setDisplayScale,
    scaleOriginX,
    scaleOriginY,
    handleZoomInOut,
    handleScaleUp,
    handleScaleDown,
  } = useImageScale();

  const { isCursorVisible, handleMoveMouse } = useCursorVisibility();

  useEffect(() => {
    if (activeImageIndex || isOpen) {
      setScale(1);
      setDisplayScale(100);
    }
  }, [isOpen, activeImageIndex, setScale, setDisplayScale]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    imageRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      const keyDownEvents: { [key: string]: () => void } = {
        Escape: close,
        "+": handleScaleUp,
        "=": handleScaleUp,
        "-": handleScaleDown,
        ArrowLeft: toPreviousImage,
        ArrowRight: toNextImage,
      };
      const action = keyDownEvents[e.key];

      if (action) {
        action();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    imageRef,
    isOpen,
    handleScaleUp,
    handleScaleDown,
    toNextImage,
    toPreviousImage,
    close,
  ]);

  usePreventScroll(isOpen);

  const handleViewerOpen = () => {
    collectImages();
    open();
  };

  return (
    <>
      <button
        aria-haspopup="dialog"
        className="notion-viewer-opener"
        onClick={handleViewerOpen}
      >
        {children}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            className="notion-image-viewer-container"
            aria-modal="true"
            onMouseMove={handleMoveMouse}
            tabIndex={-1}
            {...motionAnimate}
          >
            <motion.div
              className="notion-image-viewer-overlay"
              onClick={close}
              style={{
                cursor: isCursorVisible ? "default" : "none",
              }}
            />

            <div className="notion-image-viewer-content">
              <motion.img
                key={imageUrls[activeImageIndex]}
                ref={imageRef}
                src={imageUrls[activeImageIndex]}
                alt="posting image"
                style={{
                  transform: `scale(${scale})`,
                  transformOrigin: `${scaleOriginX * 100}% ${scaleOriginY * 100}%`,
                  cursor: isCursorVisible ? getCursorStyle(scale) : "none",
                }}
                onClick={handleZoomInOut}
              />

              {(isCursorVisible || isScaleFocus) && (
                <ViewerTools
                  url={imageUrls[activeImageIndex]}
                  currentImageIndex={activeImageIndex}
                  imageLength={imageUrls.length}
                  scaleInputRef={scaleInputRef}
                  scale={scale}
                  displayScale={displayScale}
                  close={close}
                  onScaleUp={handleScaleUp}
                  onScaleDown={handleScaleDown}
                  isScaleFocus={isScaleFocus}
                  setIsScaleFocus={setIsScaleFocus}
                  onScaleBlur={handleScaleBlur}
                  onScaleFocus={handleScaleFocus}
                  onScaleEnter={handleScaleEnter}
                  onScaleChange={handleScaleChange}
                  hasPrevious={hasPrevious}
                  hasNext={hasNext}
                  toPreviousImage={toPreviousImage}
                  toNextImage={toNextImage}
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ImageViewer;
