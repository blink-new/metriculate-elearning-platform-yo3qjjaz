import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff,
  BookOpen,
  Users,
  FileText
} from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../../components/ui/table'
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../../components/ui/alert-dialog'
import { supabase } from '../../lib/supabase'
import { toast } from '../../hooks/use-toast'

interface Subject {
  id: string
  name: string
  description: string | null
  icon: string | null
  color: string | null
  grade_levels: number[]
  is_active: boolean
  created_at: string
  updated_at: string
  topics_count?: number
  lessons_count?: number
}

const SubjectsManagement = () => {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    fetchSubjects()
  }, [])

  const fetchSubjects = async () => {
    try {
      const { data, error } = await supabase
        .from('subjects')
        .select(`
          *,
          topics:topics(count),
          lessons:lessons(count)
        `)
        .order('created_at', { ascending: false })

      if (error) throw error

      // Process the data to include counts
      const processedData = data?.map(subject => ({
        ...subject,
        topics_count: subject.topics?.[0]?.count || 0,
        lessons_count: subject.lessons?.[0]?.count || 0
      })) || []

      setSubjects(processedData)
    } catch (error) {
      console.error('Error fetching subjects:', error)
      toast({
        title: 'Error',
        description: 'Failed to fetch subjects',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  const toggleSubjectStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('subjects')
        .update({ 
          is_active: !currentStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)

      if (error) throw error

      setSubjects(subjects.map(subject => 
        subject.id === id 
          ? { ...subject, is_active: !currentStatus }
          : subject
      ))

      toast({
        title: 'Success',
        description: `Subject ${!currentStatus ? 'activated' : 'deactivated'} successfully`
      })
    } catch (error) {
      console.error('Error updating subject status:', error)
      toast({
        title: 'Error',
        description: 'Failed to update subject status',
        variant: 'destructive'
      })
    }
  }

  const deleteSubject = async (id: string) => {
    setDeletingId(id)
    try {
      const { error } = await supabase
        .from('subjects')
        .delete()
        .eq('id', id)

      if (error) throw error

      setSubjects(subjects.filter(subject => subject.id !== id))
      toast({
        title: 'Success',
        description: 'Subject deleted successfully'
      })
    } catch (error) {
      console.error('Error deleting subject:', error)
      toast({
        title: 'Error',
        description: 'Failed to delete subject',
        variant: 'destructive'
      })
    } finally {
      setDeletingId(null)
    }
  }

  const filteredSubjects = subjects.filter(subject =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.description?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Subjects Management</h1>
          <p className="text-muted-foreground">Manage your platform's subjects and curriculum</p>
        </div>
        <Link to="/admin/subjects/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Subject
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Subjects</p>
                <p className="text-3xl font-bold">{subjects.length}</p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Subjects</p>
                <p className="text-3xl font-bold">{subjects.filter(s => s.is_active).length}</p>
              </div>
              <Eye className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Topics</p>
                <p className="text-3xl font-bold">
                  {subjects.reduce((sum, subject) => sum + (subject.topics_count || 0), 0)}
                </p>
              </div>
              <FileText className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>All Subjects</CardTitle>
          <CardDescription>
            Manage your subjects, topics, and curriculum structure
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search subjects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Subjects Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject</TableHead>
                  <TableHead>Grade Levels</TableHead>
                  <TableHead>Topics</TableHead>
                  <TableHead>Lessons</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubjects.map((subject) => (
                  <TableRow key={subject.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${subject.color || 'bg-gray-500'} rounded-lg flex items-center justify-center`}>
                          <BookOpen className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium">{subject.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {subject.description || 'No description'}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {subject.grade_levels?.map((grade) => (
                          <Badge key={grade} variant="outline" className="text-xs">
                            Grade {grade}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span>{subject.topics_count || 0}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{subject.lessons_count || 0}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={subject.is_active ? 'default' : 'secondary'}>
                        {subject.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(subject.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleSubjectStatus(subject.id, subject.is_active)}
                        >
                          {subject.is_active ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                        <Link to={`/admin/subjects/${subject.id}/edit`}>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Subject</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{subject.name}"? This will also delete all associated topics and lessons. This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteSubject(subject.id)}
                                className="bg-red-600 hover:bg-red-700"
                                disabled={deletingId === subject.id}
                              >
                                {deletingId === subject.id ? 'Deleting...' : 'Delete'}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredSubjects.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No subjects found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? 'No subjects match your search criteria.' : 'Get started by creating your first subject.'}
              </p>
              <Link to="/admin/subjects/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Subject
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default SubjectsManagement