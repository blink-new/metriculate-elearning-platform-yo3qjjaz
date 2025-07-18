import { useAuth } from './useAuth'

export const useAdmin = () => {
  const { profile } = useAuth()
  
  const isAdmin = profile?.is_admin === true
  
  return {
    isAdmin,
    profile
  }
}