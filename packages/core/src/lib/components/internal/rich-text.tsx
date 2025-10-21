import React from "react";
import { getColorCss } from "../../utils";
import type { TextArgs, EquationArgs } from "../../types";
import Equation from "../equation";

function RichText({ props }: { props: TextArgs[] }) {
  if (props.length === 0) {
    return <>&nbsp;</>;
  }

  return (
    <>
      {props.map((text, index) =>
        text.type === "text" ? (
          <Text key={index} props={text} />
        ) : (
          <Equation
            key={index.toString()}
            inline
            {...(text as unknown as EquationArgs)}
          />
        ),
      )}
    </>
  );
}

// Text 컴포넌트
function Text({ props }: { props: TextArgs }) {
  const {
    href,
    text: { content },
    annotations: { bold, italic, strikethrough, underline, code, color },
  } = props;

  const types = [
    !!href && "link",
    bold && "bold",
    italic && "italic",
    strikethrough && "strikethrough",
    underline && "underline",
    code && "code",
  ].filter(Boolean);

  const renderText = (source: string): React.ReactNode => {
    return types.reduce(
      (acc, type) => {
        switch (type) {
          case "link":
            return (
              <a className="notion-link" href={href!}>
                {acc}
              </a>
            );
          case "bold":
            return <b>{acc}</b>;
          case "italic":
            return <em>{acc}</em>;
          case "strikethrough":
            return <s>{acc}</s>;
          case "underline":
            return <span className="notion-inline-underscore">{acc}</span>;
          case "code":
            return <code className="notion-inline-code">{acc}</code>;
          default:
            return acc;
        }
      },
      <span className={`${getColorCss(color)} notion-span`}>{source}</span>,
    );
  };

  return <>{renderText(content)}</>;
}

export default RichText;
