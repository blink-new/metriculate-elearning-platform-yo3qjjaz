import { useState } from 'react'
import { BarChart3, TrendingUp, Clock, Target, Award, Calendar, BookOpen, Brain, Zap, Trophy } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Progress } from '../components/ui/progress'
import { Badge } from '../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'

const ProgressDashboardPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week')

  // Mock data for progress tracking
  const overallStats = {
    totalStudyTime: 45.5, // hours
    completedLessons: 127,
    averageScore: 87,
    currentStreak: 12,
    totalBadges: 8,
    rank: 'Advanced Learner'
  }

  const subjectProgress = [
    { 
      subject: 'Mathematics', 
      progress: 78, 
      timeSpent: 15.2, 
      lessonsCompleted: 45, 
      totalLessons: 58, 
      averageScore: 89,
      color: 'bg-blue-500',
      trend: '+5%'
    },
    { 
      subject: 'English', 
      progress: 65, 
      timeSpent: 12.8, 
      lessonsCompleted: 32, 
      totalLessons: 49, 
      averageScore: 85,
      color: 'bg-green-500',
      trend: '+3%'
    },
    { 
      subject: 'Science', 
      progress: 82, 
      timeSpent: 18.5, 
      lessonsCompleted: 38, 
      totalLessons: 46, 
      averageScore: 91,
      color: 'bg-purple-500',
      trend: '+8%'
    },
    { 
      subject: 'History', 
      progress: 45, 
      timeSpent: 8.2, 
      lessonsCompleted: 18, 
      totalLessons: 40, 
      averageScore: 82,
      color: 'bg-red-500',
      trend: '+2%'
    },
    { 
      subject: 'Geography', 
      progress: 71, 
      timeSpent: 11.3, 
      lessonsCompleted: 25, 
      totalLessons: 35, 
      averageScore: 88,
      color: 'bg-orange-500',
      trend: '+6%'
    }
  ]

  const weeklyActivity = [
    { day: 'Mon', hours: 2.5, lessons: 3, score: 85 },
    { day: 'Tue', hours: 3.2, lessons: 4, score: 92 },
    { day: 'Wed', hours: 1.8, lessons: 2, score: 78 },
    { day: 'Thu', hours: 2.9, lessons: 3, score: 89 },
    { day: 'Fri', hours: 2.1, lessons: 2, score: 87 },
    { day: 'Sat', hours: 3.5, lessons: 5, score: 94 },
    { day: 'Sun', hours: 1.2, lessons: 1, score: 82 }
  ]

  const achievements = [
    { id: 1, title: 'Math Master', description: 'Completed 50 math lessons', icon: '🧮', earned: true, date: '2024-01-15' },
    { id: 2, title: 'Study Streak', description: '7 days of continuous learning', icon: '🔥', earned: true, date: '2024-01-18' },
    { id: 3, title: 'Quiz Champion', description: 'Scored 90%+ on 10 quizzes', icon: '🏆', earned: true, date: '2024-01-12' },
    { id: 4, title: 'Science Explorer', description: 'Complete all Grade 10 Science', icon: '🔬', earned: false, progress: 82 },
    { id: 5, title: 'Speed Learner', description: 'Complete 5 lessons in one day', icon: '⚡', earned: true, date: '2024-01-16' },
    { id: 6, title: 'Perfect Score', description: 'Get 100% on any quiz', icon: '💯', earned: false, progress: 0 },
    { id: 7, title: 'Consistency King', description: '30 days study streak', icon: '👑', earned: false, progress: 40 },
    { id: 8, title: 'All Rounder', description: 'Pass all subjects this term', icon: '🌟', earned: false, progress: 65 }
  ]

  const recentQuizzes = [
    { subject: 'Mathematics', topic: 'Quadratic Equations', score: 94, date: '2024-01-18', questions: 15 },
    { subject: 'Science', topic: 'Chemical Bonding', score: 87, date: '2024-01-17', questions: 20 },
    { subject: 'English', topic: 'Poetry Analysis', score: 91, date: '2024-01-16', questions: 12 },
    { subject: 'Geography', topic: 'Climate Zones', score: 89, date: '2024-01-15', questions: 18 },
    { subject: 'History', topic: 'World War II', score: 83, date: '2024-01-14', questions: 16 }
  ]

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-blue-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBadge = (score: number) => {
    if (score >= 90) return 'bg-green-100 text-green-800'
    if (score >= 80) return 'bg-blue-100 text-blue-800'
    if (score >= 70) return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Progress Dashboard</h1>
              <p className="text-muted-foreground">Track your learning journey and celebrate achievements</p>
            </div>
            <div className="flex items-center gap-4">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="term">This Term</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="subjects">Subjects</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              <Card>
                <CardContent className="p-4 text-center">
                  <Clock className="h-6 w-6 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold">{overallStats.totalStudyTime}h</div>
                  <div className="text-xs text-muted-foreground">Study Time</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <BookOpen className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{overallStats.completedLessons}</div>
                  <div className="text-xs text-muted-foreground">Lessons</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Target className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{overallStats.averageScore}%</div>
                  <div className="text-xs text-muted-foreground">Avg Score</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Zap className="h-6 w-6 text-orange-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{overallStats.currentStreak}</div>
                  <div className="text-xs text-muted-foreground">Day Streak</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Award className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{overallStats.totalBadges}</div>
                  <div className="text-xs text-muted-foreground">Badges</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Trophy className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
                  <div className="text-sm font-bold">{overallStats.rank}</div>
                  <div className="text-xs text-muted-foreground">Current Rank</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Weekly Activity Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Weekly Activity
                  </CardTitle>
                  <CardDescription>Your study activity over the past week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {weeklyActivity.map((day, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="w-8 text-sm font-medium">{day.day}</span>
                          <div className="flex-1 bg-muted rounded-full h-2 w-32">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: `${(day.hours / 4) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-muted-foreground">{day.hours}h</span>
                          <span className="text-muted-foreground">{day.lessons} lessons</span>
                          <Badge className={getScoreBadge(day.score)}>{day.score}%</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Quiz Results */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    Recent Quiz Results
                  </CardTitle>
                  <CardDescription>Your latest quiz performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentQuizzes.map((quiz, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                        <div>
                          <h4 className="font-medium text-sm">{quiz.topic}</h4>
                          <p className="text-xs text-muted-foreground">{quiz.subject} • {quiz.questions} questions</p>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${getScoreColor(quiz.score)}`}>{quiz.score}%</div>
                          <div className="text-xs text-muted-foreground">{quiz.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="subjects" className="mt-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Subject Progress Overview</CardTitle>
                  <CardDescription>Detailed breakdown of your progress in each subject</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {subjectProgress.map((subject, index) => (
                      <div key={index} className="p-4 rounded-lg border">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 ${subject.color} rounded-lg flex items-center justify-center`}>
                              <BookOpen className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{subject.subject}</h3>
                              <p className="text-sm text-muted-foreground">
                                {subject.lessonsCompleted} of {subject.totalLessons} lessons completed
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-2">
                              <span className="text-2xl font-bold">{subject.progress}%</span>
                              <Badge variant="outline" className="text-green-600">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                {subject.trend}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        <Progress value={subject.progress} className="h-2 mb-4" />
                        
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Time Spent</span>
                            <div className="font-semibold">{subject.timeSpent}h</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Average Score</span>
                            <div className={`font-semibold ${getScoreColor(subject.averageScore)}`}>
                              {subject.averageScore}%
                            </div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Completion</span>
                            <div className="font-semibold">{Math.round((subject.lessonsCompleted / subject.totalLessons) * 100)}%</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement) => (
                <Card key={achievement.id} className={`relative ${achievement.earned ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200' : 'opacity-75'}`}>
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{achievement.icon}</div>
                    <h3 className="font-semibold mb-2">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{achievement.description}</p>
                    
                    {achievement.earned ? (
                      <div>
                        <Badge className="bg-green-100 text-green-800 mb-2">Earned</Badge>
                        <p className="text-xs text-muted-foreground">Achieved on {achievement.date}</p>
                      </div>
                    ) : (
                      <div>
                        <div className="mb-2">
                          <Progress value={achievement.progress || 0} className="h-2" />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {achievement.progress || 0}% complete
                        </p>
                      </div>
                    )}
                  </CardContent>
                  {achievement.earned && (
                    <div className="absolute top-2 right-2">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <Award className="h-3 w-3 text-white" />
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Learning Patterns</CardTitle>
                  <CardDescription>Insights into your study habits</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Most Active Time</span>
                        <span className="font-semibold">2:00 PM - 4:00 PM</span>
                      </div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Favorite Subject</span>
                        <span className="font-semibold">Science</span>
                      </div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Average Session</span>
                        <span className="font-semibold">45 minutes</span>
                      </div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Best Day</span>
                        <span className="font-semibold">Saturday</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Trends</CardTitle>
                  <CardDescription>How you're improving over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Quiz Score Trend</span>
                        <span className="text-green-600 font-semibold">↗ +12% this month</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Study Consistency</span>
                        <span className="text-blue-600 font-semibold">↗ +8% this month</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Lesson Completion Rate</span>
                        <span className="text-purple-600 font-semibold">↗ +15% this month</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default ProgressDashboardPage