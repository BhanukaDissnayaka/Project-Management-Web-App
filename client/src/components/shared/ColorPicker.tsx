import { BoardColor } from "@/constant/board";

export type BoardColorValueType = (typeof BoardColor)[keyof typeof BoardColor];

interface ColorPickerProps {
  value?: BoardColorValueType;
  colors: BoardColorValueType[];
  onChange: (color: BoardColorValueType) => void;
}

export default function ColorPicker({
  value,
  colors,
  onChange,
}: ColorPickerProps) {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-3">
      {colors.map((color) => (
        <button
          key={color}
          type="button"
          style={{ backgroundColor: color }}
          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg transition-all hover:scale-110 ${
            value === color
              ? "ring-4 ring-gray-text ring-offset-2"
              : "hover:ring-2 hover:ring-gray-muted"
          }`}
          title={color}
          aria-label={`Select ${color} color`}
          onClick={() => onChange(color)}
        />
      ))}
    </div>
  );
}
