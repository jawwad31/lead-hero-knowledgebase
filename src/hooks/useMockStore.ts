import { useState, useCallback, useMemo } from 'react';

export interface MockCategory {
  id: string;
  name: string;
  slug: string;
  order: number;
}

export interface MockResource {
  id: string;
  title: string;
  slug: string;
  type: 'guide' | 'sop' | 'tutorial';
  categoryId: string;
  tags: string[];
  bodyHtml: string;
  youtubeUrl?: string;
  published: boolean;
  updatedAt: string;
  author?: string;
  description?: string;
}

// Initial mock categories
const initialCategories: MockCategory[] = [
  { id: 'guides', name: 'Guides', slug: 'guides', order: 1 },
  { id: 'sops', name: 'SOPs', slug: 'sops', order: 2 },
  { id: 'tutorials', name: 'Tutorials', slug: 'tutorials', order: 3 },
  { id: 'troubleshooting', name: 'Troubleshooting', slug: 'troubleshooting', order: 4 },
];

// Initial mock resources
const initialResources: MockResource[] = [
  {
    id: '1',
    title: 'Getting Started with Lead Hero',
    slug: 'getting-started-with-lead-hero',
    type: 'guide',
    categoryId: 'guides',
    tags: ['setup', 'onboarding', 'basics'],
    bodyHtml: `
      <h2>Welcome to Lead Hero</h2>
      <p>This comprehensive guide will help you set up your Lead Hero account and understand the core features.</p>
      <h3>Getting Started</h3>
      <p>Follow these steps to get started with Lead Hero:</p>
      <ol>
        <li>Create your account</li>
        <li>Set up your profile</li>
        <li>Configure your first campaign</li>
      </ol>
    `,
    published: true,
    updatedAt: '2024-01-07T00:00:00Z',
    author: 'Sarah Chen',
    description: 'Complete guide to setting up your Lead Hero account and understanding the core features.',
  },
  {
    id: '2',
    title: 'User Management SOP',
    slug: 'user-management-sop',
    type: 'sop',
    categoryId: 'sops',
    tags: ['users', 'permissions', 'admin'],
    bodyHtml: `
      <h2>User Management Standard Operating Procedure</h2>
      <p>This SOP outlines the standard procedures for managing user accounts, roles, and permissions.</p>
      <h3>User Creation Process</h3>
      <p>Follow these steps to create new user accounts:</p>
      <ol>
        <li>Verify user requirements</li>
        <li>Assign appropriate role</li>
        <li>Send welcome email</li>
      </ol>
    `,
    published: true,
    updatedAt: '2024-01-02T00:00:00Z',
    author: 'Mike Johnson',
    description: 'Standard operating procedure for managing user accounts, roles, and permissions.',
  },
  {
    id: '3',
    title: 'Lead Generation Tutorial',
    slug: 'lead-generation-tutorial',
    type: 'tutorial',
    categoryId: 'tutorials',
    tags: ['leads', 'campaigns', 'marketing'],
    bodyHtml: `
      <h2>Lead Generation Tutorial</h2>
      <p>Learn how to create effective lead generation campaigns with this step-by-step tutorial.</p>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allowfullscreen></iframe>
      <h3>Campaign Setup</h3>
      <p>Start by setting up your campaign parameters...</p>
    `,
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    published: true,
    updatedAt: '2024-01-06T00:00:00Z',
    author: 'Emma Davis',
    description: 'Step-by-step tutorial on creating effective lead generation campaigns.',
  },
  {
    id: '4',
    title: 'Integration Setup Guide',
    slug: 'integration-setup-guide',
    type: 'guide',
    categoryId: 'guides',
    tags: ['integrations', 'crm', 'automation'],
    bodyHtml: `
      <h2>Integration Setup Guide</h2>
      <p>Connect Lead Hero with popular CRM and marketing automation tools.</p>
      <h3>Supported Integrations</h3>
      <ul>
        <li>Salesforce</li>
        <li>HubSpot</li>
        <li>Mailchimp</li>
      </ul>
    `,
    published: true,
    updatedAt: '2024-01-04T00:00:00Z',
    author: 'Alex Rivera',
    description: 'How to connect Lead Hero with popular CRM and marketing automation tools.',
  },
  {
    id: '5',
    title: 'Troubleshooting Common Issues',
    slug: 'troubleshooting-common-issues',
    type: 'guide',
    categoryId: 'troubleshooting',
    tags: ['troubleshooting', 'errors', 'solutions'],
    bodyHtml: `
      <h2>Troubleshooting Common Issues</h2>
      <p>Solutions to frequently encountered problems and error messages.</p>
      <h3>Login Issues</h3>
      <p>If you're having trouble logging in...</p>
      <h3>Performance Issues</h3>
      <p>If the application is running slowly...</p>
    `,
    published: true,
    updatedAt: '2024-01-08T00:00:00Z',
    author: 'Sarah Chen',
    description: 'Solutions to frequently encountered problems and error messages.',
  },
  {
    id: '6',
    title: 'Advanced Reporting Features',
    slug: 'advanced-reporting-features',
    type: 'tutorial',
    categoryId: 'tutorials',
    tags: ['reporting', 'analytics', 'advanced'],
    bodyHtml: `
      <h2>Advanced Reporting Features</h2>
      <p>Deep dive into Lead Hero's analytics and reporting capabilities.</p>
      <h3>Custom Reports</h3>
      <p>Learn how to create custom reports...</p>
      <h3>Data Export</h3>
      <p>Export your data for external analysis...</p>
    `,
    published: false,
    updatedAt: '2024-01-02T00:00:00Z',
    author: 'David Kim',
    description: 'Deep dive into Lead Hero\'s analytics and reporting capabilities.',
  },
];

