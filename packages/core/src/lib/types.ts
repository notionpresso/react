import type {
  GetPageResponse,
  BlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import type { ContentfulPage } from "@cozy-blog/notion-client";

export type _Block = BlockObjectResponse & { blocks: Block[] };
export type Page = GetPageResponse;
export type Block = _Block;
export type ContextedBlock = _Block &
  BlockContext & { blocks?: ContextedBlock[] };
export type Content = ContentfulPage;

export type BlockContext = {
  context: {
    previous?: ContextedBlock | null;
    after?: ContextedBlock | null;
    parent?: ContextedBlock | null;
  };
};

export type TextArgs = {
  type: "text";
  text: {
    content: string;
    link?: {
      url: string;
    };
  };
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
  plain_text: string;
  href?: string | null;
};

export type ParagraphArgs = {
  paragraph: {
    color: string;
    rich_text: TextArgs[];
  };
} & ContextedBlock;

export type EquationArgs = {
  type: "equation";
  inline?: boolean;
  equation: {
    expression: string;
  };
};

export type CodeArgs = {
  type: "code";
  code: {
    caption: [];
    language: string;
    rich_text: TextArgs[];
  };
} & ContextedBlock;

type Heading = "heading_1" | "heading_2" | "heading_3";

type HeadingArgs = {
  is_toggleable: boolean;
  color: string;
  rich_text: TextArgs[];
};
type ExpandedHeading = { [K in Heading]: HeadingArgs };

export type HeadingsArgs = {
  type: Heading;
} & ExpandedHeading &
  ContextedBlock;

export type HeadingConfig = {
  headingTag: "h1" | "h2" | "h3";
  headingClassName: string;
};

export type ColumnListArgs = { type: "column_list" } & Block;
export type ColumnArgs = { type: "column" } & Block;
export type BulletedListItemArgs = {
  type: "bulleted_list_item";
  bulleted_list_item: { color: string; rich_text: TextArgs[] };
} & ContextedBlock;

export type NumberedListItemArgs = {
  type: "numbered_list_item";
  numbered_list_item: { color: string; rich_text: TextArgs[] };
} & ContextedBlock;

export type TodoArgs = {
  type: "to_do";
  to_do: {
    color: string;
    checked: boolean;
    rich_text: TextArgs[];
  };
} & ContextedBlock;

export type ToggleArgs = {
  type: "toggle";
  toggle: {
    color: string;
    rich_text: TextArgs[];
  };
} & ContextedBlock;

export type QuoteArgs = {
  type: "quote";
  quote: {
    color: string;
    rich_text: TextArgs[];
  };
} & ContextedBlock;

export type CalloutArgs = {
  type: "callout";
  callout: {
    icon: {
      type: "emoji" | "file" | "external";
      emoji?: string;
      file?: {
        url: string;
      };
      external?: {
        url: string;
      };
    };
    color: string;
    rich_text: TextArgs[];
  };
} & ContextedBlock;

export type ImageArgs = {
  type: "image";
  image:
    | {
        caption: TextArgs[];
        type: "file";
        file: {
          url: string;
        };
      }
    | {
        caption: TextArgs[];
        type: "external";
        external?: {
          url: string;
        };
      };
} & ContextedBlock;

export type VideoArgs = {
  type: "video";
  video: {
    caption: TextArgs[];
    type: "external" | "file";
    file?: {
      url: string;
    };
    external?: {
      url: string;
    };
  };
} & ContextedBlock;

export type DividerArgs = {
  type: "divider";
} & ContextedBlock;

export type AudioArgs = {
  type: "audio";
  audio: {
    caption: TextArgs[];
    type: "external" | "file";
    file?: {
      url: string;
    };
    external?: {
      url: string;
    };
  };
} & ContextedBlock;

export type TableArgs = {
  table: {
    table_width: number;
    has_column_header: boolean;
    has_row_header: boolean;
  };
} & ContextedBlock;

export type TableRowArgs = {
  table_row: {
    cells: TextArgs[][];
  };
};

export type BookmarkArgs = {
  type: "bookmark";
  bookmark: {
    caption: TextArgs[];
    url: string;
  };
} & ContextedBlock;

export type SyncedBlockArgs = {
  type: "synced_block";
};

export type NotionpressoTweetArgs = {
  type: "notionpresso_tweet";
  notionpresso_tweet: {
    url: string;
    iframe_url: string;
    source: string;
    tweet_id: string;
    html: string;
  };
};
