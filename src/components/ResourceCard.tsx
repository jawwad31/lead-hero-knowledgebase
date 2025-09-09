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
  href?: string;
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
  href = "#"
}: ResourceCardProps) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "guide":
        return "bg-primary text-primary-foreground";
      case "sop":
        return "bg-secondary text-secondary-foreground";
      case "tutorial":
        return "bg-accent text-accent-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="group cursor-pointer transition-all duration-300 hover:elevation-8 elevation-2 border-border bg-card"
          onClick={() => window.location.href = href}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-h3 text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <Badge variant="secondary" className={`${getTypeColor(type)} text-overline`}>
            {type.toUpperCase()}
          </Badge>
        </div>
        <p className="text-body text-muted-foreground line-clamp-2">{description}</p>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-caption rounded-full">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center justify-between text-caption text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{readTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{views}</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>{author}</span>
          </div>
        </div>
        
        <div className="mt-3 text-caption text-muted-foreground">
          Updated {updatedAt}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResourceCard;