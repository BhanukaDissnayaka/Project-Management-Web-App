import { cn } from "@/lib/utils";

type TextWrapperPropsType = {
  children: React.ReactNode;
  className?: string;
  fontWeight?:
    | "extralight"
    | "light"
    | "normal"
    | "medium"
    | "semibold"
    | "bold"
    | "extrabold";
  fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
};

const fontWeightMap = {
  extralight: "font-extralight",
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold",
};

const fontSizeMap = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "5xl": "text-5xl",
};

export function TextWrapper({
  children,
  className,
  fontSize = "base",
  fontWeight = "normal",
}: TextWrapperPropsType) {
  return (
    <p
      className={cn(
        fontWeightMap[fontWeight],
        fontSizeMap[fontSize],
        className
      )}
    >
      {children}
    </p>
  );
}
