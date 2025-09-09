import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import CategoryFilter from "@/components/CategoryFilter";
import ResourceCard from "@/components/ResourceCard";

// Demo data
const demoResources = [
  {
    title: "Getting Started with Lead Hero",
    description: "Complete guide to setting up your Lead Hero account and understanding the core features.",
    category: "guides",
    type: "guide" as const,
    readTime: "5 min read",
    views: 1243,
    author: "Sarah Chen",
    updatedAt: "2 days ago",
    tags: ["setup", "onboarding", "basics"]
  },
  {
    title: "User Management SOP",
    description: "Standard operating procedure for managing user accounts, roles, and permissions.",
    category: "sops",
    type: "sop" as const,
    readTime: "8 min read",
    views: 856,
    author: "Mike Johnson",
    updatedAt: "1 week ago",
    tags: ["users", "permissions", "admin"]
  },
  {
    title: "Lead Generation Tutorial",
    description: "Step-by-step tutorial on creating effective lead generation campaigns.",
    category: "tutorials",
    type: "tutorial" as const,
    readTime: "12 min read",
    views: 2134,
    author: "Emma Davis",
    updatedAt: "3 days ago",
    tags: ["leads", "campaigns", "marketing"]
  },
  {
    title: "Integration Setup Guide",
    description: "How to connect Lead Hero with popular CRM and marketing automation tools.",
    category: "guides",
    type: "guide" as const,
    readTime: "10 min read",
    views: 967,
    author: "Alex Rivera",
    updatedAt: "5 days ago",
    tags: ["integrations", "crm", "automation"]
  },
  {
    title: "Troubleshooting Common Issues",
    description: "Solutions to frequently encountered problems and error messages.",
    category: "troubleshooting",
    type: "guide" as const,
    readTime: "6 min read",
    views: 1456,
    author: "Sarah Chen",
    updatedAt: "1 day ago",
    tags: ["troubleshooting", "errors", "solutions"]
  },
  {
    title: "Advanced Reporting Features",
    description: "Deep dive into Lead Hero's analytics and reporting capabilities.",
    category: "tutorials",
    type: "tutorial" as const,
    readTime: "15 min read",
    views: 723,
    author: "David Kim",
    updatedAt: "1 week ago",
    tags: ["reporting", "analytics", "advanced"]
  }
];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredResources = selectedCategory === "all" 
    ? demoResources 
    : demoResources.filter(resource => resource.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <StatsBar />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-text-primary mb-4">Browse Resources</h2>
          <CategoryFilter 
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {/* Resources Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredResources.map((resource, index) => (
            <ResourceCard key={index} {...resource} />
          ))}
        </div>

        {/* Empty State */}
        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-secondary">No resources found in this category.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
