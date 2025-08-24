import React from "react";
import { getColorCss, renderEquation } from "../../utils";
import type { TextArgs, EquationArgs } from "../../types";
import { Helmet } from "react-helmet";

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
          <Equation key={index} props={text as unknown as EquationArgs} />
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
    const wrapped = types.reduce(
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

    if (href) {
      const isExternalLink =
        href &&
        !href.startsWith("/") &&
        !href.includes(window.location.hostname);
      return isExternalLink ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="notion-link notion-link-external"
        >
          {wrapped} <span className="notion-external-icon">↗</span>
        </a>
      ) : (
        <a href={href} className="notion-link">
          {wrapped}
        </a>
      );
    }

    return wrapped;
  };

  return <>{renderText(content)}</>;
}

function Equation({ props }: { props: EquationArgs }) {
  const {
    equation: { expression },
  } = props;

  return (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css"
          integrity="sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X"
          crossOrigin="anonymous"
        />
      </Helmet>
      <span
        className="notion-equation notion-equation-inline"
        dangerouslySetInnerHTML={{ __html: renderEquation(expression) }}
      />
    </>
  );
}
export default RichText;
