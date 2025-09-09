import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import { MetaTags } from "@/components/SEO/MetaTags";
import { getMetaForHome } from "@/utils/seo";
import { siteSettings } from "@/config/siteSettings";

const Index = () => {
  const homeMeta = getMetaForHome();

  return (
    <>
      <MetaTags
        title={homeMeta.title}
        description={homeMeta.desc}
        url={homeMeta.url}
        image={homeMeta.image}
        type="website"
        twitterSite={siteSettings.twitterHandle}
      />
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
