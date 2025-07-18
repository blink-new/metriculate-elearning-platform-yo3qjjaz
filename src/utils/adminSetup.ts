import { supabase } from '../lib/supabase'

/**
 * Make the current user an admin (for testing purposes)
 * This should only be used during development
 */
export const makeCurrentUserAdmin = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      throw new Error('No user logged in')
    }

    // Check if user is already an admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', user.id)
      .single()

    if (profile?.is_admin) {
      console.log('User is already an admin')
      return profile
    }

    // Update profile to make user admin
    const { data, error } = await supabase
      .from('profiles')
      .update({ is_admin: true })
      .eq('id', user.id)
      .select()
      .single()

    if (error) throw error

    console.log('User has been made an admin:', data)
    return data
  } catch (error) {
    console.error('Error making user admin:', error)
    throw error
  }
}

/**
 * Remove admin role from current user
 */
export const removeCurrentUserAdmin = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      throw new Error('No user logged in')
    }

    const { error } = await supabase
      .from('profiles')
      .update({ is_admin: false })
      .eq('id', user.id)

    if (error) throw error

    console.log('Admin role removed from user')
  } catch (error) {
    console.error('Error removing admin role:', error)
    throw error
  }
}

/**
 * Bootstrap the first admin user - can be called from console
 * This creates the first admin without requiring existing admin permissions
 */
export const bootstrapFirstAdmin = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      throw new Error('No user logged in. Please sign in first.')
    }

    // Check if any admin exists
    const { data: existingAdmins } = await supabase
      .from('profiles')
      .select('id')
      .eq('is_admin', true)
      .limit(1)

    if (existingAdmins && existingAdmins.length > 0) {
      throw new Error('Admin users already exist. Use the regular admin creation process.')
    }

    // Create the first admin
    const { data, error } = await supabase
      .from('profiles')
      .update({ is_admin: true })
      .eq('id', user.id)
      .select()
      .single()

    if (error) throw error

    console.log('First admin created successfully:', data)
    return data
  } catch (error) {
    console.error('Error bootstrapping first admin:', error)
    throw error
  }
}

// Make functions available globally for console access
if (typeof window !== 'undefined') {
  (window as any).adminSetup = {
    makeCurrentUserAdmin,
    removeCurrentUserAdmin,
    bootstrapFirstAdmin
  }
}