import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-card-border bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">LH</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-text-primary">Lead Hero</span>
              <span className="text-xs text-text-secondary -mt-1">Knowledge Base</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
              <Input
                type="search"
                placeholder="Search guides, SOPs, tutorials..."
                className="pl-10 bg-surface border-card-border focus:border-primary"
              />
            </div>
          </div>

          {/* Admin Login */}
          <Button variant="outline" size="sm" className="hidden sm:flex">
            Admin Login
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;