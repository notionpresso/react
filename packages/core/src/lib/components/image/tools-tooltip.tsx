"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MOTION_VARIANTS = {
  hidden: { opacity: 0, y: -5 },
  visible: { opacity: 1, y: 0 },
};

interface AriaProps {
  label: string;
  disabled?: boolean;
}

interface ToolsTooltipProps {
  className?: string;
  content: string;
  icon: React.ReactNode;
  hint?: string;
  onClick: () => void;
  aria: AriaProps;
}

const ToolsTooltip: React.FC<ToolsTooltipProps> = ({
  className,
  content,
  hint,
  aria,
  onClick,
  icon,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseEnter = () => setIsVisible(true);
  const handleMouseLeave = () => setIsVisible(false);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="notion-viewer-tooltip-container"
    >
      <button
        aria-label={aria.label}
        aria-disabled={aria.disabled}
        disabled={aria.disabled}
        onClick={onClick}
        className={className}
      >
        {icon}
      </button>
      {!aria.disabled && (
        <AnimatePresence>
          {isVisible && (
            <motion.div
              className={`notion-viewer-tooltip ${className}`}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={MOTION_VARIANTS}
            >
              <p>{content}</p>
              {hint && <p>{hint}</p>}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default ToolsTooltip;
