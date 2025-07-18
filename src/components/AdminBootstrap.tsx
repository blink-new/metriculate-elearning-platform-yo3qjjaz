import { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Alert, AlertDescription } from './ui/alert'
import { Shield, UserPlus, AlertCircle, CheckCircle } from 'lucide-react'
import { bootstrapFirstAdmin } from '../utils/adminSetup'
import { useAuth } from '../hooks/useAuth'

export const AdminBootstrap = () => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  const handleBootstrap = async () => {
    if (!user) {
      setError('Please sign in first')
      return
    }

    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      await bootstrapFirstAdmin()
      setSuccess(true)
      // Refresh the page after a short delay to update admin status
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create admin')
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Shield className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <CardTitle>Admin Setup</CardTitle>
            <CardDescription>Please sign in to set up admin access</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Shield className="h-12 w-12 mx-auto mb-4 text-primary" />
          <CardTitle>Admin Bootstrap</CardTitle>
          <CardDescription>
            Set up the first admin user for this platform
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {success && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Admin access granted! Refreshing page...
              </AlertDescription>
            </Alert>
          )}

          <div className="text-sm text-muted-foreground space-y-2">
            <p><strong>Current User:</strong> {user.email}</p>
            <p>This will grant super admin privileges to your account.</p>
          </div>

          <Button 
            onClick={handleBootstrap} 
            disabled={loading || success}
            className="w-full"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            {loading ? 'Creating Admin...' : 'Make Me Admin'}
          </Button>

          <div className="text-xs text-muted-foreground text-center">
            <p>This should only be used during initial setup.</p>
            <p>Once an admin exists, use the regular admin panel.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}