import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ResourceCardProps {
  title: string;
  type: "guide" | "sop" | "tutorial";
  updatedAt: string;
  tags: string[];
  href: string;
}

const ResourceCard = ({ 
  title, 
  type, 
  updatedAt, 
  tags,
  href
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
    <Card className="group cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] border-card-border bg-card"
          onClick={() => window.location.href = href}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <Badge variant="secondary" className={getTypeColor(type)}>
            {type.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-1 mb-3">
          {tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="text-xs text-muted-foreground">
          Updated {updatedAt}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResourceCard;