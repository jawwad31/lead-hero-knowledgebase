import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import { MetaTags } from "@/components/SEO/MetaTags";
import { getMetaForHome } from "@/utils/seo";
import { siteSettings } from "@/config/siteSettings";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

const Index = () => {
  const homeMeta = getMetaForHome();
  
  // Check if Supabase is configured
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
  const isSupabaseConfigured = supabaseUrl && supabaseAnonKey && supabaseUrl !== 'your_supabase_project_url'

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
        {/* Demo Mode Banner */}
        {!isSupabaseConfigured && (
          <Alert className="mb-8 border-blue-200 bg-blue-50">
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>Demo Mode:</strong> This app is running with sample data. To enable full functionality, 
              set up your Supabase credentials in the <code>.env.local</code> file. 
              See <code>SUPABASE_SETUP.md</code> for instructions.
            </AlertDescription>
          </Alert>
        )}
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
