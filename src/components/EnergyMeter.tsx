"use client";

interface EnergyMeterProps {
  label: string;
  value: number;
  maxValue?: number;
  variant?: "terracotta" | "amber" | "sage";
}

const variantColors = {
  terracotta: { filled: "#c67d5c", empty: "#ebe7e2" },
  amber:      { filled: "#d9934a", empty: "#ebe7e2" },
  sage:       { filled: "#5d8b78", empty: "#ebe7e2" },
};

export default function EnergyMeter({
  label,
  value,
  maxValue = 5,
  variant = "terracotta",
}: EnergyMeterProps) {
  const colors = variantColors[variant];

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-warm-600 w-14">{label}</span>
      <div className="flex gap-1.5">
        {Array.from({ length: maxValue }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: i < value ? colors.filled : colors.empty,
              transition: 'background-color 0.3s',
            }}
          />
        ))}
      </div>
    </div>
  );
}
