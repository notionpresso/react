import React, { createContext, useContext, useMemo } from "react";
import type { Block, ContextedBlock } from "./types";
import components from "./components";
import Fallback from "./components/fallback";

type ComponentProvider = Record<string, React.ComponentType<any>> & {
  fallback?: React.ComponentType<any>;
};
const NotionContext = createContext<ComponentProvider>({});

type NotionProps = {
  children: React.ReactNode;
  custom?: Record<string, React.ComponentType<any>>;
};

function Notion({ children, custom = {} }: NotionProps) {
  const contextValue = useMemo(
    () => ({ ...components, fallback: Fallback, ...custom }),
    [custom],
  );

  return (
    <NotionContext.Provider value={contextValue}>
      <div className="notion">{children}</div>
    </NotionContext.Provider>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return <article className="notion-body">{children}</article>;
}

function Title({ title = "" }: { title?: string }) {
  return <h1 className="notion-title">{title}</h1>;
}

function Cover({ src, alt = "notion cover" }: { src?: string; alt?: string }) {
  if (!src) return null;

  return (
    <div className="notion-cover">
      <img src={src} alt={alt} />
    </div>
  );
}

function Blocks({ blocks }: { blocks: Block[] }) {
  const contextedBlocks = useMemo(
    () => resolveToContextedBlocks(blocks),
    [blocks],
  );
  return <InternalBlocks blocks={contextedBlocks} />;
}

function InternalBlocks({ blocks }: { blocks: ContextedBlock[] }) {
  const componentProvider = useContext(NotionContext);
  return (
    <>
      {blocks.map((block) => {
        const Component =
          componentProvider[block.type] || componentProvider.fallback || null;
        return (
          <Component key={block.id} {...block}>
            {block.has_children && <InternalBlocks blocks={block.blocks} />}
          </Component>
        );
      })}
    </>
  );
}

function resolveToContextedBlock(
  block: Block,
  previous: ContextedBlock | null = null,
  parent: ContextedBlock | null = null,
): ContextedBlock {
  const { blocks: children } = block;
  const thisBlock: ContextedBlock = {
    ...block,
    blocks: [],
    context: { previous, parent },
  };
  if (children == null) return thisBlock;
  const childContextBlocks = [] as ContextedBlock[];
  let previousChildBlock: ContextedBlock | null = null;
  children.forEach((child, i) => {
    const contextChildBlock = resolveToContextedBlock(
      child,
      previousChildBlock,
      thisBlock,
    );
    childContextBlocks[i] = contextChildBlock;
    previousChildBlock = contextChildBlock;
  });
  thisBlock.blocks = childContextBlocks;
  return thisBlock;
}

function resolveToContextedBlocks(blocks: Block[]): ContextedBlock[] {
  const contextedBlocks = blocks.map((block) =>
    resolveToContextedBlock(block, null, null),
  );
  contextedBlocks.forEach((current, i) => {
    if (i !== 0) {
      current.context.previous = contextedBlocks[i - 1];
    }
    if (i < contextedBlocks.length - 1) {
      current.context.after = contextedBlocks[i + 1];
    }
  });
  return contextedBlocks;
}

Notion.Body = Body;
Notion.Title = Title;
Notion.Cover = Cover;
Notion.Blocks = Blocks;

export default Notion;
