export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      appointments: {
        Row: {
          appointment_type: string
          created_at: string
          duration_minutes: number
          email: string
          id: string
          message: string | null
          name: string
          phone: string | null
          preferred_date: string
          preferred_time: string
          status: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          appointment_type: string
          created_at?: string
          duration_minutes?: number
          email: string
          id?: string
          message?: string | null
          name: string
          phone?: string | null
          preferred_date: string
          preferred_time: string
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          appointment_type?: string
          created_at?: string
          duration_minutes?: number
          email?: string
          id?: string
          message?: string | null
          name?: string
          phone?: string | null
          preferred_date?: string
          preferred_time?: string
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      blog_comments: {
        Row: {
          author_email: string
          author_name: string
          blog_post_id: string
          content: string
          created_at: string
          id: string
          is_approved: boolean
          updated_at: string
          user_id: string | null
        }
        Insert: {
          author_email: string
          author_name: string
          blog_post_id: string
          content: string
          created_at?: string
          id?: string
          is_approved?: boolean
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          author_email?: string
          author_name?: string
          blog_post_id?: string
          content?: string
          created_at?: string
          id?: string
          is_approved?: boolean
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author: string
          category: string
          content: string
          created_at: string
          date: string
          excerpt: string
          id: string
          image: string
          likes: number
          readtime: string
          tags: string[]
          title: string
          updated_at: string
        }
        Insert: {
          author?: string
          category: string
          content: string
          created_at?: string
          date: string
          excerpt: string
          id: string
          image: string
          likes?: number
          readtime: string
          tags?: string[]
          title: string
          updated_at?: string
        }
        Update: {
          author?: string
          category?: string
          content?: string
          created_at?: string
          date?: string
          excerpt?: string
          id?: string
          image?: string
          likes?: number
          readtime?: string
          tags?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      books: {
        Row: {
          cover_url: string | null
          created_at: string | null
          description: string | null
          id: string
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          cover_url?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          cover_url?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      briefings: {
        Row: {
          audio_url: string | null
          author: string
          category: string
          content: string
          created_at: string
          featured_image: string | null
          geo_tags: string[]
          id: string
          keywords: string[]
          publish_geo: string | null
          published_at: string | null
          scheduled_publish_at: string | null
          seo_description: string
          seo_title: string
          slug: string
          status: string
          summary: string
          title: string
          updated_at: string
        }
        Insert: {
          audio_url?: string | null
          author?: string
          category: string
          content: string
          created_at?: string
          featured_image?: string | null
          geo_tags?: string[]
          id?: string
          keywords?: string[]
          publish_geo?: string | null
          published_at?: string | null
          scheduled_publish_at?: string | null
          seo_description: string
          seo_title: string
          slug: string
          status?: string
          summary: string
          title: string
          updated_at?: string
        }
        Update: {
          audio_url?: string | null
          author?: string
          category?: string
          content?: string
          created_at?: string
          featured_image?: string | null
          geo_tags?: string[]
          id?: string
          keywords?: string[]
          publish_geo?: string | null
          published_at?: string | null
          scheduled_publish_at?: string | null
          seo_description?: string
          seo_title?: string
          slug?: string
          status?: string
          summary?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      cached_amazon_books: {
        Row: {
          amazon_url: string
          asin: string
          cover_url: string | null
          created_at: string | null
          display_order: number | null
          id: string
          is_visible: boolean | null
          title: string
          updated_at: string | null
        }
        Insert: {
          amazon_url: string
          asin: string
          cover_url?: string | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_visible?: boolean | null
          title: string
          updated_at?: string | null
        }
        Update: {
          amazon_url?: string
          asin?: string
          cover_url?: string | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_visible?: boolean | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      consultation_requests: {
        Row: {
          budget_range: string | null
          company: string | null
          consultation_type: string
          created_at: string
          email: string
          id: string
          name: string
          phone: string | null
          project_description: string
          status: string
          timeline: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          budget_range?: string | null
          company?: string | null
          consultation_type: string
          created_at?: string
          email: string
          id?: string
          name: string
          phone?: string | null
          project_description: string
          status?: string
          timeline?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          budget_range?: string | null
          company?: string | null
          consultation_type?: string
          created_at?: string
          email?: string
          id?: string
          name?: string
          phone?: string | null
          project_description?: string
          status?: string
          timeline?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: string
          is_read: boolean
          message: string
          name: string
          subject: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_read?: boolean
          message: string
          name: string
          subject: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_read?: boolean
          message?: string
          name?: string
          subject?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string
          description: string | null
          end_date: string | null
          event_type: string
          id: string
          is_public: boolean
          is_virtual: boolean
          location: string | null
          registration_link: string | null
          registration_required: boolean
          start_date: string
          title: string
          updated_at: string
          virtual_link: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          end_date?: string | null
          event_type: string
          id?: string
          is_public?: boolean
          is_virtual?: boolean
          location?: string | null
          registration_link?: string | null
          registration_required?: boolean
          start_date: string
          title: string
          updated_at?: string
          virtual_link?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          end_date?: string | null
          event_type?: string
          id?: string
          is_public?: boolean
          is_virtual?: boolean
          location?: string | null
          registration_link?: string | null
          registration_required?: boolean
          start_date?: string
          title?: string
          updated_at?: string
          virtual_link?: string | null
        }
        Relationships: []
      }
      mentorship_enrollments: {
        Row: {
          completed_at: string | null
          created_at: string
          enrolled_at: string
          id: string
          program_name: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          enrolled_at?: string
          id?: string
          program_name?: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          enrolled_at?: string
          id?: string
          program_name?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      module_submissions: {
        Row: {
          created_at: string
          enrollment_id: string
          file_urls: string[] | null
          grade_status: string
          id: string
          instructor_feedback: string | null
          max_score: number
          module_name: string
          module_number: number
          reviewed_at: string | null
          reviewed_by: string | null
          score: number | null
          status: string
          submission_content: string | null
          submitted_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          enrollment_id: string
          file_urls?: string[] | null
          grade_status?: string
          id?: string
          instructor_feedback?: string | null
          max_score?: number
          module_name: string
          module_number: number
          reviewed_at?: string | null
          reviewed_by?: string | null
          score?: number | null
          status?: string
          submission_content?: string | null
          submitted_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          enrollment_id?: string
          file_urls?: string[] | null
          grade_status?: string
          id?: string
          instructor_feedback?: string | null
          max_score?: number
          module_name?: string
          module_number?: number
          reviewed_at?: string | null
          reviewed_by?: string | null
          score?: number | null
          status?: string
          submission_content?: string | null
          submitted_at?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "module_submissions_enrollment_id_fkey"
            columns: ["enrollment_id"]
            isOneToOne: false
            referencedRelation: "mentorship_enrollments"
            referencedColumns: ["id"]
          },
        ]
      }
      newsletter_subscribers: {
        Row: {
          email: string
          id: string
          is_active: boolean
          name: string | null
          subscribed_at: string
          unsubscribe_token: string | null
        }
        Insert: {
          email: string
          id?: string
          is_active?: boolean
          name?: string | null
          subscribed_at?: string
          unsubscribe_token?: string | null
        }
        Update: {
          email?: string
          id?: string
          is_active?: boolean
          name?: string | null
          subscribed_at?: string
          unsubscribe_token?: string | null
        }
        Relationships: []
      }
      publication_embeddings: {
        Row: {
          content: string | null
          created_at: string | null
          description: string
          id: string
          publication_id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          description: string
          id?: string
          publication_id: string
          title: string
          updated_at?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          description?: string
          id?: string
          publication_id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      resources: {
        Row: {
          category: string
          created_at: string
          description: string | null
          download_count: number
          file_size: number | null
          file_type: string
          file_url: string
          id: string
          is_gated: boolean
          is_public: boolean
          required_role: string | null
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          download_count?: number
          file_size?: number | null
          file_type: string
          file_url: string
          id?: string
          is_gated?: boolean
          is_public?: boolean
          required_role?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          download_count?: number
          file_size?: number | null
          file_type?: string
          file_url?: string
          id?: string
          is_gated?: boolean
          is_public?: boolean
          required_role?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      security_audit_log: {
        Row: {
          description: string
          event_type: string
          id: string
          performed_at: string | null
          performed_by: string | null
        }
        Insert: {
          description: string
          event_type: string
          id?: string
          performed_at?: string | null
          performed_by?: string | null
        }
        Update: {
          description?: string
          event_type?: string
          id?: string
          performed_at?: string | null
          performed_by?: string | null
        }
        Relationships: []
      }
      student_progress: {
        Row: {
          completed_at: string | null
          created_at: string
          enrollment_id: string
          id: string
          module_number: number
          started_at: string | null
          status: string
          time_spent_minutes: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          enrollment_id: string
          id?: string
          module_number: number
          started_at?: string | null
          status?: string
          time_spent_minutes?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          enrollment_id?: string
          id?: string
          module_number?: number
          started_at?: string | null
          status?: string
          time_spent_minutes?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_progress_enrollment_id_fkey"
            columns: ["enrollment_id"]
            isOneToOne: false
            referencedRelation: "mentorship_enrollments"
            referencedColumns: ["id"]
          },
        ]
      }
      testimonials: {
        Row: {
          category: string
          created_at: string
          email: string
          id: string
          is_approved: boolean
          name: string
          organization: string | null
          rating: number
          testimonial: string
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          email: string
          id?: string
          is_approved?: boolean
          name: string
          organization?: string | null
          rating: number
          testimonial: string
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          email?: string
          id?: string
          is_approved?: boolean
          name?: string
          organization?: string | null
          rating?: number
          testimonial?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      webinar_registrations: {
        Row: {
          company: string | null
          email: string
          id: string
          name: string
          questions: string | null
          registered_at: string
          user_id: string | null
          webinar_id: string
        }
        Insert: {
          company?: string | null
          email: string
          id?: string
          name: string
          questions?: string | null
          registered_at?: string
          user_id?: string | null
          webinar_id: string
        }
        Update: {
          company?: string | null
          email?: string
          id?: string
          name?: string
          questions?: string | null
          registered_at?: string
          user_id?: string | null
          webinar_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "webinar_registrations_webinar_id_fkey"
            columns: ["webinar_id"]
            isOneToOne: false
            referencedRelation: "webinars"
            referencedColumns: ["id"]
          },
        ]
      }
      webinars: {
        Row: {
          created_at: string
          date: string
          description: string | null
          duration_minutes: number
          id: string
          is_public: boolean
          max_attendees: number | null
          meeting_link: string | null
          registration_url: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          date: string
          description?: string | null
          duration_minutes?: number
          id?: string
          is_public?: boolean
          max_attendees?: number | null
          meeting_link?: string | null
          registration_url?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          date?: string
          description?: string | null
          duration_minutes?: number
          id?: string
          is_public?: boolean
          max_attendees?: number | null
          meeting_link?: string | null
          registration_url?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      website_content: {
        Row: {
          content: string
          content_type: string | null
          embedding: string | null
          id: string
          indexed_at: string | null
          metadata: Json | null
          title: string
          updated_at: string | null
          url: string
        }
        Insert: {
          content: string
          content_type?: string | null
          embedding?: string | null
          id?: string
          indexed_at?: string | null
          metadata?: Json | null
          title: string
          updated_at?: string | null
          url: string
        }
        Update: {
          content?: string
          content_type?: string | null
          embedding?: string | null
          id?: string
          indexed_at?: string | null
          metadata?: Json | null
          title?: string
          updated_at?: string | null
          url?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_current_user_role: {
        Args: never
        Returns: Database["public"]["Enums"]["app_role"]
      }
      get_public_blog_comments: {
        Args: { post_id?: string }
        Returns: {
          author_name: string
          blog_post_id: string
          content: string
          created_at: string
          id: string
          updated_at: string
        }[]
      }
      get_public_testimonials: {
        Args: never
        Returns: {
          category: string
          created_at: string
          id: string
          name: string
          organization: string
          rating: number
          testimonial: string
          title: string
          updated_at: string
        }[]
      }
      get_user_appointments: {
        Args: { user_uuid?: string }
        Returns: {
          appointment_type: string
          created_at: string
          duration_minutes: number
          id: string
          preferred_date: string
          preferred_time: string
          status: string
        }[]
      }
      get_user_consultation_requests: {
        Args: { user_uuid?: string }
        Returns: {
          budget_range: string
          consultation_type: string
          created_at: string
          id: string
          status: string
          timeline: string
        }[]
      }
      get_user_webinar_registrations: {
        Args: { user_uuid?: string }
        Returns: {
          id: string
          registered_at: string
          webinar_id: string
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      search_website_content: {
        Args: {
          match_count?: number
          match_threshold?: number
          query_embedding: string
        }
        Returns: {
          content: string
          id: string
          metadata: Json
          similarity: number
          title: string
          url: string
        }[]
      }
      verify_security_policies: {
        Args: never
        Returns: {
          is_secure: boolean
          policy_name: string
          policy_type: string
          table_name: string
        }[]
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
