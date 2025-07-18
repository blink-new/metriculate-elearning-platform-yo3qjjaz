import { supabase } from './supabase'

export const uploadFile = async (
  file: File,
  bucket: string,
  path: string
): Promise<{ data: { path: string; publicUrl: string } | null; error: Error | null }> => {
  try {
    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      throw error
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path)

    return {
      data: {
        path: data.path,
        publicUrl
      },
      error: null
    }
  } catch (error) {
    return {
      data: null,
      error: error as Error
    }
  }
}

export const deleteFile = async (
  bucket: string,
  path: string
): Promise<{ error: Error | null }> => {
  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path])

    if (error) {
      throw error
    }

    return { error: null }
  } catch (error) {
    return { error: error as Error }
  }
}

export const getPublicUrl = (bucket: string, path: string): string => {
  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(path)

  return publicUrl
}

// Storage buckets
export const STORAGE_BUCKETS = {
  AVATARS: 'avatars',
  LESSON_VIDEOS: 'lesson-videos',
  LESSON_MATERIALS: 'lesson-materials',
  USER_UPLOADS: 'user-uploads'
} as const