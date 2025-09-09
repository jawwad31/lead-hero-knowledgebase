import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/20 bg-background/60 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-center">
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
        </div>
      </div>
    </header>
  );
};

export default Header;