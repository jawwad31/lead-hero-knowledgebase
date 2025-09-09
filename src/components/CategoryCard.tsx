import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CategoryCardProps {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: LucideIcon;
  count: number;
  color: string;
}

const CategoryCard = ({ 
  id,
  name,
  slug,
  description,
  icon: Icon, 
  count,
  color
}: CategoryCardProps) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/categories/${slug}`);
  };
  return (
    <Card 
      className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1 border-border bg-card"
      onClick={handleClick}
    >
      <CardContent className="p-8">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20 group-hover:shadow-lg">
            <Icon className="h-7 w-7 text-primary" />
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
              {name}
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              {description}
            </p>
            <p className="text-xs text-muted-foreground">
              {count} resource{count !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;