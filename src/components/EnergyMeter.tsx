"use client";

interface EnergyMeterProps {
  label: string;
  value: number;
  maxValue?: number;
  variant?: "violet" | "sage" | "amber";
}

const variantStyles = {
  violet: {
    filled: "bg-violet-500",
    empty: "bg-warm-200",
  },
  sage: {
    filled: "bg-sage-500",
    empty: "bg-warm-200",
  },
  amber: {
    filled: "bg-amber-400",
    empty: "bg-warm-200",
  },
};

export default function EnergyMeter({
  label,
  value,
  maxValue = 5,
  variant = "violet",
}: EnergyMeterProps) {
  const styles = variantStyles[variant];

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-warm-600 w-14">{label}</span>
      <div className="flex gap-1.5">
        {Array.from({ length: maxValue }).map((_, i) => (
          <div
            key={i}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              i < value ? styles.filled : styles.empty
            }`}
          />
        ))}
      </div>
    </div>
  );
}
