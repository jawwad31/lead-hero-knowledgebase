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
        return "bg-accent-light text-accent-foreground border border-accent/20";
      case "sop":
        return "bg-success/10 text-success border border-success/20";
      case "tutorial":
        return "bg-secondary text-secondary-foreground border border-card-border";
      default:
        return "bg-secondary text-secondary-foreground";
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