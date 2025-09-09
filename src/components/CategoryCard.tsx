import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  count: number;
  color: string;
  onClick: () => void;
}

const CategoryCard = ({ 
  id,
  name, 
  description,
  icon: Icon, 
  count,
  color,
  onClick 
}: CategoryCardProps) => {
  return (
    <Card 
      className="group cursor-pointer transition-all duration-300 hover:elevation-8 elevation-2 border-border bg-card"
      onClick={onClick}
    >
      <CardContent className="spacing-lg">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center transition-all group-hover:scale-110 group-hover:bg-primary/20">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-h3 text-foreground mb-2 group-hover:text-primary transition-colors">
              {name}
            </h3>
            <p className="text-caption text-muted-foreground mb-3">
              {description}
            </p>
            <div className="inline-flex items-center px-2 py-1 rounded-full bg-accent text-accent-foreground text-overline">
              {count} resource{count !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;