import { createClient } from '@/lib/supabase/server'
import type { Post } from '@/lib/types'

export async function getPosts(limit: number = 20, offset: number = 0) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('posts')
    .select(`
      id,
      content,
      image_url,
      likes_count,
      comments_count,
      shares_count,
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

export async function getPostById(id: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      comments (
        id,
        text,
        likes_count,
        created_at,
        profiles:user_id (
          username,
          display_name,
          avatar_url
        )
      ),
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

export async function getUserPosts(userId: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('user_id', userId)
    .eq('is_public', true)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function createPost(post: Partial<Post>) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('posts')
    .insert([post])
    .select()

  if (error) throw error
  return data[0]
}

export async function updatePost(id: string, updates: Partial<Post>) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('posts')
    .update(updates)
    .eq('id', id)
    .select()

  if (error) throw error
  return data[0]
}

export async function deletePost(id: string) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id)

  if (error) throw error
}
