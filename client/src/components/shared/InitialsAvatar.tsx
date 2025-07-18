import React from "react";

interface InitialsAvatarProps {
  name: string;
  size?: number;
  colors?: string[];
  fontSizeRatio?: number;
}

const DEFAULT_COLORS = [
  "#F44336",
  "#E91E63",
  "#9C27B0",
  "#673AB7",
  "#3F51B5",
  "#2196F3",
  "#03A9F4",
  "#00BCD4",
  "#009688",
  "#4CAF50",
  "#8BC34A",
  "#CDDC39",
  "#FFC107",
  "#FF9800",
  "#FF5722",
];

export const InitialsAvatar: React.FC<InitialsAvatarProps> = ({
  name,
  size = 30,
  colors = DEFAULT_COLORS,
  fontSizeRatio = 0.4,
}) => {
  const initials = React.useMemo(() => {
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }, [name]);

  const bgColor = React.useMemo(() => {
    const hash = name
      .split("")
      .reduce((h, c) => c.charCodeAt(0) + ((h << 5) - h), 0);
    return colors[Math.abs(hash) % colors.length];
  }, [name, colors]);

  const fontSize = Math.round(size * fontSizeRatio);

  return (
    <div
      style={{
        backgroundColor: bgColor,
        width: size,
        height: size,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontSize,
        fontWeight: "bold",
        userSelect: "none",
      }}
    >
      {initials}
    </div>
  );
};
