"use client";

import { normalizeDisplayScale } from "../lib";

type ScaleActionType =
  | "enter"
  | "blur"
  | "zoomInOut"
  | "zoomIn"
  | "zoomOut"
  | "reset"
  | "changeStyleOnly"
  | "changeDisplayOnly";

export type ScaleAction = {
  type: ScaleActionType;
  payload?: number;
};

export const DISPLAY = {
  INITIAL: 100,
  STEP: 50,
  MIN: 50,
  MIDDLE: 150,
  MAX: 200,
};

export const STYLE = {
  INITIAL: 1,
  STEP: 0.5,
  ZOOM_IN_STEP: 1.5,
  MIN_STEP: 0.5,
  MAX_STEP: 2,
};

export const CONVERSION = {
  PERCENT_FACTOR: 100,
};

export const initialScale = {
  displayScale: DISPLAY.INITIAL,
  styleScale: STYLE.INITIAL,
} as const;

export const scaleReducer = (
  state: typeof initialScale,
  action: ScaleAction,
) => {
  switch (action.type) {
    case "changeStyleOnly": {
      const invalidStyleScale = action.payload ?? state.displayScale;
      const newStyleScale =
        Math.max(DISPLAY.MIN, Math.min(DISPLAY.MAX, invalidStyleScale)) /
        CONVERSION.PERCENT_FACTOR;
      return {
        ...state,
        styleScale: newStyleScale,
      };
    }

    case "changeDisplayOnly": {
      const invalidDisplayScale = action.payload ?? state.displayScale;

      return {
        ...state,
        displayScale: invalidDisplayScale,
      };
    }

    case "enter": {
      if (
        state.displayScale <= DISPLAY.MIN ||
        state.displayScale >= DISPLAY.MAX
      ) {
        return {
          ...state,
          displayScale: normalizeDisplayScale(state.displayScale),
        };
      }

      return {
        ...state,
        styleScale: state.displayScale / CONVERSION.PERCENT_FACTOR,
      };
    }

    case "zoomInOut": {
      const newStyleScale =
        state.styleScale === STYLE.INITIAL ? STYLE.ZOOM_IN_STEP : STYLE.INITIAL;
      return {
        displayScale: newStyleScale * CONVERSION.PERCENT_FACTOR,
        styleScale: newStyleScale,
      };
    }

    case "reset":
      return {
        displayScale: DISPLAY.INITIAL,
        styleScale: STYLE.INITIAL,
      };

    case "blur": {
      const newScale = normalizeDisplayScale(state.displayScale);
      return {
        displayScale: newScale,
        styleScale: newScale / CONVERSION.PERCENT_FACTOR,
      };
    }

    case "zoomIn":
      return {
        styleScale: Math.min(state.styleScale + STYLE.STEP, STYLE.MAX_STEP),
        displayScale: Math.min(state.displayScale + DISPLAY.STEP, DISPLAY.MAX),
      };

    case "zoomOut":
      return {
        styleScale: Math.max(state.styleScale - STYLE.STEP, STYLE.MIN_STEP),
        displayScale: Math.max(state.displayScale - DISPLAY.STEP, DISPLAY.MIN),
      };
    default:
      return state;
  }
};
