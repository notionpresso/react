"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MOTION_VARIANTS = {
  hidden: { opacity: 0, y: -5 },
  visible: { opacity: 1, y: 0 },
};

interface Aria {
  label: string;
  describedby: string;
  hint: string;
}

interface ToolsTooltipProps {
  className?: string;
  content: string;
  icon: React.ReactNode;
  hint?: string;
  onClick: () => void;
  disabled?: boolean;
  aria: Aria;
}

const ToolsTooltip: React.FC<ToolsTooltipProps> = ({
  className,
  onClick,
  content,
  hint,
  icon,
  disabled,
  aria,
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
        type="button"
        className={className}
        aria-label={aria?.label}
        disabled={disabled}
        onClick={onClick}
        aria-describedby={aria?.describedby}
      >
        {icon}
      </button>
      <span id={aria?.describedby} className="notion-sr-only">
        {aria?.hint}
      </span>
      {!disabled && (
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
