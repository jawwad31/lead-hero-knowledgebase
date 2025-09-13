export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          order: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          order?: number
          created_at?: string
          updated_at?: string
        }
      }
      resources: {
        Row: {
          id: string
          title: string
          slug: string
          type: 'guide' | 'sop' | 'tutorial'
          category_id: string
          tags: string[]
          body_html: string
          youtube_url?: string
          published: boolean
          created_at: string
          updated_at: string
          author?: string
          description?: string
          og_image?: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          type: 'guide' | 'sop' | 'tutorial'
          category_id: string
          tags: string[]
          body_html: string
          youtube_url?: string
          published?: boolean
          created_at?: string
          updated_at?: string
          author?: string
          description?: string
          og_image?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          type?: 'guide' | 'sop' | 'tutorial'
          category_id?: string
          tags?: string[]
          body_html?: string
          youtube_url?: string
          published?: boolean
          created_at?: string
          updated_at?: string
          author?: string
          description?: string
          og_image?: string
        }
      }
      view_counts: {
        Row: {
          id: string
          resource_id: string
          count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          resource_id: string
          count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          resource_id?: string
          count?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Convenience types for the app
export type Category = Database['public']['Tables']['categories']['Row']
export type Resource = Database['public']['Tables']['resources']['Row']
export type ViewCount = Database['public']['Tables']['view_counts']['Row']

export type CategoryInsert = Database['public']['Tables']['categories']['Insert']
export type ResourceInsert = Database['public']['Tables']['resources']['Insert']
export type ViewCountInsert = Database['public']['Tables']['view_counts']['Insert']

export type CategoryUpdate = Database['public']['Tables']['categories']['Update']
export type ResourceUpdate = Database['public']['Tables']['resources']['Update']
export type ViewCountUpdate = Database['public']['Tables']['view_counts']['Update']

