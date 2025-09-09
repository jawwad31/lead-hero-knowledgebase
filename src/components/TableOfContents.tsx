import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

const TableOfContents = ({ content }: TableOfContentsProps) => {
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Parse H2 and H3 tags from HTML content
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const headings = doc.querySelectorAll('h2, h3');
    
    const items: TOCItem[] = [];
    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1));
      const text = heading.textContent || '';
      const id = `toc-${index}`;
      
      // Add ID to heading if it doesn't have one
      heading.id = id;
      
      items.push({ id, text, level });
    });
    
    setTocItems(items);

    // Update the actual content in the DOM
    const contentElement = document.querySelector('.resource-content');
    if (contentElement && items.length > 0) {
      contentElement.innerHTML = doc.body.innerHTML;
    }
  }, [content]);

  useEffect(() => {
    if (tocItems.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0% -80% 0%' }
    );

    tocItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [tocItems]);

  if (tocItems.length === 0) return null;

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Card className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-auto">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">Table of Contents</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <nav>
          <ul className="space-y-1 text-sm">
            {tocItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToHeading(item.id)}
                  className={`block w-full text-left py-1 px-2 rounded-sm transition-colors hover:bg-muted focus:bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                    item.level === 3 ? 'ml-4 text-xs' : ''
                  } ${
                    activeId === item.id 
                      ? 'text-primary font-medium bg-primary/10' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item.text}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </CardContent>
    </Card>
  );
};

export default TableOfContents;