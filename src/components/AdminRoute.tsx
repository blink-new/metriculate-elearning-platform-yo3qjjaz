import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAdmin } from '../hooks/useAdmin'
import { useAuth } from '../hooks/useAuth'
import { Card, CardContent } from './ui/card'
import { Loader2, Shield } from 'lucide-react'

interface AdminRouteProps {
  children: ReactNode
  requiredPermission?: string
}

export const AdminRoute = ({ children, requiredPermission }: AdminRouteProps) => {
  const { isAdmin } = useAdmin()
  const { loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="p-8 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
            <h3 className="text-lg font-semibold mb-2">Checking Access</h3>
            <p className="text-muted-foreground">Verifying your admin permissions...</p>
          </CardContent>
        </Card>
      </div>
    )
  }



  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="p-8 text-center">
            <Shield className="h-16 w-16 mx-auto mb-4 text-red-500" />
            <h3 className="text-xl font-semibold mb-2">Access Denied</h3>
            <p className="text-muted-foreground mb-4">
              You don't have admin access to this portal.
            </p>
            <p className="text-sm text-muted-foreground">
              Contact your administrator if you believe this is an error.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Note: requiredPermission is ignored since we're using simple is_admin boolean

  return <>{children}</>
}