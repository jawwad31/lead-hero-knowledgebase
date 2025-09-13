import { useState, useCallback, useMemo, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { Category, Resource, ViewCount, CategoryInsert, ResourceInsert, ResourceUpdate, CategoryUpdate } from '@/types/database'

export function useSupabaseStore() {
  const [categories, setCategories] = useState<Category[]>([])
  const [resources, setResources] = useState<Resource[]>([])
  const [viewCounts, setViewCounts] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load initial data
  useEffect(() => {
    // Check if Supabase is properly configured
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
    
    if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'your_supabase_project_url') {
      setError('Supabase not configured. Please set up your environment variables.')
      setLoading(false)
      return
    }
    
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Load categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*')
        .order('order', { ascending: true })

      if (categoriesError) throw categoriesError

      // Load resources
      const { data: resourcesData, error: resourcesError } = await supabase
        .from('resources')
        .select('*')
        .order('updated_at', { ascending: false })

      if (resourcesError) throw resourcesError

      // Load view counts
      const { data: viewCountsData, error: viewCountsError } = await supabase
        .from('view_counts')
        .select('*')

      if (viewCountsError) throw viewCountsError

      setCategories(categoriesData || [])
      setResources(resourcesData || [])
      
      // Convert view counts to object
      const viewCountsObj: Record<string, number> = {}
      viewCountsData?.forEach(vc => {
        viewCountsObj[vc.resource_id] = vc.count
      })
      setViewCounts(viewCountsObj)

    } catch (err) {
      console.error('Error loading data:', err)
      setError(err instanceof Error ? err.message : 'Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  // Category CRUD operations
  const createCategory = useCallback(async (category: Omit<CategoryInsert, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .insert(category)
        .select()
        .single()

      if (error) throw error

      setCategories(prev => [...prev, data])
      return data
    } catch (err) {
      console.error('Error creating category:', err)
      throw err
    }
  }, [])

  const updateCategory = useCallback(async (id: string, updates: CategoryUpdate) => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      setCategories(prev => prev.map(c => c.id === id ? data : c))
      return data
    } catch (err) {
      console.error('Error updating category:', err)
      throw err
    }
  }, [])

  const deleteCategory = useCallback(async (id: string) => {
    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id)

      if (error) throw error

      setCategories(prev => prev.filter(c => c.id !== id))
    } catch (err) {
      console.error('Error deleting category:', err)
      throw err
    }
  }, [])

  // Resource CRUD operations
  const createResource = useCallback(async (resource: Omit<ResourceInsert, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('resources')
        .insert(resource)
        .select()
        .single()

      if (error) throw error

      setResources(prev => [data, ...prev])
      return data
    } catch (err) {
      console.error('Error creating resource:', err)
      throw err
    }
  }, [])

  const updateResource = useCallback(async (id: string, updates: ResourceUpdate) => {
    try {
      const { data, error } = await supabase
        .from('resources')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      setResources(prev => prev.map(r => r.id === id ? data : r))
      return data
    } catch (err) {
      console.error('Error updating resource:', err)
      throw err
    }
  }, [])

  const deleteResource = useCallback(async (id: string) => {
    try {
      const { error } = await supabase
        .from('resources')
        .delete()
        .eq('id', id)

      if (error) throw error

      setResources(prev => prev.filter(r => r.id !== id))
    } catch (err) {
      console.error('Error deleting resource:', err)
      throw err
    }
  }, [])

  // View count operations
  const incrementViewCount = useCallback(async (resourceId: string) => {
    try {
      // Check if view count exists
      const { data: existing } = await supabase
        .from('view_counts')
        .select('*')
        .eq('resource_id', resourceId)
        .single()

      if (existing) {
        // Update existing count
        const { data, error } = await supabase
          .from('view_counts')
          .update({ 
            count: existing.count + 1,
            updated_at: new Date().toISOString()
          })
          .eq('resource_id', resourceId)
          .select()
          .single()

        if (error) throw error

        setViewCounts(prev => ({
          ...prev,
          [resourceId]: data.count
        }))
      } else {
        // Create new view count
        const { data, error } = await supabase
          .from('view_counts')
          .insert({
            resource_id: resourceId,
            count: 1
          })
          .select()
          .single()

        if (error) throw error

        setViewCounts(prev => ({
          ...prev,
          [resourceId]: 1
        }))
      }
    } catch (err) {
      console.error('Error incrementing view count:', err)
    }
  }, [])

  const getViewCount = useCallback((resourceId: string) => {
    return viewCounts[resourceId] || 0
  }, [viewCounts])

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
    loading,
    error,
    
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
    
    // Utility
    refreshData: loadData,
  }
}

