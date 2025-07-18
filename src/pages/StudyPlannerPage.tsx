import { useState } from 'react'
import { Calendar, Clock, Target, Plus, CheckCircle, AlertCircle, Flame, Trophy } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Progress } from '../components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Textarea } from '../components/ui/textarea'

const StudyPlannerPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [studyStreak, setStudyStreak] = useState(7)
  const [weeklyGoal, setWeeklyGoal] = useState(15) // hours
  const [weeklyProgress, setWeeklyProgress] = useState(8.5) // hours completed

  // Mock data for study sessions and goals
  const todaysSessions = [
    { id: 1, subject: 'Mathematics', topic: 'Quadratic Equations', time: '09:00', duration: 60, completed: true },
    { id: 2, subject: 'English', topic: 'Poetry Analysis', time: '14:00', duration: 45, completed: false },
    { id: 3, subject: 'Science', topic: 'Chemical Reactions', time: '16:30', duration: 90, completed: false }
  ]

  const upcomingTasks = [
    { id: 1, title: 'Math Assignment - Chapter 5', subject: 'Mathematics', dueDate: '2024-01-20', priority: 'high' },
    { id: 2, title: 'English Essay Draft', subject: 'English', dueDate: '2024-01-22', priority: 'medium' },
    { id: 3, title: 'Science Lab Report', subject: 'Science', dueDate: '2024-01-25', priority: 'low' },
    { id: 4, title: 'History Research Project', subject: 'History', dueDate: '2024-01-28', priority: 'medium' }
  ]

  const weeklySchedule = [
    { day: 'Monday', sessions: 2, hours: 2.5, completed: true },
    { day: 'Tuesday', sessions: 3, hours: 3.0, completed: true },
    { day: 'Wednesday', sessions: 2, hours: 2.0, completed: true },
    { day: 'Thursday', sessions: 1, hours: 1.0, completed: true },
    { day: 'Friday', sessions: 0, hours: 0, completed: false },
    { day: 'Saturday', sessions: 0, hours: 0, completed: false },
    { day: 'Sunday', sessions: 0, hours: 0, completed: false }
  ]

  const studyGoals = [
    { id: 1, title: 'Complete Math Chapter 5', progress: 75, target: '2024-01-20', subject: 'Mathematics' },
    { id: 2, title: 'Finish English Poetry Unit', progress: 40, target: '2024-01-25', subject: 'English' },
    { id: 3, title: 'Master Chemical Equations', progress: 60, target: '2024-01-30', subject: 'Science' }
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Study Planner</h1>
              <p className="text-muted-foreground">Plan your studies, track your progress, and achieve your goals</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Study Session
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Schedule New Study Session</DialogTitle>
                  <DialogDescription>Plan your next study session with specific goals and timing</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="subject" className="text-right">Subject</Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mathematics">Mathematics</SelectItem>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="science">Science</SelectItem>
                        <SelectItem value="history">History</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="topic" className="text-right">Topic</Label>
                    <Input id="topic" placeholder="Enter topic" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="time" className="text-right">Time</Label>
                    <Input id="time" type="time" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="duration" className="text-right">Duration</Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="45">45 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="90">1.5 hours</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="notes" className="text-right">Notes</Label>
                    <Textarea id="notes" placeholder="Add any notes or goals" className="col-span-3" />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Schedule Session</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="today" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="week">This Week</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="mt-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Today's Overview */}
              <div className="lg:col-span-2 space-y-6">
                {/* Study Streak & Stats */}
                <div className="grid md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Flame className="h-6 w-6 text-orange-500" />
                        <span className="text-2xl font-bold text-orange-500">{studyStreak}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Day Streak</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="text-2xl font-bold text-primary mb-2">{weeklyProgress}h</div>
                      <p className="text-sm text-muted-foreground">This Week</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="text-2xl font-bold text-green-600 mb-2">3</div>
                      <p className="text-sm text-muted-foreground">Sessions Today</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Today's Sessions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Today's Study Sessions
                    </CardTitle>
                    <CardDescription>Your scheduled learning activities for today</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {todaysSessions.map((session) => (
                        <div key={session.id} className={`flex items-center justify-between p-4 rounded-lg border ${session.completed ? 'bg-green-50 border-green-200' : 'bg-background'}`}>
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${session.completed ? 'bg-green-500' : 'bg-primary'}`}>
                              {session.completed ? (
                                <CheckCircle className="h-5 w-5 text-white" />
                              ) : (
                                <Clock className="h-5 w-5 text-white" />
                              )}
                            </div>
                            <div>
                              <h4 className="font-semibold">{session.topic}</h4>
                              <p className="text-sm text-muted-foreground">{session.subject} • {session.time} • {session.duration} min</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {session.completed && (
                              <Badge className="bg-green-100 text-green-800">Completed</Badge>
                            )}
                            <Button variant={session.completed ? "outline" : "default"} size="sm">
                              {session.completed ? 'Review' : 'Start'}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Weekly Progress */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Weekly Goal
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{weeklyProgress}h / {weeklyGoal}h</span>
                      </div>
                      <Progress value={(weeklyProgress / weeklyGoal) * 100} className="h-2" />
                      <p className="text-sm text-muted-foreground">
                        {weeklyGoal - weeklyProgress} hours remaining to reach your weekly goal
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Upcoming Tasks */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5" />
                      Upcoming Tasks
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {upcomingTasks.slice(0, 4).map((task) => (
                        <div key={task.id} className="flex items-start gap-3 p-3 rounded-lg border">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm truncate">{task.title}</h4>
                            <p className="text-xs text-muted-foreground">{task.subject}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className={`text-xs ${getPriorityColor(task.priority)}`}>
                                {task.priority}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{task.dueDate}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="week" className="mt-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Overview</CardTitle>
                  <CardDescription>Your study activity for this week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {weeklySchedule.map((day, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${day.completed ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                          <span className="font-medium">{day.day}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{day.sessions} sessions</span>
                          <span>{day.hours}h</span>
                          {day.completed && <CheckCircle className="h-4 w-4 text-green-500" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Study Statistics</CardTitle>
                  <CardDescription>Your learning metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Daily Average</span>
                        <span>1.2h</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Consistency Score</span>
                        <span>85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Goal Achievement</span>
                        <span>70%</span>
                      </div>
                      <Progress value={70} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="goals" className="mt-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    Active Goals
                  </CardTitle>
                  <CardDescription>Track your learning objectives</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {studyGoals.map((goal) => (
                      <div key={goal.id} className="p-4 rounded-lg border">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold">{goal.title}</h4>
                            <p className="text-sm text-muted-foreground">{goal.subject} • Target: {goal.target}</p>
                          </div>
                          <Badge variant="outline">{goal.progress}%</Badge>
                        </div>
                        <Progress value={goal.progress} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Set New Goal</CardTitle>
                  <CardDescription>Create a new learning objective</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="goal-title">Goal Title</Label>
                      <Input id="goal-title" placeholder="e.g., Master Algebra Basics" />
                    </div>
                    <div>
                      <Label htmlFor="goal-subject">Subject</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mathematics">Mathematics</SelectItem>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="science">Science</SelectItem>
                          <SelectItem value="history">History</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="goal-target">Target Date</Label>
                      <Input id="goal-target" type="date" />
                    </div>
                    <Button className="w-full">Create Goal</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Study Calendar</CardTitle>
                <CardDescription>View and manage your study schedule</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Interactive Calendar</h3>
                  <p className="text-muted-foreground mb-6">Full calendar view with drag-and-drop scheduling</p>
                  <Button>Coming Soon</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default StudyPlannerPage