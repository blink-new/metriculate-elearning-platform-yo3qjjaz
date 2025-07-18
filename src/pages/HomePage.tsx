import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Calculator, Beaker, Globe, Users, Zap, Star, Play, Shield } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { useAuth } from '../hooks/useAuth'
import { useAdmin } from '../hooks/useAdmin'
import { AuthModal } from '../components/auth/AuthModal'
import { makeCurrentUserAdmin } from '../utils/adminSetup'
import { toast } from '../hooks/use-toast'

const HomePage = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const { user } = useAuth()
  const { isAdmin } = useAdmin()

  const handleMakeAdmin = async () => {
    try {
      await makeCurrentUserAdmin()
      toast({
        title: 'Success',
        description: 'You have been made an admin! Refresh the page to see admin features.'
      })
      // Refresh the page to update admin status
      window.location.reload()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to make you an admin',
        variant: 'destructive'
      })
    }
  }

  const subjects = [
    { id: 'mathematics', name: 'Mathematics', icon: Calculator, color: 'bg-blue-500', students: '2.4k' },
    { id: 'english', name: 'English', icon: BookOpen, color: 'bg-green-500', students: '3.1k' },
    { id: 'science', name: 'Science', icon: Beaker, color: 'bg-purple-500', students: '1.8k' },
    { id: 'geography', name: 'Geography', icon: Globe, color: 'bg-orange-500', students: '1.2k' },
    { id: 'history', name: 'History', icon: Users, color: 'bg-red-500', students: '980' },
    { id: 'physics', name: 'Physics', icon: Zap, color: 'bg-yellow-500', students: '1.5k' },
  ]

  const testimonials = [
    {
      name: 'Amara Nghidinwa',
      grade: 'Grade 11',
      school: 'Windhoek High School',
      quote: 'Metriculate helped me improve my Mathematics grade from C to A! The practice questions are exactly like our exams.',
      avatar: '👩🏾‍🎓'
    },
    {
      name: 'Johannes Shikongo',
      grade: 'Grade 12',
      school: 'Delta Secondary School',
      quote: 'The study planner keeps me organized and the community helped me find a study group. Best learning platform!',
      avatar: '👨🏾‍🎓'
    },
    {
      name: 'Maria Hamutenya',
      grade: 'Grade 10',
      school: 'Ongwediva Secondary',
      quote: 'I love the gamification features! Earning badges makes studying fun and motivating.',
      avatar: '👩🏾‍🎓'
    }
  ]

  const quickStartSteps = [
    { step: 1, title: 'Choose Your Grade', description: 'Select your current grade level (8-12)' },
    { step: 2, title: 'Pick Subjects', description: 'Choose the subjects you want to focus on' },
    { step: 3, title: 'Start Learning', description: 'Begin with video lessons and practice quizzes' },
    { step: 4, title: 'Track Progress', description: 'Monitor your improvement and earn achievements' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-background py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              🇳🇦 Made for Namibian Students
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Excel in Your Studies with Metriculate
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              The complete e-learning platform designed for Namibian high school students. 
              Master Grades 8-12 curriculum with interactive lessons, practice tests, and peer support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Button size="lg" className="text-lg px-8 py-6" asChild>
                  <Link to="/subjects">
                    Continue Learning
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              ) : (
                <Button size="lg" className="text-lg px-8 py-6" onClick={() => setAuthModalOpen(true)}>
                  Start Learning Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              )}
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
            
            {/* Temporary Admin Setup Button (for testing) */}
            {user && !isAdmin && (
              <div className="mt-6 text-center">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleMakeAdmin}
                  className="text-sm"
                >
                  <Shield className="mr-2 h-4 w-4" />
                  Make Me Admin (Testing)
                </Button>
              </div>
            )}
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      </section>

      {/* Quick Subject Access */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Choose Your Subject</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Jump straight into learning with our comprehensive subject coverage for Grades 8-12
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
            {subjects.map((subject) => {
              const Icon = subject.icon
              
              return (
                <Card key={subject.id} className="group transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className={`w-12 h-12 ${subject.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold mb-1">{subject.name}</h3>
                    <p className="text-sm text-muted-foreground">{subject.students} students</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Student Testimonials */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Students Say</h2>
            <p className="text-muted-foreground">Real success stories from Namibian students</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4">{testimonial.avatar}</div>
                    <blockquote className="text-sm mb-4 italic">
                      "{testimonial.quote}"
                    </blockquote>
                    <div>
                      <p className="font-semibold text-sm">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.grade} • {testimonial.school}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start Guide */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Get Started in 4 Easy Steps</h2>
            <p className="text-muted-foreground">Your journey to academic excellence begins here</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {quickStartSteps.map((step, index) => (
              <Card key={step.step} className="relative group transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4">
                    <span className="text-white font-bold text-lg">{step.step}</span>
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                  <CardDescription>{step.description}</CardDescription>
                </CardHeader>
                {index < quickStartSteps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2">
                    <ArrowRight className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            {user ? (
              <Button size="lg" className="text-lg px-8 py-6" asChild>
                <Link to="/subjects">
                  Continue Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            ) : (
              <Button size="lg" className="text-lg px-8 py-6" onClick={() => setAuthModalOpen(true)}>
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">12k+</div>
              <div className="text-primary-foreground/80">Active Students</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-primary-foreground/80">Video Lessons</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-primary-foreground/80">Pass Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-primary-foreground/80">Support</div>
            </div>
          </div>
        </div>
      </section>

      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </div>
  )
}

export default HomePage