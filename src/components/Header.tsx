import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-primary elevation-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-center">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-lg bg-primary-foreground flex items-center justify-center elevation-2">
              <span className="text-primary font-bold text-lg">LH</span>
            </div>
            <div className="flex flex-col">
              <span className="text-h2 text-primary-foreground">Lead Hero</span>
              <span className="text-caption text-primary-foreground/80 -mt-1">Knowledge Base</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;