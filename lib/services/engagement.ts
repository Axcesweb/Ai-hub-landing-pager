import { createClient } from '@/lib/supabase/server'

export async function likeContent(userId: string, contentType: string, contentId: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('likes')
    .insert([{ user_id: userId, content_type: contentType, content_id: contentId }])
    .select()

  if (error) throw error
  return data[0]
}

export async function unlikeContent(userId: string, contentType: string, contentId: string) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('likes')
    .delete()
    .eq('user_id', userId)
    .eq('content_type', contentType)
    .eq('content_id', contentId)

  if (error) throw error
}

export async function followUser(followerId: string, followingId: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('follows')
    .insert([{ follower_id: followerId, following_id: followingId }])
    .select()

  if (error) throw error
  return data[0]
}

export async function unfollowUser(followerId: string, followingId: string) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('follows')
    .delete()
    .eq('follower_id', followerId)
    .eq('following_id', followingId)

  if (error) throw error
}

export async function getFollowers(userId: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('follows')
    .select('follower_id, profiles:follower_id (id, username, display_name, avatar_url)')
    .eq('following_id', userId)

  if (error) throw error
  return data
}

export async function getFollowing(userId: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('follows')
    .select('following_id, profiles:following_id (id, username, display_name, avatar_url)')
    .eq('follower_id', userId)

  if (error) throw error
  return data
}

export async function isFollowing(followerId: string, followingId: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('follows')
    .select('id')
    .eq('follower_id', followerId)
    .eq('following_id', followingId)
    .single()

  if (error && error.code === 'PGRST116') return false
  if (error) throw error
  return !!data
}

export async function createComment(userId: string, contentType: string, contentId: string, text: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('comments')
    .insert([{ user_id: userId, content_type: contentType, content_id: contentId, text }])
    .select()

  if (error) throw error
  return data[0]
}
