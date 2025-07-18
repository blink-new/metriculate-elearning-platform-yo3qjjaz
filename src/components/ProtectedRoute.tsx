import { ReactNode, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { AuthModal } from './auth/AuthModal'

interface ProtectedRouteProps {
  children: ReactNode
  fallback?: ReactNode
}

export const ProtectedRoute = ({ children, fallback }: ProtectedRouteProps) => {
  const { user, loading } = useAuth()
  const [authModalOpen, setAuthModalOpen] = useState(false)

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // If user is authenticated, show the protected content
  if (user) {
    return <>{children}</>
  }

  // If user is not authenticated, show auth modal automatically
  if (!authModalOpen) {
    setAuthModalOpen(true)
  }

  return (
    <>
      {fallback || (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-accent/5 to-background">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4">Sign In Required</h2>
            <p className="text-muted-foreground mb-6">
              Please sign in to access this content and start your learning journey with Metriculate.
            </p>
            <button 
              onClick={() => setAuthModalOpen(true)}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Sign In to Continue
            </button>
          </div>
        </div>
      )}
      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </>
  )
}