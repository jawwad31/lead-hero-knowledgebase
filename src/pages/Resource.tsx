import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Eye, Search, Home, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sanitizeHtml, addHeadingIds } from "@/utils/sanitizeHtml";
import { useMockStore } from "@/hooks/useMockStore";
import { useToast } from "@/hooks/use-toast";
import { 
  Breadcrumb, 
  BreadcrumbList, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbSeparator, 
  BreadcrumbPage 
} from "@/components/ui/breadcrumb";
import ArticleSkeleton from "@/components/ArticleSkeleton";
import TableOfContents from "@/components/TableOfContents";
import ShareButton from "@/components/ShareButton";

const Resource = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getResourceBySlug, getCategoryById, incrementViewCount, getViewCount } = useMockStore();
  const [resource, setResource] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      setIsLoading(false);
      return;
    }
    
    // Simulate loading delay
    const timer = setTimeout(() => {
      // Find resource by slug
      const foundResource = getResourceBySlug(slug);
      if (foundResource) {
        setResource(foundResource);
        // Increment view count when resource is viewed
        incrementViewCount(foundResource.id);
      }
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [slug, getResourceBySlug, incrementViewCount]);

  // Extract text content from HTML for SEO description
  const getTextContent = (html: string) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };

  // Set SEO meta tags and OpenGraph
  useEffect(() => {
    if (resource) {
      const title = `${resource.title} · Lead Hero KB`;
      const textContent = getTextContent(resource.bodyHtml);
      const description = textContent.slice(0, 160);
      const url = window.location.href;
      
      // Set page title
      document.title = title;
      
      // Set or update meta description
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', description);
      
      // OpenGraph tags
      const setOrUpdateMeta = (property: string, content: string) => {
        let meta = document.querySelector(`meta[property="${property}"]`);
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute('property', property);
          document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
      };
      
      setOrUpdateMeta('og:title', title);
      setOrUpdateMeta('og:description', description);
      setOrUpdateMeta('og:type', 'article');
      setOrUpdateMeta('og:url', url);
    }
  }, [resource]);

  // Truncate text for breadcrumbs
  const truncateText = (text: string, maxLength: number = 30) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  if (isLoading) {
    return <ArticleSkeleton />;
  }

  if (!resource) {
    // Check if user came from a category page
    const referrer = document.referrer;
    const cameFromCategory = referrer.includes('/categories/');
    let referrerCategorySlug = null;
    
    if (cameFromCategory) {
      const match = referrer.match(/\/categories\/([^/?]+)/);
      referrerCategorySlug = match ? match[1] : null;
    }

    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-2xl mx-auto text-center">
            {/* Breadcrumb-style navigation */}
            <Breadcrumb className="mb-8 justify-center">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Resource Not Found</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            {/* Error messaging */}
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Resource Not Found
            </h1>
            <p className="text-muted-foreground mb-8">
              The resource you're looking for doesn't exist or may have been moved.
            </p>

            {/* Search input */}
            <div className="relative mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for resources..."
                className="pl-10"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    navigate(`/?search=${e.currentTarget.value}`);
                  }
                }}
              />
            </div>

            {/* Navigation actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {referrerCategorySlug && (
                <Link to={`/categories/${referrerCategorySlug}`}>
                  <Button variant="default">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Category
                  </Button>
                </Link>
              )}
              <Link to="/">
                <Button variant="outline">
                  <Home className="h-4 w-4 mr-2" />
                  Browse All Categories
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const category = getCategoryById(resource.categoryId);
  const viewCount = getViewCount(resource.id);
  const showTOC = resource.bodyHtml.includes('<h2>') || resource.bodyHtml.includes('<h3>');
  
  // Copy link functionality
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "Resource link copied to clipboard",
      });
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      toast({
        title: "Link copied",
        description: "Resource link copied to clipboard",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumbs */}
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={`/categories/${category?.slug}`}>Categories</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={`/categories/${category?.slug}`}>
                    {truncateText(category?.name || 'Unknown Category')}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{truncateText(resource.title)}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex gap-8">
            {/* Main Content */}
            <div className="flex-1 max-w-4xl">
              {/* Resource Header */}
              <header className="mb-8">
                {/* Category Badge */}
                <Badge variant="secondary" className="mb-4">
                  {category?.name || 'Unknown Category'}
                </Badge>

                {/* Title */}
                <div className="flex items-start gap-3 mb-4">
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground flex-1">
                    {resource.title}
                  </h1>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyLink}
                    className="mt-1 flex-shrink-0"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy link
                  </Button>
                </div>

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Updated {new Date(resource.updatedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{viewCount} views</span>
                  </div>
                  {resource.author && (
                    <div>
                      <span>By {resource.author}</span>
                    </div>
                  )}
                  <ShareButton title={resource.title} />
                </div>

                {/* Tags */}
                {resource.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-8">
                    {resource.tags.map((tag: string) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </header>

              {/* Resource Content */}
              <article className="prose prose-lg max-w-none">
                <div 
                  className="resource-content"
                  dangerouslySetInnerHTML={{ __html: addHeadingIds(sanitizeHtml(resource.bodyHtml)) }}
                />
              </article>
            </div>

            {/* Table of Contents Sidebar */}
            {showTOC && (
              <aside className="hidden xl:block w-64 flex-shrink-0">
                <TableOfContents content={resource.bodyHtml} />
              </aside>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resource;