import CategoryCard from "./CategoryCard";
import { useMockStore } from "@/hooks/useMockStore";
import { BookOpen, FileText, GraduationCap, Wrench, LucideIcon } from "lucide-react";

interface CategoryGridProps {
  // Remove onCategorySelect since we're navigating to dedicated pages now
}

const CategoryGrid = ({}: CategoryGridProps) => {
  const { categories, getResourcesByCategory } = useMockStore();

  const getCategoryIcon = (slug: string): LucideIcon => {
    const iconMap: Record<string, LucideIcon> = {
      guides: BookOpen,
      sops: FileText, 
      tutorials: GraduationCap,
      troubleshooting: Wrench
    };
    return iconMap[slug] || FileText;
  };

  const getCategoryColor = (slug: string) => {
    const colorMap: Record<string, string> = {
      guides: "bg-blue-500",
      sops: "bg-green-500",
      tutorials: "bg-purple-500", 
      troubleshooting: "bg-orange-500"
    };
    return colorMap[slug] || "bg-gray-500";
  };

  const getCategoryDescription = (slug: string) => {
    const descMap: Record<string, string> = {
      guides: "Step-by-step instructions and best practices",
      sops: "Standard operating procedures and workflows",
      tutorials: "Interactive learning and hands-on examples",
      troubleshooting: "Common issues and their solutions"
    };
    return descMap[slug] || "Knowledge base resources";
  };

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {categories
        .sort((a, b) => a.order - b.order)
        .map((category) => {
          const publishedResourceCount = getResourcesByCategory(category.id)
            .filter(resource => resource.published).length;
            
          return (
            <CategoryCard
              key={category.id}
              id={category.id}
              name={category.name}
              slug={category.slug}
              description={getCategoryDescription(category.slug)}
              icon={getCategoryIcon(category.slug)}
              count={publishedResourceCount}
              color={getCategoryColor(category.slug)}
            />
          );
        })}
    </div>
  );
};

export default CategoryGrid;