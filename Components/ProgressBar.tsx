interface ProgressBarProps {
  label: string;
  value: number;
  max: number;
  color?: string;
}

export default function ProgressBar({ label, value, max, color = "bg-blue-500" }: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className="mb-3">
      <div className="flex justify-between mb-1 text-sm font-medium">
        <span>{label}</span>
        <span>{value}/{max}</span>
      </div>
      <div className="w-full bg-gray-300 h-4 rounded-full">
        <div
          className={`${color} h-4 rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
