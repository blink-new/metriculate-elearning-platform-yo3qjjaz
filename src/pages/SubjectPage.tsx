import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Play, FileText, Brain, Clock, Users, Star, CheckCircle, Lock } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Progress } from '../components/ui/progress'
import { supabase } from '../lib/supabase'

const SubjectPage = () => {
  const { subjectId } = useParams()
  const [selectedGrade, setSelectedGrade] = useState('10')
  const [subject, setSubject] = useState<any>(null)
  const [topics, setTopics] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSubjectData = async () => {
      try {
        // Fetch subject details
        const { data: subjectData, error: subjectError } = await supabase
          .from('subjects')
          .select('*')
          .eq('id', subjectId)
          .single()

        if (subjectError) throw subjectError

        setSubject(subjectData)

        // Fetch topics for this subject
        const { data: topicsData, error: topicsError } = await supabase
          .from('topics')
          .select(`
            *,
            lessons:lessons(count)
          `)
          .eq('subject_id', subjectId)
          .eq('is_active', true)
          .order('order_index', { ascending: true })

        if (topicsError) throw topicsError

        setTopics(topicsData || [])
      } catch (error) {
        console.error('Error fetching subject data:', error)
      } finally {
        setLoading(false)
      }
    }

    if (subjectId) {
      fetchSubjectData()
    }
  }, [subjectId])

  const gradeTopics = {
    '8': [
      { id: 1, title: 'Number Systems', lessons: 12, duration: '2h 30m', difficulty: 'Beginner', completed: true },
      { id: 2, title: 'Basic Algebra', lessons: 15, duration: '3h 15m', difficulty: 'Beginner', completed: true },
      { id: 3, title: 'Geometry Basics', lessons: 10, duration: '2h 45m', difficulty: 'Beginner', completed: false },
      { id: 4, title: 'Data Handling', lessons: 8, duration: '1h 50m', difficulty: 'Beginner', completed: false, locked: true }
    ],
    '9': [
      { id: 5, title: 'Linear Equations', lessons: 18, duration: '4h 20m', difficulty: 'Intermediate', completed: false },
      { id: 6, title: 'Quadratic Functions', lessons: 22, duration: '5h 10m', difficulty: 'Intermediate', completed: false },
      { id: 7, title: 'Trigonometry Intro', lessons: 16, duration: '3h 45m', difficulty: 'Intermediate', completed: false, locked: true }
    ],
    '10': [
      { id: 8, title: 'Advanced Algebra', lessons: 25, duration: '6h 30m', difficulty: 'Intermediate', completed: true },
      { id: 9, title: 'Coordinate Geometry', lessons: 20, duration: '5h 15m', difficulty: 'Intermediate', completed: false },
      { id: 10, title: 'Statistics', lessons: 14, duration: '3h 20m', difficulty: 'Intermediate', completed: false },
      { id: 11, title: 'Probability', lessons: 12, duration: '2h 55m', difficulty: 'Advanced', completed: false, locked: true }
    ],
    '11': [
      { id: 12, title: 'Calculus Basics', lessons: 30, duration: '8h 45m', difficulty: 'Advanced', completed: false },
      { id: 13, title: 'Advanced Trigonometry', lessons: 24, duration: '6h 20m', difficulty: 'Advanced', completed: false, locked: true }
    ],
    '12': [
      { id: 14, title: 'Advanced Calculus', lessons: 35, duration: '10h 30m', difficulty: 'Expert', completed: false, locked: true },
      { id: 15, title: 'Mathematical Modeling', lessons: 28, duration: '8h 15m', difficulty: 'Expert', completed: false, locked: true }
    ]
  }

  // Filter topics by selected grade
  const filteredTopics = topics.filter(topic => topic.grade_level === parseInt(selectedGrade))

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (!subject) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Subject Not Found</h1>
          <Link to="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  const totalLessons = topics.reduce((sum, topic) => sum + (topic.lessons?.[0]?.count || 0), 0)
  const completedLessons = 0 // This would come from user progress data
  const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className={`w-12 h-12 ${subject.color || 'bg-blue-500'} rounded-lg flex items-center justify-center`}>
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{subject.name}</h1>
              <p className="text-muted-foreground">{subject.description}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{totalLessons}</div>
                <div className="text-sm text-muted-foreground">Total Lessons</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{completedLessons}</div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{topics.length}</div>
                <div className="text-sm text-muted-foreground">Topics</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{subject.grade_levels?.length || 0}</div>
                <div className="text-sm text-muted-foreground">Grade Levels</div>
              </CardContent>
            </Card>
          </div>

          {/* Progress */}
          <Card className="mt-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Your Progress</span>
                <span className="text-sm text-muted-foreground">{Math.round(progressPercentage)}% Complete</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="lessons" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="lessons">Lessons</TabsTrigger>
            <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
            <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>

          <TabsContent value="lessons" className="mt-6">
            {/* Grade Selector */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Select Grade Level</h3>
              <div className="flex gap-2 flex-wrap">
                {subject.grade_levels?.map((grade: number) => (
                  <Button
                    key={grade}
                    variant={selectedGrade === grade.toString() ? 'default' : 'outline'}
                    onClick={() => setSelectedGrade(grade.toString())}
                    className="min-w-[60px]"
                  >
                    Grade {grade}
                  </Button>
                ))}
              </div>
            </div>

            {/* Topics */}
            <div className="grid gap-4">
              <h3 className="text-xl font-semibold">Grade {selectedGrade} Topics</h3>
              {filteredTopics.length > 0 ? (
                filteredTopics.map((topic) => (
                  <Card key={topic.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                            <Play className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold">{topic.name}</h4>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <FileText className="h-4 w-4" />
                                {topic.lessons?.[0]?.count || 0} lessons
                              </span>
                              <Badge variant="secondary">
                                Grade {topic.grade_level}
                              </Badge>
                            </div>
                            {topic.description && (
                              <p className="text-sm text-muted-foreground mt-1">{topic.description}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button>
                            Start Learning
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No topics available</h3>
                  <p className="text-muted-foreground">
                    No topics have been created for Grade {selectedGrade} yet.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="quizzes" className="mt-6">
            <div className="text-center py-12">
              <Brain className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Practice Quizzes</h3>
              <p className="text-muted-foreground mb-6">Test your knowledge with interactive quizzes</p>
              <Button>Coming Soon</Button>
            </div>
          </TabsContent>

          <TabsContent value="flashcards" className="mt-6">
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Study Flashcards</h3>
              <p className="text-muted-foreground mb-6">Review key concepts with digital flashcards</p>
              <Button>Coming Soon</Button>
            </div>
          </TabsContent>

          <TabsContent value="notes" className="mt-6">
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Study Notes</h3>
              <p className="text-muted-foreground mb-6">Access comprehensive study materials and notes</p>
              <Button>Coming Soon</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default SubjectPage