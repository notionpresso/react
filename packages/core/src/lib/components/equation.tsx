/**
 * @link react-katex https://github.com/MatejBransky/react-katex?tab=readme-ov-file
 */
import TeX from "@matejmazur/react-katex";
import type { ComponentProps } from "react";

const Equation = ({
  className = "",
  ...props
}: ComponentProps<typeof TeX> & { className?: string }) => {
  return (
    <TeX
      className={`notion-block notion-equation ${
        props.block ? "notion-equation-block" : "notion-equation-inline"
      } ${className}`}
      {...props}
    />
  );
};

export default Equation;
