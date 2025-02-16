/**
 * @link react-katex https://github.com/MatejBransky/react-katex?tab=readme-ov-file
 */
import TeX from "@matejmazur/react-katex";

import { EquationArgs } from "../types";

type EquationProps = EquationArgs & { inline?: boolean };

const Equation = ({
  equation: { expression },
  inline = false,
}: EquationProps) => {
  return (
    <TeX
      className={`notion-block notion-equation ${
        inline ? " notion-equation-inline" : "notion-equation-block"
      }`}
      block={!inline}
    >
      {expression}
    </TeX>
  );
};

export default Equation;
