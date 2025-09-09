import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";

const Index = () => {
  return (
    <>
      <Hero />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Categories Section */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-text-primary mb-4">Browse by Category</h2>
          <p className="text-xl text-text-secondary mb-12 max-w-2xl mx-auto">
            Choose a category to explore related guides, SOPs, and tutorials.
          </p>
          <CategoryGrid />
        </div>
      </main>
    </>
  );
};

export default Index;
