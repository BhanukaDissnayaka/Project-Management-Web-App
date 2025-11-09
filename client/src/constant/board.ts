export enum BoardColor {
  BLUE = "#0079BF",
  ORANGE = "#D29034",
  GREEN = "#519839",
  RED = "#B04632",
  PURPLE = "#89609E",
  PINK = "#CD5A91",
  LIME = "#4BBF6B",
  SKY = "#00AECC",
  YELLOW = "#F5DD29",
  GRAY = "#838C91",
}
export type BoardColorType = keyof typeof BoardColor;
export type BoardColorValueType = (typeof BoardColor)[BoardColorType];
