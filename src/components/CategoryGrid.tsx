import CategoryCard from "./CategoryCard";
import { useMockStore } from "@/hooks/useMockStore";

interface CategoryGridProps {
  onCategorySelect: (categoryId: string) => void;
}

const CategoryGrid = ({ onCategorySelect }: CategoryGridProps) => {
  const { categories, getResourcesByCategory } = useMockStore();

  const getCategoryIcon = (slug: string) => {
    const iconMap: Record<string, string> = {
      guides: "📖",
      sops: "📋", 
      tutorials: "🎓",
      troubleshooting: "🔧"
    };
    return iconMap[slug] || "📄";
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
              description={getCategoryDescription(category.slug)}
              icon={getCategoryIcon(category.slug)}
              count={publishedResourceCount}
              color={getCategoryColor(category.slug)}
              onClick={() => onCategorySelect(category.id)}
            />
          );
        })}
    </div>
  );
};

export default CategoryGrid;