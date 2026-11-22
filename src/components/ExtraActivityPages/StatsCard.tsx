import { LucideIcon, TrendingUp } from "lucide-react";

type StatsCardProps = {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  accentColor: string;
};

const StatsCard = ({
  title,
  value,
  description,
  icon: Icon,
  iconColor,
  iconBg,
  accentColor,
}: StatsCardProps) => {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h2 className="mt-3 text-3xl font-bold">{value}</h2>
        </div>

        <div className={`rounded-xl p-3 ${iconBg} ${iconColor}`}>
          <Icon size={24} />
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2 border-t pt-4">
        <TrendingUp size={15} className={accentColor} />
        <p className="text-xs text-gray-500">{description}</p>
      </div>

    </div>
  );
};

export default StatsCard;