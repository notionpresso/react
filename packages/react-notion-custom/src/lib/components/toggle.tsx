import React, { useState } from "react";
import type { ToggleArgs } from "../types";
import { getColorCss } from "../utils";
import RichText from "./internal/rich-text";

type ToggleProps = {
  children?: React.ReactNode;
} & ToggleArgs;

const Toggle: React.FC<ToggleProps> = ({ children, ...props }) => {
  const {
    toggle: { color, rich_text: texts },
  } = props;

  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen(!open);

  const className = `${getColorCss(color)}__background notion-block notion-toggle ${open ? "notion-toggle-open" : ""}`;

  return (
    <section className={`notion-toggle ${className}`}>
      <div className="notion-toggle-header">
        <button onClick={toggleOpen} className="notion-toggle-button">
          <div
            className={`notion-toggle-button-arrow ${open ? "notion-toggle-button-arrow-opened" : ""}`}
          />
        </button>
        <header className="notion-toggle-header-content">
          <RichText props={texts} />
        </header>
      </div>

      {open && <article className="notion-toggle-content">{children}</article>}
    </section>
  );
};

export default Toggle;
