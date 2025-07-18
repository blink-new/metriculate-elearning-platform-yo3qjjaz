import { Link } from 'react-router-dom'
import { Calculator, BookOpen, Beaker, Globe, Users, Zap, Clock, Star, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Progress } from '../components/ui/progress'
import { Button } from '../components/ui/button'

const SubjectsPage = () => {
  const subjects = [
    { 
      id: 'mathematics', 
      name: 'Mathematics', 
      icon: Calculator, 
      color: 'bg-blue-500',
      description: 'Master mathematical concepts from basic arithmetic to advanced calculus',
      students: '2,400',
      lessons: 156,
      progress: 78,
      averageRating: 4.8,
      difficulty: 'Intermediate',
      estimatedTime: '45h',
      topics: ['Algebra', 'Geometry', 'Calculus', 'Statistics']
    },
    { 
      id: 'english', 
      name: 'English', 
      icon: BookOpen, 
      color: 'bg-green-500',
      description: 'Develop language skills, literature analysis, and communication',
      students: '3,100',
      lessons: 134,
      progress: 65,
      averageRating: 4.7,
      difficulty: 'Beginner',
      estimatedTime: '38h',
      topics: ['Grammar', 'Literature', 'Writing', 'Poetry']
    },
    { 
      id: 'science', 
      name: 'Science', 
      icon: Beaker, 
      color: 'bg-purple-500',
      description: 'Explore biology, chemistry, and physics concepts',
      students: '1,800',
      lessons: 189,
      progress: 82,
      averageRating: 4.9,
      difficulty: 'Advanced',
      estimatedTime: '52h',
      topics: ['Biology', 'Chemistry', 'Physics', 'Lab Work']
    },
    { 
      id: 'geography', 
      name: 'Geography', 
      icon: Globe, 
      color: 'bg-orange-500',
      description: 'Study physical and human geography of Namibia and the world',
      students: '1,200',
      lessons: 98,
      progress: 45,
      averageRating: 4.6,
      difficulty: 'Intermediate',
      estimatedTime: '32h',
      topics: ['Physical Geography', 'Human Geography', 'Namibian Geography', 'Climate']
    },
    { 
      id: 'history', 
      name: 'History', 
      icon: Users, 
      color: 'bg-red-500',
      description: 'Learn about Namibian and world history',
      students: '980',
      lessons: 112,
      progress: 23,
      averageRating: 4.5,
      difficulty: 'Intermediate',
      estimatedTime: '35h',
      topics: ['Namibian History', 'World Wars', 'Independence', 'Ancient Civilizations']
    },
    { 
      id: 'physics', 
      name: 'Physics', 
      icon: Zap, 
      color: 'bg-yellow-500',
      description: 'Understand the fundamental laws of nature and universe',
      students: '1,500',
      lessons: 145,
      progress: 67,
      averageRating: 4.8,
      difficulty: 'Advanced',
      estimatedTime: '48h',
      topics: ['Mechanics', 'Electricity', 'Waves', 'Modern Physics']
    }
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800'
      case 'Intermediate': return 'bg-blue-100 text-blue-800'
      case 'Advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500'
    if (progress >= 60) return 'bg-blue-500'
    if (progress >= 40) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">All Subjects</h1>
            <p className="text-muted-foreground text-lg">
              Choose from our comprehensive curriculum designed for Namibian high school students (Grades 8-12)
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <BookOpen className="h-6 w-6 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">6</div>
              <div className="text-sm text-muted-foreground">Subjects</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">10k+</div>
              <div className="text-sm text-muted-foreground">Students</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">834</div>
              <div className="text-sm text-muted-foreground">Total Lessons</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Star className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">4.7</div>
              <div className="text-sm text-muted-foreground">Avg Rating</div>
            </CardContent>
          </Card>
        </div>

        {/* Subjects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => {
            const Icon = subject.icon
            return (
              <Card key={subject.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 ${subject.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{subject.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={getDifficultyColor(subject.difficulty)}>
                            {subject.difficulty}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm text-muted-foreground">{subject.averageRating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="mt-3">{subject.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Progress */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Your Progress</span>
                      <span className="font-medium">{subject.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(subject.progress)}`}
                        style={{ width: `${subject.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Lessons</div>
                      <div className="font-semibold">{subject.lessons}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Students</div>
                      <div className="font-semibold">{subject.students}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Duration</div>
                      <div className="font-semibold">{subject.estimatedTime}</div>
                    </div>
                  </div>

                  {/* Topics */}
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Key Topics</div>
                    <div className="flex flex-wrap gap-1">
                      {subject.topics.slice(0, 3).map((topic, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                      {subject.topics.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{subject.topics.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link to={`/subject/${subject.id}`} className="block">
                    <Button className="w-full group-hover:bg-primary/90 transition-colors">
                      {subject.progress > 0 ? 'Continue Learning' : 'Start Learning'}
                      {subject.progress > 0 && (
                        <TrendingUp className="ml-2 h-4 w-4" />
                      )}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/5 to-accent/5">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Excel in Your Studies?</h3>
              <p className="text-muted-foreground mb-6">
                Join thousands of Namibian students who are already improving their grades with Metriculate
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg">
                  Start Free Trial
                </Button>
                <Button variant="outline" size="lg">
                  View Study Plans
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default SubjectsPage