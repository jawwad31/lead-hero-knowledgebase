import CategoryCard from "./CategoryCard";
import { useSupabaseStore } from "@/hooks/useSupabaseStore";
import { useFallbackStore } from "@/hooks/useFallbackStore";
import { BookOpen, FileText, GraduationCap, Wrench, LucideIcon } from "lucide-react";

interface CategoryGridProps {
  // Remove onCategorySelect since we're navigating to dedicated pages now
}

const CategoryGrid = ({}: CategoryGridProps) => {
  // Check if Supabase is configured
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
  const isSupabaseConfigured = supabaseUrl && supabaseAnonKey && supabaseUrl !== 'your_supabase_project_url'
  
  const supabaseStore = useSupabaseStore()
  const fallbackStore = useFallbackStore()
  
  const { categories, getResourcesByCategory, loading, error } = isSupabaseConfigured ? supabaseStore : fallbackStore

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

  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-surface rounded-lg p-6 h-32"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-destructive">Error loading categories: {error}</p>
      </div>
    );
  }

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