import type { Meta, StoryObj } from "@storybook/react";
import Component from "../../lib/Notion";
import json from "./tweet.json";

const blocks = json.blocks as any;

const meta: Meta<typeof Component> = {
  title: "Blocks/Tweet",
  component: Component,
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Tweet: Story = {
  args: {
    title: "Tweet",
    blocks: blocks,
  },
};
