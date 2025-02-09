import type { Meta, StoryObj } from "@storybook/react";
import json from "./fallback.json";
import Component from "../../lib/Notion";

const blocks = json.blocks as any;

const meta: Meta<typeof Component> = {
  title: "Blocks/Fallback",
  component: Component,
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Fallback: Story = {
  args: {
    title: "Fallback",
    blocks: blocks,
  },
};
