import type { NotionpressoTweetArgs } from "../types";

const Tweet: React.FC<NotionpressoTweetArgs> = ({
  notionpresso_tweet: { html },
}) => {
  return (
    <div className="notionpresso-tweet" style={{ width: "100%" }}>
      <div
        className="notion-embed-tweet-content"
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
    </div>
  );
};

export default Tweet;
