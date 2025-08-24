import type { Meta, StoryObj } from "@storybook/react";
import Component from "../../lib/Notion";
import json from "./rich-text.json";

const blocks = json.blocks as any;

const meta: Meta<typeof Component> = {
  title: "Blocks/Internal/RichText",
  component: Component,
};

export default meta;
type Story = StoryObj<typeof Component>;

export const RichText: Story = {
  args: {
    title: "Rich Text",
    blocks: blocks.filter((block: any) => block.type !== "external-page-link"),
  },
};

export const ExternalPageLink: Story = {
  args: {
    title: "External Page Link",
    blocks: blocks.filter((block: any) => block.type === "external-page-link"),
  },
};
