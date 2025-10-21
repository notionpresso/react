import romans from "romans";
import type { ContextedBlock } from "./types";

export function getColorCss(color: string) {
  return `notion-${color}`;
}

const youtubeDomains = new Set([
  "youtu.be",
  "youtube.com",
  "www.youtube.com",
  "youtube-nocookie.com",
  "www.youtube-nocookie.com",
]);

export const getYoutubeId = (url: string): string | null => {
  try {
    const { hostname } = new URL(url);
    if (!youtubeDomains.has(hostname)) {
      return null;
    }
    const regExp =
      /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/i;

    const match = url.match(regExp);
    if (match && match[2].length == 11) {
      return match[2];
    }
  } catch {
    // ignore invalid urls
  }

  return null;
};

export class ListItemMarker {
  private resolvers: ((step: number) => string)[];

  constructor(resolvers: ((step: number) => string)[]) {
    this.resolvers = resolvers;
  }

  getMarker(block: ContextedBlock) {
    const order = this.getMarkerOrder(block);
    const format = this.getMarkerFormat(block);
    const resolver = this.resolvers[format];

    return {
      marker: resolver(order),
      format: format === 2 ? "romans" : "non-romans",
    };
  }

  private getMarkerOrder({ context: { previous }, type }: ContextedBlock) {
    let order = 1;
    console.log();
    while (previous) {
      if (previous.type !== type) break;
      order++;
      previous = previous.context.previous;
    }

    return order;
  }

  private getMarkerFormat({ context: { parent }, type }: ContextedBlock) {
    let format = 0;
    while (parent) {
      if (parent.type !== type) break;
      format = (format + 1) % this.resolvers.length;
      parent = parent.context.parent;
    }

    return format;
  }
}

export const numberedListItemMarker = new ListItemMarker([
  (step) => `${step}`,
  (step) => alphaCount(step),
  (step) => romans.romanize(step).toLowerCase(),
]);

export const bulletedListItemMarker = new ListItemMarker([
  () => "•",
  () => "◦",
  () => "▪",
]);

const charCode = "a".charCodeAt(0);

function alphaCount(a: number) {
  const b = [a - 1];
  let sp = 0;
  let out = "";
  let i: number;
  let div: number;

  sp = 0;
  while (sp < b.length) {
    if (b[sp] > 25) {
      div = Math.floor(b[sp] / 26);
      b[sp + 1] = div - 1;
      b[sp] %= 26;
    }
    sp += 1;
  }

  out = "";
  for (i = 0; i < b.length; i += 1) {
    out = String.fromCharCode(charCode + b[i]) + out;
  }

  return out;
}
