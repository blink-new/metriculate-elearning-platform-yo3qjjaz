import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Profile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  grade: number | null
  school: string | null
  is_admin: boolean
  created_at: string
  updated_at: string
}

export interface Subject {
  id: string
  name: string
  description: string | null
  icon: string | null
  color: string | null
  grade_levels: number[]
  created_at: string
}

export interface Topic {
  id: string
  subject_id: string
  name: string
  description: string | null
  grade_level: number
  order_index: number
  created_at: string
}

export interface Lesson {
  id: string
  topic_id: string
  title: string
  description: string | null
  content: string | null
  video_url: string | null
  duration_minutes: number | null
  order_index: number
  created_at: string
}

export interface Quiz {
  id: string
  lesson_id: string | null
  topic_id: string | null
  title: string
  description: string | null
  questions: any[] // JSON array of questions
  created_at: string
}

export interface UserProgress {
  id: string
  user_id: string
  lesson_id: string | null
  quiz_id: string | null
  completed: boolean
  score: number | null
  time_spent_minutes: number | null
  completed_at: string | null
  created_at: string
}

export interface StudyPlan {
  id: string
  user_id: string
  title: string
  description: string | null
  target_date: string | null
  subjects: string[] // Array of subject IDs
  daily_goal_minutes: number | null
  created_at: string
  updated_at: string
}

export interface Achievement {
  id: string
  user_id: string
  type: string
  title: string
  description: string
  icon: string | null
  earned_at: string
}