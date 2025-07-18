import { useState } from 'react'
import { Heart, Brain, Target, Lightbulb, Clock, Star, Play, BookOpen, Zap, Smile, Coffee, Moon } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Progress } from '../components/ui/progress'

const MotivationPage = () => {
  const [currentQuote, setCurrentQuote] = useState(0)

  // Inspirational quotes specifically for Namibian students
  const motivationalQuotes = [
    {
      quote: "Education is the most powerful weapon which you can use to change the world.",
      author: "Nelson Mandela",
      category: "Education"
    },
    {
      quote: "The future belongs to those who believe in the beauty of their dreams.",
      author: "Eleanor Roosevelt",
      category: "Dreams"
    },
    {
      quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      author: "Winston Churchill",
      category: "Perseverance"
    },
    {
      quote: "Your education is a dress rehearsal for a life that is yours to lead.",
      author: "Nora Ephron",
      category: "Life"
    },
    {
      quote: "The expert in anything was once a beginner.",
      author: "Helen Hayes",
      category: "Growth"
    }
  ]

  const studyTips = [
    {
      id: 1,
      title: "The Pomodoro Technique",
      description: "Study for 25 minutes, then take a 5-minute break. Repeat 4 times, then take a longer break.",
      icon: Clock,
      category: "Time Management",
      difficulty: "Easy",
      timeToRead: "2 min"
    },
    {
      id: 2,
      title: "Active Recall Method",
      description: "Test yourself on what you've learned instead of just re-reading notes. This strengthens memory.",
      icon: Brain,
      category: "Memory",
      difficulty: "Medium",
      timeToRead: "3 min"
    },
    {
      id: 3,
      title: "Spaced Repetition",
      description: "Review material at increasing intervals to move information into long-term memory.",
      icon: Target,
      category: "Memory",
      difficulty: "Medium",
      timeToRead: "4 min"
    },
    {
      id: 4,
      title: "Mind Mapping",
      description: "Create visual diagrams to connect ideas and see relationships between concepts.",
      icon: Lightbulb,
      category: "Organization",
      difficulty: "Easy",
      timeToRead: "3 min"
    },
    {
      id: 5,
      title: "Teach Someone Else",
      description: "Explaining concepts to others helps identify gaps in your understanding.",
      icon: BookOpen,
      category: "Understanding",
      difficulty: "Hard",
      timeToRead: "2 min"
    },
    {
      id: 6,
      title: "Environment Optimization",
      description: "Create a dedicated study space free from distractions with good lighting and comfort.",
      icon: Star,
      category: "Environment",
      difficulty: "Easy",
      timeToRead: "3 min"
    }
  ]

  const wellnessTips = [
    {
      id: 1,
      title: "Stay Hydrated",
      description: "Drink plenty of water throughout the day. Dehydration can affect concentration and memory.",
      icon: Coffee,
      category: "Physical Health",
      color: "bg-blue-500"
    },
    {
      id: 2,
      title: "Get Enough Sleep",
      description: "Aim for 8-9 hours of sleep. Your brain consolidates memories during sleep.",
      icon: Moon,
      category: "Sleep",
      color: "bg-purple-500"
    },
    {
      id: 3,
      title: "Take Regular Breaks",
      description: "Short breaks help maintain focus and prevent burnout. Step outside for fresh air.",
      icon: Smile,
      category: "Mental Health",
      color: "bg-green-500"
    },
    {
      id: 4,
      title: "Exercise Regularly",
      description: "Physical activity improves blood flow to the brain and reduces stress.",
      icon: Zap,
      category: "Physical Health",
      color: "bg-orange-500"
    },
    {
      id: 5,
      title: "Practice Mindfulness",
      description: "Take 5 minutes daily for deep breathing or meditation to reduce anxiety.",
      icon: Heart,
      category: "Mental Health",
      color: "bg-pink-500"
    },
    {
      id: 6,
      title: "Eat Brain Foods",
      description: "Include nuts, fish, berries, and vegetables in your diet for better brain function.",
      icon: Brain,
      category: "Nutrition",
      color: "bg-yellow-500"
    }
  ]

  const examTips = [
    {
      title: "Start Early",
      description: "Begin studying weeks before the exam, not days. Create a study schedule and stick to it."
    },
    {
      title: "Practice Past Papers",
      description: "Familiarize yourself with the exam format and types of questions you'll encounter."
    },
    {
      title: "Form Study Groups",
      description: "Discuss difficult concepts with classmates. Teaching others helps reinforce your own learning."
    },
    {
      title: "Stay Calm",
      description: "Practice relaxation techniques. Take deep breaths and remind yourself that you're prepared."
    },
    {
      title: "Read Instructions Carefully",
      description: "Take time to understand what each question is asking before you start writing."
    },
    {
      title: "Manage Your Time",
      description: "Allocate time for each section. Don't spend too long on one question."
    }
  ]

  const successStories = [
    {
      name: "Amara Nghidinwa",
      story: "I was struggling with Mathematics in Grade 10. Using Metriculate's study planner and joining a study group helped me improve from a D to an A! Now I'm helping other students too.",
      subject: "Mathematics",
      improvement: "D → A",
      avatar: "👩🏾‍🎓"
    },
    {
      name: "Johannes Shikongo",
      story: "The motivation corner kept me going during tough times. The wellness tips helped me manage stress during exam season. I passed all my subjects!",
      subject: "All Subjects",
      improvement: "Passed All",
      avatar: "👨🏾‍🎓"
    },
    {
      name: "Maria Hamutenya",
      story: "Science seemed impossible until I found the right study techniques. Active recall and spaced repetition changed everything for me.",
      subject: "Science",
      improvement: "C → A",
      avatar: "👩🏾‍🎓"
    }
  ]

  const nextQuote = () => {
    setCurrentQuote((prev) => (prev + 1) % motivationalQuotes.length)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800'
      case 'Medium': return 'bg-blue-100 text-blue-800'
      case 'Hard': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Motivation Corner</h1>
            <p className="text-muted-foreground text-lg">
              Find inspiration, learn effective study techniques, and take care of your wellbeing
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Daily Quote Section */}
        <Card className="mb-8 bg-gradient-to-r from-primary/5 to-accent/5">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold mb-4">Quote of the Day</h2>
            <blockquote className="text-2xl font-medium mb-4 italic">
              "{motivationalQuotes[currentQuote].quote}"
            </blockquote>
            <p className="text-muted-foreground mb-4">
              — {motivationalQuotes[currentQuote].author}
            </p>
            <div className="flex justify-center gap-4">
              <Badge variant="outline">{motivationalQuotes[currentQuote].category}</Badge>
              <Button variant="outline" size="sm" onClick={nextQuote}>
                Next Quote
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="study-tips" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="study-tips">Study Tips</TabsTrigger>
            <TabsTrigger value="wellness">Wellness</TabsTrigger>
            <TabsTrigger value="exam-prep">Exam Prep</TabsTrigger>
            <TabsTrigger value="success-stories">Success Stories</TabsTrigger>
          </TabsList>

          <TabsContent value="study-tips" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studyTips.map((tip) => {
                const Icon = tip.icon
                return (
                  <Card key={tip.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{tip.title}</CardTitle>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">{tip.category}</Badge>
                              <Badge className={`text-xs ${getDifficultyColor(tip.difficulty)}`}>
                                {tip.difficulty}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{tip.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{tip.timeToRead} read</span>
                        <Button size="sm" variant="outline">
                          <Play className="h-3 w-3 mr-1" />
                          Learn More
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="wellness" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wellnessTips.map((tip) => {
                const Icon = tip.icon
                return (
                  <Card key={tip.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-12 h-12 ${tip.color} rounded-lg flex items-center justify-center`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{tip.title}</h3>
                          <Badge variant="outline" className="text-xs mt-1">{tip.category}</Badge>
                        </div>
                      </div>
                      <p className="text-muted-foreground">{tip.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Wellness Challenge */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Weekly Wellness Challenge
                </CardTitle>
                <CardDescription>Complete daily wellness activities to maintain a healthy study-life balance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>This Week's Progress</span>
                    <span>4/7 days completed</span>
                  </div>
                  <Progress value={57} className="h-2" />
                  <div className="grid grid-cols-7 gap-2">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                      <div key={day} className={`text-center p-2 rounded-lg border ${index < 4 ? 'bg-green-50 border-green-200' : 'bg-muted'}`}>
                        <div className="text-xs font-medium">{day}</div>
                        <div className="text-xs mt-1">
                          {index < 4 ? '✓' : '○'}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Today's challenge: Take a 10-minute walk outside and practice 5 minutes of deep breathing
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="exam-prep" className="mt-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Essential Exam Strategies
                  </CardTitle>
                  <CardDescription>Proven techniques to excel in your exams</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {examTips.map((tip, index) => (
                      <div key={index} className="flex gap-3 p-3 rounded-lg border">
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">{tip.title}</h4>
                          <p className="text-sm text-muted-foreground">{tip.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Exam Countdown</CardTitle>
                  <CardDescription>Stay on track with your exam preparation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-primary mb-2">42</div>
                      <p className="text-muted-foreground">Days until final exams</p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Study Plan Progress</span>
                        <span className="text-sm font-medium">68%</span>
                      </div>
                      <Progress value={68} className="h-2" />
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold">This Week's Goals</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                          <span className="line-through text-muted-foreground">Complete Math Chapter 5</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                          <span className="line-through text-muted-foreground">Science Lab Report</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-4 h-4 border-2 border-muted rounded-full"></div>
                          <span>English Essay Practice</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-4 h-4 border-2 border-muted rounded-full"></div>
                          <span>History Timeline Review</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="success-stories" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {successStories.map((story, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-2">{story.avatar}</div>
                      <h3 className="font-semibold text-lg">{story.name}</h3>
                      <div className="flex items-center justify-center gap-2 mt-1">
                        <Badge variant="outline">{story.subject}</Badge>
                        <Badge className="bg-green-100 text-green-800">{story.improvement}</Badge>
                      </div>
                    </div>
                    <blockquote className="text-muted-foreground italic text-center">
                      "{story.story}"
                    </blockquote>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-8">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Share Your Success Story</h3>
                <p className="text-muted-foreground mb-6">
                  Inspire other students by sharing how Metriculate helped you achieve your goals
                </p>
                <Button size="lg">Submit Your Story</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default MotivationPage