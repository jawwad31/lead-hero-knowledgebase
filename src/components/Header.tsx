import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-card-border bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">LH</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-text-primary">Lead Hero</span>
              <span className="text-xs text-text-secondary -mt-1">Knowledge Base</span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className="text-text-secondary hover:text-text-primary transition-colors font-medium"
            >
              Knowledge Base
            </Link>
            <Link 
              to="/" 
              className="text-text-secondary hover:text-text-primary transition-colors font-medium"
            >
              All Resources
            </Link>
            <Link 
              to="/login"
              className="text-text-secondary hover:text-text-primary transition-colors font-medium"
            >
              Admin
            </Link>
          </nav>

          {/* Mobile menu button - placeholder for future mobile navigation */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              Menu
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;