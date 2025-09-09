import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-light via-background to-accent-light">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-text-primary mb-8 leading-tight">
            Find answers to your
            <span className="text-primary block mt-3">Lead Hero questions</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-text-secondary mb-12 max-w-3xl mx-auto leading-relaxed">
            Search through our comprehensive collection of guides, SOPs, and tutorials. 
            Everything you need to master Lead Hero is right here.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative mb-12">
            <Search className="absolute left-6 top-1/2 h-6 w-6 -translate-y-1/2 text-text-muted" />
            <Input
              type="search"
              placeholder="What are you looking for?"
              className="pl-16 pr-6 py-8 text-xl bg-card border-card-border focus:border-primary shadow-xl rounded-2xl transition-all duration-300 hover:shadow-2xl focus:shadow-2xl"
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