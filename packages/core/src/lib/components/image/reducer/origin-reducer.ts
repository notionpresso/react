"use client";

const ORIGIN = {
  INITIAL_X: 0.5,
  INITIAL_Y: 0.5,
};

export const initialOrigin = {
  originX: ORIGIN.INITIAL_X,
  originY: ORIGIN.INITIAL_Y,
} as const;

type OriginActionType = "zoomInOut" | "reset";

export type OriginAction = {
  type: OriginActionType;
  payload?: typeof initialOrigin;
};

export const originReducer = (
  state: typeof initialOrigin,
  action: OriginAction,
) => {
  switch (action.type) {
    case "reset":
      return {
        originX: ORIGIN.INITIAL_X,
        originY: ORIGIN.INITIAL_Y,
      };
    case "zoomInOut":
      return {
        originX: action.payload?.originX || ORIGIN.INITIAL_X,
        originY: action.payload?.originY || ORIGIN.INITIAL_Y,
      };
    default:
      return state;
  }
};
