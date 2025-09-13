import { useState, useCallback, useMemo } from 'react'

// Fallback data when Supabase is not configured
const fallbackCategories = [
  { id: '1', name: 'Guides', slug: 'guides', order: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: '2', name: 'SOPs', slug: 'sops', order: 2, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: '3', name: 'Tutorials', slug: 'tutorials', order: 3, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: '4', name: 'Troubleshooting', slug: 'troubleshooting', order: 4, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
]

const fallbackResources = [
  {
    id: '1',
    title: 'Getting Started with Lead Hero',
    slug: 'getting-started-with-lead-hero',
    type: 'guide' as const,
    category_id: '1',
    tags: ['setup', 'onboarding', 'basics'],
    body_html: '<h2>Welcome to Lead Hero</h2><p>This comprehensive guide will help you set up your Lead Hero account and understand the core features.</p>',
    published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    author: 'Sarah Chen',
    description: 'Complete guide to setting up your Lead Hero account and understanding the core features.',
  },
  {
    id: '2',
    title: 'User Management SOP',
    slug: 'user-management-sop',
    type: 'sop' as const,
    category_id: '2',
    tags: ['users', 'permissions', 'admin'],
    body_html: '<h2>User Management Standard Operating Procedure</h2><p>This SOP outlines the standard procedures for managing user accounts, roles, and permissions.</p>',
    published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    author: 'Mike Johnson',
    description: 'Standard operating procedure for managing user accounts, roles, and permissions.',
  },
]

export function useFallbackStore() {
  const [categories] = useState(fallbackCategories)
  const [resources] = useState(fallbackResources)
  const [viewCounts] = useState<Record<string, number>>({})

  // Helper functions
  const getResourceById = useCallback((id: string) => {
    return resources.find(r => r.id === id)
  }, [resources])

  const getResourceBySlug = useCallback((slug: string) => {
    return resources.find(r => r.slug === slug)
  }, [resources])

  const getCategoryById = useCallback((id: string) => {
    return categories.find(c => c.id === id)
  }, [categories])

  const getCategoryBySlug = useCallback((slug: string) => {
    return categories.find(c => c.slug === slug)
  }, [categories])

  const getResourcesByCategory = useCallback((categoryId: string) => {
    return resources.filter(r => r.category_id === categoryId)
  }, [resources])

  const searchResources = useCallback((query: string) => {
    const lowercaseQuery = query.toLowerCase()
    return resources.filter(resource => 
      resource.title.toLowerCase().includes(lowercaseQuery) ||
      resource.description?.toLowerCase().includes(lowercaseQuery) ||
      resource.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    )
  }, [resources])

  const getPublishedResources = useCallback(() => {
    return resources.filter(r => r.published)
  }, [resources])

  const getViewCount = useCallback((resourceId: string) => {
    return viewCounts[resourceId] || 0
  }, [viewCounts])

  // Stats for dashboard
  const stats = useMemo(() => {
    const totalResources = resources.length
    const publishedResources = resources.filter(r => r.published).length
    const totalViews = Object.values(viewCounts).reduce((sum, count) => sum + count, 0)
    const recentlyEdited = resources
      .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
      .slice(0, 5)

    return {
      totalResources,
      publishedResources,
      totalViews,
      recentlyEdited,
    }
  }, [resources, viewCounts])

  return {
    // Data
    categories,
    resources,
    stats,
    loading: false,
    error: 'Supabase not configured. This is demo data.',
    
    // Helper functions
    getResourceById,
    getResourceBySlug,
    getCategoryById,
    getCategoryBySlug,
    getResourcesByCategory,
    searchResources,
    getPublishedResources,
    getViewCount,
    
    // Mock CRUD operations (they won't actually work)
    createCategory: async () => { throw new Error('Supabase not configured') },
    updateCategory: async () => { throw new Error('Supabase not configured') },
    deleteCategory: async () => { throw new Error('Supabase not configured') },
    createResource: async () => { throw new Error('Supabase not configured') },
    updateResource: async () => { throw new Error('Supabase not configured') },
    deleteResource: async () => { throw new Error('Supabase not configured') },
    incrementViewCount: async () => { /* Mock - does nothing */ },
    
    // Utility
    refreshData: () => { /* Mock - does nothing */ },
  }
}
