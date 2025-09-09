import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-light via-background to-accent-light">
      <div className="container mx-auto text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
            Find answers to your
            <span className="text-primary block mt-2">Lead Hero questions</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
            Search through our comprehensive collection of guides, SOPs, and tutorials. 
            Everything you need to master Lead Hero is right here.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative mb-8">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted" />
            <Input
              type="search"
              placeholder="What are you looking for?"
              className="pl-12 pr-4 py-6 text-lg bg-card border-card-border focus:border-primary shadow-lg"
            />
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-sm text-text-secondary">Popular searches:</span>
            <Button variant="outline" size="sm" className="h-8 text-xs">
              User Management
            </Button>
            <Button variant="outline" size="sm" className="h-8 text-xs">
              Lead Generation
            </Button>
            <Button variant="outline" size="sm" className="h-8 text-xs">
              Integrations
            </Button>
            <Button variant="outline" size="sm" className="h-8 text-xs">
              Reporting
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;