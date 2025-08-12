import type { Meta, StoryObj } from "@storybook/react";
import { _Block } from "@notionpresso/react";
import Component from "../../lib/Notion";
import json from "./image.json";
import toggleImageJson from "./toggle-image.json";

const blocks = json.blocks as _Block[];
const toggleImageBlocks = toggleImageJson.blocks as _Block[];

const meta: Meta<typeof Component> = {
  title: "Blocks/Image",
  component: Component,
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Image: Story = {
  args: {
    title: "Image",
    blocks: blocks,
  },
};

export const ToggleImage: Story = {
  args: {
    title: "Image",
    blocks: toggleImageBlocks,
  },
};
