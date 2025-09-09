import { BookOpen, Users, Clock, TrendingUp } from "lucide-react";

const StatsBar = () => {
  const stats = [
    {
      icon: <BookOpen className="h-5 w-5" />,
      label: "Total Resources",
      value: "24",
    },
    {
      icon: <Users className="h-5 w-5" />,
      label: "Active Users",
      value: "1.2K",
    },
    {
      icon: <Clock className="h-5 w-5" />,
      label: "Avg. Read Time",
      value: "4 min",
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      label: "Monthly Views",
      value: "15K",
    },
  ];

  return (
    <div className="bg-surface border-t border-b border-card-border py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center mb-2 text-primary">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-text-primary mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-text-secondary">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsBar;