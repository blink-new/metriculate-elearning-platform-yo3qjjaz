import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Save, BookOpen } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Textarea } from '../../components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Label } from '../../components/ui/label'
import { Checkbox } from '../../components/ui/checkbox'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select'
import { supabase } from '../../lib/supabase'
import { toast } from '../../hooks/use-toast'
import { useAuth } from '../../hooks/useAuth'

interface SubjectFormData {
  name: string
  description: string
  icon: string
  color: string
  grade_levels: number[]
  is_active: boolean
}

const SubjectForm = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { user } = useAuth()
  const isEditing = Boolean(id)

  const [formData, setFormData] = useState<SubjectFormData>({
    name: '',
    description: '',
    icon: 'BookOpen',
    color: 'bg-blue-500',
    grade_levels: [],
    is_active: true
  })
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(isEditing)

  const colorOptions = [
    { value: 'bg-blue-500', label: 'Blue', color: '#3B82F6' },
    { value: 'bg-green-500', label: 'Green', color: '#10B981' },
    { value: 'bg-purple-500', label: 'Purple', color: '#8B5CF6' },
    { value: 'bg-orange-500', label: 'Orange', color: '#F97316' },
    { value: 'bg-red-500', label: 'Red', color: '#EF4444' },
    { value: 'bg-yellow-500', label: 'Yellow', color: '#EAB308' },
    { value: 'bg-pink-500', label: 'Pink', color: '#EC4899' },
    { value: 'bg-indigo-500', label: 'Indigo', color: '#6366F1' }
  ]

  const iconOptions = [
    'BookOpen', 'Calculator', 'Beaker', 'Globe', 'Users', 'Zap', 'Microscope', 'Palette'
  ]

  const gradeOptions = [8, 9, 10, 11, 12]

  useEffect(() => {
    if (isEditing && id) {
      fetchSubject()
    }
  }, [isEditing, id, fetchSubject])

  const fetchSubject = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('subjects')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error

      setFormData({
        name: data.name || '',
        description: data.description || '',
        icon: data.icon || 'BookOpen',
        color: data.color || 'bg-blue-500',
        grade_levels: data.grade_levels || [],
        is_active: data.is_active ?? true
      })
    } catch (error) {
      console.error('Error fetching subject:', error)
      toast({
        title: 'Error',
        description: 'Failed to fetch subject details',
        variant: 'destructive'
      })
      navigate('/admin/subjects')
    } finally {
      setInitialLoading(false)
    }
  }, [id, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim()) {
      toast({
        title: 'Error',
        description: 'Subject name is required',
        variant: 'destructive'
      })
      return
    }

    if (formData.grade_levels.length === 0) {
      toast({
        title: 'Error',
        description: 'Please select at least one grade level',
        variant: 'destructive'
      })
      return
    }

    setLoading(true)

    try {
      const subjectData = {
        ...formData,
        updated_at: new Date().toISOString(),
        ...(isEditing ? {} : { created_by: user?.id })
      }

      if (isEditing) {
        const { error } = await supabase
          .from('subjects')
          .update(subjectData)
          .eq('id', id)

        if (error) throw error

        toast({
          title: 'Success',
          description: 'Subject updated successfully'
        })
      } else {
        const { error } = await supabase
          .from('subjects')
          .insert([subjectData])

        if (error) throw error

        toast({
          title: 'Success',
          description: 'Subject created successfully'
        })
      }

      navigate('/admin/subjects')
    } catch (error) {
      console.error('Error saving subject:', error)
      toast({
        title: 'Error',
        description: `Failed to ${isEditing ? 'update' : 'create'} subject`,
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleGradeLevelChange = (grade: number, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        grade_levels: [...prev.grade_levels, grade].sort()
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        grade_levels: prev.grade_levels.filter(g => g !== grade)
      }))
    }
  }

  if (initialLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/admin/subjects')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">
            {isEditing ? 'Edit Subject' : 'Create New Subject'}
          </h1>
          <p className="text-muted-foreground">
            {isEditing ? 'Update subject information' : 'Add a new subject to your platform'}
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Enter the basic details for your subject
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Subject Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Mathematics, English, Science"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description of what this subject covers..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="icon">Icon</Label>
                <Select
                  value={formData.icon}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, icon: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map((icon) => (
                      <SelectItem key={icon} value={icon}>
                        {icon}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="color">Color Theme</Label>
                <Select
                  value={formData.color}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, color: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {colorOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: option.color }}
                          />
                          {option.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Grade Levels</CardTitle>
            <CardDescription>
              Select which grade levels this subject applies to
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-4">
              {gradeOptions.map((grade) => (
                <div key={grade} className="flex items-center space-x-2">
                  <Checkbox
                    id={`grade-${grade}`}
                    checked={formData.grade_levels.includes(grade)}
                    onCheckedChange={(checked) => handleGradeLevelChange(grade, checked as boolean)}
                  />
                  <Label htmlFor={`grade-${grade}`} className="text-sm font-medium">
                    Grade {grade}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status</CardTitle>
            <CardDescription>
              Control the visibility of this subject
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked as boolean }))}
              />
              <Label htmlFor="is_active" className="text-sm font-medium">
                Active (visible to students)
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>
              How this subject will appear to students
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <div className={`w-12 h-12 ${formData.color} rounded-lg flex items-center justify-center`}>
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">{formData.name || 'Subject Name'}</h3>
                <p className="text-sm text-muted-foreground">
                  {formData.description || 'Subject description will appear here'}
                </p>
                <div className="flex gap-1 mt-2">
                  {formData.grade_levels.map((grade) => (
                    <span key={grade} className="text-xs bg-muted px-2 py-1 rounded">
                      Grade {grade}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Button type="submit" disabled={loading}>
            <Save className="h-4 w-4 mr-2" />
            {loading ? 'Saving...' : isEditing ? 'Update Subject' : 'Create Subject'}
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate('/admin/subjects')}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SubjectForm