import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, BookOpen, Calendar, BarChart3, Users, Heart, Library, Trophy, User, LogOut, Shield } from 'lucide-react'
import { Button } from './ui/button'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { useAuth } from '../hooks/useAuth'
import { useAdmin } from '../hooks/useAdmin'
import { AuthModal } from './auth/AuthModal'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const location = useLocation()
  const { user, profile, signOut, loading } = useAuth()
  const { isAdmin } = useAdmin()

  const navItems = [
    { icon: BookOpen, label: 'Subjects', path: '/subjects' },
    { icon: Calendar, label: 'Study Planner', path: '/planner' },
    { icon: BarChart3, label: 'Progress', path: '/progress' },
    { icon: Users, label: 'Community', path: '/community' },
    { icon: Library, label: 'Resources', path: '/resources' },
    { icon: Trophy, label: 'Achievements', path: '/achievements' },
  ]

  const NavLink = ({ item, mobile = false }: { item: typeof navItems[0], mobile?: boolean }) => {
    const isActive = location.pathname === item.path
    const Icon = item.icon
    
    const handleClick = (e: React.MouseEvent) => {
      if (!user) {
        e.preventDefault()
        setAuthModalOpen(true)
        if (mobile) setIsOpen(false)
        return
      }
      if (mobile) setIsOpen(false)
    }
    
    return (
      <Link
        to={item.path}
        onClick={handleClick}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
          isActive 
            ? 'bg-primary text-primary-foreground' 
            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
        } ${mobile ? 'w-full' : ''}`}
      >
        <Icon className="h-4 w-4" />
        <span className={mobile ? 'text-base' : 'text-sm font-medium'}>{item.label}</span>
      </Link>
    )
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Metriculate
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink key={item.path} item={item} />
            ))}
          </div>

          {/* Auth Section */}
          <div className="flex items-center gap-2">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={profile?.avatar_url || ''} alt={profile?.full_name || ''} />
                      <AvatarFallback>
                        {profile?.full_name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex flex-col space-y-1 p-2">
                    <p className="text-sm font-medium leading-none">{profile?.full_name || 'Student'}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    {profile?.grade && (
                      <p className="text-xs leading-none text-muted-foreground">Grade {profile.grade}</p>
                    )}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/admin">
                          <Shield className="mr-2 h-4 w-4" />
                          <span>Admin Portal</span>
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={() => setAuthModalOpen(true)} disabled={loading}>
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Metriculate
                  </span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <NavLink key={item.path} item={item} mobile />
                ))}
              </div>
            </SheetContent>
          </Sheet>

          <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
        </div>
      </div>
    </nav>
  )
}

export default Navigation