import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { useMockStore } from "@/hooks/useMockStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ResourceCard from "@/components/ResourceCard";
import { Search, ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { MockResource } from "@/hooks/useMockStore";

const ITEMS_PER_PAGE = 20;

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { categories, getResourcesByCategory, getCategoryById } = useMockStore();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [currentPage, setCurrentPage] = useState(1);

  // Find category by slug
  const category = useMemo(() => {
    return categories.find(c => c.slug === slug);
  }, [categories, slug]);

  // Get published resources for this category
  const categoryResources = useMemo(() => {
    if (!category) return [];
    return getResourcesByCategory(category.id).filter(resource => resource.published);
  }, [category, getResourcesByCategory]);

  // Apply search and filters
  const filteredResources = useMemo(() => {
    let filtered = [...categoryResources];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(resource => 
        resource.title.toLowerCase().includes(query) ||
        resource.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Type filter
    if (typeFilter !== "all") {
      filtered = filtered.filter(resource => resource.type === typeFilter);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
        case "title":
          return a.title.localeCompare(b.title);
        case "newest":
        default:
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }
    });

    return filtered;
  }, [categoryResources, searchQuery, typeFilter, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredResources.length / ITEMS_PER_PAGE);
  const currentResources = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredResources.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredResources, currentPage]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, typeFilter, sortBy]);

  // Set page title and meta description
  useEffect(() => {
    if (category) {
      document.title = `${category.name} · Knowledge Base`;
      
      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', `Resources in ${category.name} for Lead Hero CRM.`);
      }
    }
  }, [category]);

  // Redirect to 404 if category not found
  if (!category) {
    navigate('/404', { replace: true });
    return null;
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'guide':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'sop':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'tutorial':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
        {/* Breadcrumb */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>→</span>
            <span>Categories</span>
            <span>→</span>
            <span className="text-text-primary font-medium">{category.name}</span>
          </div>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-text-primary mb-4">
            {category.name}
          </h1>
          <p className="text-xl text-text-secondary mb-6">
            {categoryResources.length} resource{categoryResources.length !== 1 ? 's' : ''} available
          </p>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted" />
              <Input
                type="search"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 bg-card border-card-border focus:border-primary"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-3">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="guide">Guide</SelectItem>
                  <SelectItem value="sop">SOP</SelectItem>
                  <SelectItem value="tutorial">Tutorial</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="title">Title A–Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Resource Cards */}
        {categoryResources.length === 0 ? (
          <Card className="p-12 text-center">
            <CardContent>
              <div className="text-muted-foreground mb-4">
                No resources in this category yet.
              </div>
              <Button variant="outline" onClick={() => navigate("/")}>
                Back to Knowledge Base
              </Button>
            </CardContent>
          </Card>
        ) : filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentResources.map((resource) => (
              <ResourceCard
                key={resource.id}
                title={resource.title}
                type={resource.type}
                updatedAt={formatDate(resource.updatedAt)}
                tags={resource.tags}
                href={`/resources/${resource.id}`}
              />
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <CardContent>
              <div className="text-muted-foreground mb-4">
                No resources found matching your criteria.
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setTypeFilter("all");
                  setSortBy("newest");
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="w-10 h-10"
                >
                  {page}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;