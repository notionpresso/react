import Headings from "./headings";
import Paragraph from "./paragraph";
import Toggle from "./toggle";
import Equation from "./equation";
import NumberedListItem from "./numbered-list-item";
import Quote from "./quote";
import Callout from "./callout";
import BulletedListItem from "./bulleted-list-item";
import Divider from "./divider";
import Image from "./image";
import Video from "./video";
import Column from "./column";
import ColumnList from "./column-list";
import Code from "./code";
import Todo from "./todo";
import Table from "./table";
import TableRow from "./table-row";
import Fallback from "./fallback";

export {
  Headings,
  Paragraph,
  Toggle,
  Equation,
  Quote,
  Callout,
  NumberedListItem,
  BulletedListItem,
  Divider,
  Image,
  Video,
  Column,
  ColumnList,
  Code,
  Todo,
  Table,
  Fallback,
};

export default {
  heading_1: Headings,
  heading_2: Headings,
  heading_3: Headings,
  paragraph: Paragraph,
  bulleted_list_item: BulletedListItem,
  toggle: Toggle,
  equation: Equation,
  numbered_list_item: NumberedListItem,
  quote: Quote,
  callout: Callout,
  divider: Divider,
  image: Image,
  video: Video,
  column: Column,
  column_list: ColumnList,
  code: Code,
  to_do: Todo,
  table: Table,
  table_row: TableRow,
  fallback: Fallback,
};
