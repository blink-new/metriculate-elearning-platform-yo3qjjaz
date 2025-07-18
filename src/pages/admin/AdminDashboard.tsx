import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  BookOpen, 
  Users, 
  FileText, 
  Brain, 
  CreditCard, 
  BarChart3,
  Plus,
  TrendingUp,
  Clock,
  Star
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { supabase } from '../../lib/supabase'

interface DashboardStats {
  totalSubjects: number
  totalTopics: number
  totalLessons: number
  totalQuizzes: number
  totalStudents: number
  recentActivity: any[]
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalSubjects: 0,
    totalTopics: 0,
    totalLessons: 0,
    totalQuizzes: 0,
    totalStudents: 0,
    recentActivity: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch content statistics
        const [subjectsRes, topicsRes, lessonsRes, quizzesRes] = await Promise.all([
          supabase.from('subjects').select('id', { count: 'exact' }),
          supabase.from('topics').select('id', { count: 'exact' }),
          supabase.from('lessons').select('id', { count: 'exact' }),
          supabase.from('quizzes').select('id', { count: 'exact' })
        ])

        setStats({
          totalSubjects: subjectsRes.count || 0,
          totalTopics: topicsRes.count || 0,
          totalLessons: lessonsRes.count || 0,
          totalQuizzes: quizzesRes.count || 0,
          totalStudents: 1250, // Mock data - would come from user analytics
          recentActivity: [] // Mock data - would come from activity logs
        })
      } catch (error) {
        console.error('Error fetching dashboard stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const quickActions = [
    {
      title: 'Add Subject',
      description: 'Create a new subject area',
      icon: BookOpen,
      href: '/admin/subjects/new',
      color: 'bg-blue-500'
    },
    {
      title: 'Add Topic',
      description: 'Create a new topic within a subject',
      icon: FileText,
      href: '/admin/topics/new',
      color: 'bg-green-500'
    },
    {
      title: 'Add Lesson',
      description: 'Create a new lesson with content',
      icon: Brain,
      href: '/admin/lessons/new',
      color: 'bg-purple-500'
    },
    {
      title: 'Add Quiz',
      description: 'Create a new quiz or assessment',
      icon: CreditCard,
      href: '/admin/quizzes/new',
      color: 'bg-orange-500'
    }
  ]

  const managementSections = [
    {
      title: 'Content Management',
      items: [
        { name: 'Subjects', count: stats.totalSubjects, href: '/admin/subjects', icon: BookOpen },
        { name: 'Topics', count: stats.totalTopics, href: '/admin/topics', icon: FileText },
        { name: 'Lessons', count: stats.totalLessons, href: '/admin/lessons', icon: Brain },
        { name: 'Quizzes', count: stats.totalQuizzes, href: '/admin/quizzes', icon: CreditCard }
      ]
    },
    {
      title: 'User Management',
      items: [
        { name: 'Students', count: stats.totalStudents, href: '/admin/students', icon: Users },
        { name: 'Admins', count: 3, href: '/admin/admins', icon: Users }
      ]
    }
  ]

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your e-learning platform content</p>
        </div>
        <Badge className="bg-green-100 text-green-800">
          <Clock className="h-3 w-3 mr-1" />
          Last updated: {new Date().toLocaleTimeString()}
        </Badge>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Subjects</p>
                <p className="text-3xl font-bold">{stats.totalSubjects}</p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Topics</p>
                <p className="text-3xl font-bold">{stats.totalTopics}</p>
              </div>
              <FileText className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Lessons</p>
                <p className="text-3xl font-bold">{stats.totalLessons}</p>
              </div>
              <Brain className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Quizzes</p>
                <p className="text-3xl font-bold">{stats.totalQuizzes}</p>
              </div>
              <CreditCard className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Students</p>
                <p className="text-3xl font-bold">{stats.totalStudents.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Quick Actions
          </CardTitle>
          <CardDescription>
            Quickly create new content for your platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <Link key={action.title} to={action.href}>
                  <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-4 text-center">
                      <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-semibold mb-1">{action.title}</h3>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Management Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {managementSections.map((section) => (
          <Card key={section.title}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {section.items.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link key={item.name} to={item.href}>
                      <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <Icon className="h-5 w-5 text-muted-foreground" />
                          <span className="font-medium">{item.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{item.count}</Badge>
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Recent Activity
          </CardTitle>
          <CardDescription>
            Latest changes and updates to your platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No recent activity to display</p>
            <p className="text-sm">Activity will appear here as you make changes</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminDashboard