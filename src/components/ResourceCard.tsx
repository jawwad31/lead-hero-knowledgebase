import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Eye, User } from "lucide-react";

interface ResourceCardProps {
  title: string;
  description: string;
  category: string;
  type: "guide" | "sop" | "tutorial";
  readTime: string;
  views: number;
  author: string;
  updatedAt: string;
  tags: string[];
}

const ResourceCard = ({
  title,
  description,
  category,
  type,
  readTime,
  views,
  author,
  updatedAt,
  tags,
}: ResourceCardProps) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "guide":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "sop":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "tutorial":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      default:
        return "bg-secondary";
    }
  };

  return (
    <Card className="group cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] border-card-border bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-text-primary line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <Badge variant="secondary" className={getTypeColor(type)}>
            {type.toUpperCase()}
          </Badge>
        </div>
        <p className="text-sm text-text-secondary line-clamp-2">{description}</p>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-1 mb-3">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center justify-between text-xs text-text-muted">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{readTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              <span>{views}</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            <span>{author}</span>
          </div>
        </div>
        
        <div className="mt-2 text-xs text-text-muted">
          Updated {updatedAt}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResourceCard;