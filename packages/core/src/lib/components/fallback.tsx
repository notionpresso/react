export type FallbackProps = {
  type: string;
  id: string;
  [key: string]: any;
};

export default function Fallback({ type, id, ...props }: FallbackProps) {
  if (process.env.NODE_ENV === "development") {
    return (
      <div
        className="notion-block notion-block-fallback"
        data-block-id={id}
        {...props}
      >
        <div className="notion-block-fallback-content">
          <span className="notion-block-fallback-type">{type}</span> Blocks are
          not yet supported.
        </div>
      </div>
    );
  }
  return null;
}
