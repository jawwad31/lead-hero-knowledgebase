import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  title: string;
  author: string;
  articleCount: number;
  icon: LucideIcon;
  onClick: () => void;
}

const CategoryCard = ({ 
  title, 
  author, 
  articleCount, 
  icon: Icon, 
  onClick 
}: CategoryCardProps) => {
  return (
    <Card 
      className="group cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] border-card-border bg-card"
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center transition-all group-hover:scale-110 group-hover:bg-primary/20">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-text-primary mb-1 group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-sm text-text-secondary mb-2">
              By {author} • {articleCount} article{articleCount !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;