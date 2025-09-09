import { useState } from "react";
import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import ResourceCard from "@/components/ResourceCard";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMockStore } from "@/hooks/useMockStore";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { getPublishedResources, getResourcesByCategory, getCategoryById, getViewCount } = useMockStore();

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  // Show category resources when a category is selected
  if (selectedCategory) {
    const filteredResources = getResourcesByCategory(selectedCategory).filter(resource => resource.published);
    const category = getCategoryById(selectedCategory);

    return (
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Button */}
          <div className="mb-8 text-center">
            <Button 
              variant="outline" 
              onClick={handleBackToCategories}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Categories
            </Button>
            <h2 className="text-2xl font-bold text-text-primary">
              {category?.name || 'Category'} Resources
            </h2>
          </div>

          {/* Resources Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredResources.map((resource) => (
              <ResourceCard 
                key={resource.id} 
                title={resource.title}
                description={resource.description || ''}
                category={resource.categoryId}
                type={resource.type}
                readTime="5 min read"
                views={getViewCount(resource.id)}
                author={resource.author || 'Unknown'}
                updatedAt={new Date(resource.updatedAt).toLocaleDateString()}
                tags={resource.tags}
                href={`/resources/${resource.slug}`}
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <p className="text-text-secondary mb-2">No resources found in this category yet.</p>
              <p className="text-sm text-text-muted">Check back soon for new content!</p>
            </div>
          )}
      </main>
    );
  }

  // Show category grid by default
  return (
    <>
      <Hero />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories Section */}
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold text-text-primary mb-2">Browse by Category</h2>
          <p className="text-text-secondary mb-8">
            Choose a category to explore related guides, SOPs, and tutorials.
          </p>
          <CategoryGrid onCategorySelect={handleCategorySelect} />
        </div>
      </main>
    </>
  );
};

export default Index;
