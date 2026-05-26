import { createClient } from '@/lib/supabase/server'
import type { Video } from '@/lib/types'

export async function getVideos(limit: number = 20, offset: number = 0) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('videos')
    .select(`
      id,
      title,
      description,
      thumbnail_url,
      video_url,
      duration,
      views_count,
      likes_count,
      comments_count,
      category,
      created_at,
      user_id,
      profiles:user_id (
        id,
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

export async function getVideoById(id: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('videos')
    .select(`
      *,
      profiles:user_id (
        id,
        username,
        display_name,
        avatar_url,
        followers_count,
        is_verified
      )
    `)
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export async function getUserVideos(userId: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .eq('user_id', userId)
    .eq('is_public', true)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function createVideo(video: Partial<Video>) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('videos')
    .insert([video])
    .select()

  if (error) throw error
  return data[0]
}

export async function updateVideo(id: string, updates: Partial<Video>) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('videos')
    .update(updates)
    .eq('id', id)
    .select()

  if (error) throw error
  return data[0]
}

export async function incrementVideoViews(id: string) {
  const supabase = await createClient()
  
  const { error } = await supabase.rpc('increment_video_views', {
    video_id: id,
  })

  if (error) throw error
}
