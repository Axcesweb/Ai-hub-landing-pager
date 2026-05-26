import { createClient } from '@/lib/supabase/server'
import type { Course } from '@/lib/types'

export async function getCourses(limit: number = 20, offset: number = 0) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('courses')
    .select(`
      id,
      title,
      description,
      thumbnail_url,
      category,
      level,
      price,
      students_count,
      rating,
      created_at,
      user_id,
      profiles:user_id (
        username,
        display_name,
        avatar_url,
        is_verified
      )
    `)
    .eq('is_public', true)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) throw error
  return data
}

export async function getCourseById(id: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('courses')
    .select(`
      *,
      lessons (
        id,
        title,
        description,
        duration,
        order_index,
        is_free
      ),
      profiles:user_id (
        id,
        username,
        display_name,
        avatar_url,
        is_verified
      )
    `)
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export async function getUserCourses(userId: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('user_id', userId)
    .eq('is_public', true)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function createCourse(course: Partial<Course>) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('courses')
    .insert([course])
    .select()

  if (error) throw error
  return data[0]
}

export async function updateCourse(id: string, updates: Partial<Course>) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('courses')
    .update(updates)
    .eq('id', id)
    .select()

  if (error) throw error
  return data[0]
}