// View counts storage
const viewCounts: Record<string, number> = {};

// Global state - in a real app this would be in a proper state manager
let globalCategories = [...initialCategories];
let globalResources = [...initialResources];

export function useMockStore() {
  const [categories, setCategories] = useState(globalCategories);
  const [resources, setResources] = useState(globalResources);

  // Sync local state with global state
  const syncState = useCallback(() => {
    setCategories([...globalCategories]);
    setResources([...globalResources]);
  }, []);

  // Category CRUD operations
  const createCategory = useCallback((category: Omit<MockCategory, 'id'>) => {
    const newCategory = {
      ...category,
      id: Date.now().toString(),
    };
    globalCategories.push(newCategory);
    syncState();
    return newCategory;
  }, [syncState]);

  const updateCategory = useCallback((id: string, updates: Partial<MockCategory>) => {
    const index = globalCategories.findIndex(c => c.id === id);
    if (index >= 0) {
      globalCategories[index] = { ...globalCategories[index], ...updates };
      syncState();
    }
  }, [syncState]);

  const deleteCategory = useCallback((id: string) => {
    globalCategories = globalCategories.filter(c => c.id !== id);
    syncState();
  }, [syncState]);

  // Resource CRUD operations
  const createResource = useCallback((resource: Omit<MockResource, 'id'>) => {
    const newResource = {
      ...resource,
      id: Date.now().toString(),
      slug: resource.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
    };
    globalResources.push(newResource);
    syncState();
    return newResource;
  }, [syncState]);

  const updateResource = useCallback((id: string, updates: Partial<MockResource>) => {
    const index = globalResources.findIndex(r => r.id === id);
    if (index >= 0) {
      globalResources[index] = { 
        ...globalResources[index], 
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      syncState();
    }
  }, [syncState]);

  const deleteResource = useCallback((id: string) => {
    globalResources = globalResources.filter(r => r.id !== id);
    syncState();
  }, [syncState]);

  // View count operations
  const incrementViewCount = useCallback((resourceId: string) => {
    viewCounts[resourceId] = (viewCounts[resourceId] || 0) + 1;
  }, []);

  const getViewCount = useCallback((resourceId: string) => {
    return viewCounts[resourceId] || 0;
  }, []);

  // Helper functions
  const getResourceById = useCallback((id: string) => {
    return resources.find(r => r.id === id);
  }, [resources]);

  const getResourceBySlug = useCallback((slug: string) => {
    return resources.find(r => r.slug === slug);
  }, [resources]);

  const getCategoryById = useCallback((id: string) => {
    return categories.find(c => c.id === id);
  }, [categories]);

  const getCategoryBySlug = useCallback((slug: string) => {
    return categories.find(c => c.slug === slug);
  }, [categories]);

  const getResourcesByCategory = useCallback((categoryId: string) => {
    return resources.filter(r => r.categoryId === categoryId);
  }, [resources]);

  const searchResources = useCallback((query: string) => {
    const lowercaseQuery = query.toLowerCase();
    return resources.filter(resource => 
      resource.title.toLowerCase().includes(lowercaseQuery) ||
      resource.description?.toLowerCase().includes(lowercaseQuery) ||
      resource.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }, [resources]);

  const getPublishedResources = useCallback(() => {
    return resources.filter(r => r.published);
  }, [resources]);

  // Stats for dashboard
  const stats = useMemo(() => {
    const totalResources = resources.length;
    const publishedResources = resources.filter(r => r.published).length;
    const totalViews = Object.values(viewCounts).reduce((sum, count) => sum + count, 0);
    const recentlyEdited = resources
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 5);

    return {
      totalResources,
      publishedResources,
      totalViews,
      recentlyEdited,
    };
  }, [resources]);

  return {
    // Data
    categories,
    resources,
    stats,
    
    // Category operations
    createCategory,
    updateCategory,
    deleteCategory,
    getCategoryById,
    getCategoryBySlug,
    
    // Resource operations
    createResource,
    updateResource,
    deleteResource,
    getResourceById,
    getResourceBySlug,
    getResourcesByCategory,
    searchResources,
    getPublishedResources,
    
    // View count operations
    incrementViewCount,
    getViewCount,
    
    // Sync
    syncState,
  };
}