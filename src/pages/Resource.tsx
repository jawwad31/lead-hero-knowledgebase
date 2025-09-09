import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import "../styles/resource-content.css";

// Mock data
const mockResources = [
  {
    id: "1",
    title: "Getting Started with React Hooks",
    category: "Development",
    updatedAt: "2024-03-15",
    bodyHtml: `
      <h2>Introduction to React Hooks</h2>
      <p>React Hooks are a powerful feature that allows you to use state and other React features without writing a class component.</p>
      
      <h3>useState Hook</h3>
      <p>The useState hook allows you to add state to functional components:</p>
      <pre><code>const [count, setCount] = useState(0);</code></pre>
      
      <h3>useEffect Hook</h3>
      <p>The useEffect hook lets you perform side effects in functional components.</p>
      
      <h3>Video Tutorial</h3>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/TNhaISOUy6Q" title="React Hooks Tutorial" frameborder="0" allowfullscreen></iframe>
      
      <p>This comprehensive guide will help you master React Hooks and improve your development workflow.</p>
    `,
    tags: ["React", "JavaScript", "Frontend", "Hooks"]
  },
  {
    id: "2", 
    title: "Deployment Best Practices",
    category: "DevOps",
    updatedAt: "2024-03-10",
    bodyHtml: `
      <h2>Deployment Strategies</h2>
      <p>Learn the best practices for deploying modern web applications to production environments.</p>
      
      <h3>CI/CD Pipeline</h3>
      <p>Set up continuous integration and deployment for faster, more reliable releases.</p>
      
      <h3>Environment Configuration</h3>
      <p>Properly configure your environments for development, staging, and production.</p>
      
      <blockquote>
        <p>"Good deployment practices are essential for maintaining application reliability and performance."</p>
      </blockquote>
    `,
    tags: ["DevOps", "CI/CD", "Production", "Deployment"]
  },
  {
    id: "3",
    title: "API Design Guidelines",
    category: "Backend",
    updatedAt: "2024-03-08",
    bodyHtml: `
      <h2>RESTful API Design</h2>
      <p>Follow these guidelines to create consistent, maintainable, and developer-friendly APIs.</p>
      
      <h3>HTTP Methods</h3>
      <ul>
        <li><strong>GET</strong> - Retrieve data</li>
        <li><strong>POST</strong> - Create new resources</li>
        <li><strong>PUT</strong> - Update existing resources</li>
        <li><strong>DELETE</strong> - Remove resources</li>
      </ul>
      
      <h3>Status Codes</h3>
      <p>Use appropriate HTTP status codes to indicate the result of API operations.</p>
    `,
    tags: ["API", "REST", "Backend", "HTTP"]
  }
];

const Resource = () => {
  const { id } = useParams();
  const resource = mockResources.find(r => r.id === id);

  // Extract text content from HTML for SEO description
  const getTextContent = (html: string) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };

  // Set SEO meta tags
  useEffect(() => {
    if (resource) {
      document.title = resource.title;
      
      // Set meta description
      const textContent = getTextContent(resource.bodyHtml);
      const description = textContent.slice(0, 160);
      
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', description);
    }
  }, [resource]);

  if (!resource) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Link to="/">
              <Button variant="ghost" className="mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Knowledge Base
              </Button>
            </Link>
            <div className="text-center py-12">
              <h1 className="text-2xl font-semibold text-text-primary mb-4">
                Resource Not Found
              </h1>
              <p className="text-text-secondary">
                The resource you're looking for doesn't exist.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link to="/">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Knowledge Base
            </Button>
          </Link>

          {/* Resource Header */}
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="secondary" className="text-sm">
                {resource.category}
              </Badge>
              <div className="flex items-center text-sm text-text-secondary">
                <Calendar className="mr-1 h-4 w-4" />
                Updated {new Date(resource.updatedAt).toLocaleDateString()}
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              {resource.title}
            </h1>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {resource.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </header>

          {/* Resource Content */}
          <article className="max-w-none">
            <div 
              className="resource-content leading-relaxed"
              dangerouslySetInnerHTML={{ __html: resource.bodyHtml }}
            />
          </article>
        </div>
      </div>
    </div>
  );
};

export default Resource;