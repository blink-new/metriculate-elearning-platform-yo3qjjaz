import { useState } from 'react'
import { Users, MessageCircle, Search, Plus, Heart, Reply, BookOpen, Trophy, Star, Clock, Filter } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Input } from '../components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog'
import { Label } from '../components/ui/label'
import { Textarea } from '../components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'

const CommunityPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('all')

  // Mock data for community features
  const forumPosts = [
    {
      id: 1,
      title: 'Need help with Quadratic Equations',
      content: 'I\'m struggling with solving quadratic equations using the quadratic formula. Can someone explain the steps?',
      author: 'Sarah M.',
      avatar: '👩🏾‍🎓',
      subject: 'Mathematics',
      grade: 'Grade 11',
      replies: 8,
      likes: 12,
      timeAgo: '2 hours ago',
      solved: false,
      tags: ['algebra', 'equations', 'help-needed']
    },
    {
      id: 2,
      title: 'Study Group for Science - Windhoek',
      content: 'Looking for students in Windhoek to form a study group for Grade 12 Science. We can meet at the library on weekends.',
      author: 'Michael K.',
      avatar: '👨🏾‍🎓',
      subject: 'Science',
      grade: 'Grade 12',
      replies: 15,
      likes: 23,
      timeAgo: '4 hours ago',
      solved: false,
      tags: ['study-group', 'windhoek', 'science']
    },
    {
      id: 3,
      title: 'English Poetry Analysis Tips',
      content: 'Here are some techniques I use for analyzing poetry that helped me improve my grades. Hope this helps others!',
      author: 'Emma N.',
      avatar: '👩🏾‍🎓',
      subject: 'English',
      grade: 'Grade 10',
      replies: 6,
      likes: 18,
      timeAgo: '1 day ago',
      solved: true,
      tags: ['english', 'poetry', 'tips', 'analysis']
    },
    {
      id: 4,
      title: 'Geography Climate Zones - Confused',
      content: 'Can someone explain the difference between tropical and temperate climate zones? I keep mixing them up.',
      author: 'David L.',
      avatar: '👨🏾‍🎓',
      subject: 'Geography',
      grade: 'Grade 9',
      replies: 4,
      likes: 7,
      timeAgo: '1 day ago',
      solved: false,
      tags: ['geography', 'climate', 'help-needed']
    }
  ]

  const studyGroups = [
    {
      id: 1,
      name: 'Math Masters - Windhoek',
      description: 'Weekly math study sessions focusing on Grade 11-12 topics',
      members: 12,
      location: 'Windhoek Central Library',
      schedule: 'Saturdays 2:00 PM',
      subject: 'Mathematics',
      grades: ['Grade 11', 'Grade 12'],
      isJoined: false
    },
    {
      id: 2,
      name: 'Science Explorers',
      description: 'Hands-on science discussions and experiment reviews',
      members: 8,
      location: 'Online (Zoom)',
      schedule: 'Sundays 4:00 PM',
      subject: 'Science',
      grades: ['Grade 10', 'Grade 11'],
      isJoined: true
    },
    {
      id: 3,
      name: 'English Literature Circle',
      description: 'Discussing novels, poetry, and improving writing skills',
      members: 15,
      location: 'Oshakati Public Library',
      schedule: 'Fridays 3:30 PM',
      subject: 'English',
      grades: ['Grade 9', 'Grade 10', 'Grade 11'],
      isJoined: false
    },
    {
      id: 4,
      name: 'History Buffs',
      description: 'Exploring Namibian and world history together',
      members: 6,
      location: 'Swakopmund Community Center',
      schedule: 'Wednesdays 5:00 PM',
      subject: 'History',
      grades: ['Grade 11', 'Grade 12'],
      isJoined: false
    }
  ]

  const tutors = [
    {
      id: 1,
      name: 'Amara Nghidinwa',
      avatar: '👩🏾‍🎓',
      subjects: ['Mathematics', 'Physics'],
      grade: 'Grade 12',
      rating: 4.9,
      sessions: 45,
      specialties: ['Algebra', 'Calculus', 'Mechanics'],
      availability: 'Weekends',
      location: 'Windhoek',
      bio: 'Top student in Mathematics. Love helping others understand complex concepts.'
    },
    {
      id: 2,
      name: 'Johannes Shikongo',
      avatar: '👨🏾‍🎓',
      subjects: ['English', 'History'],
      grade: 'Grade 12',
      rating: 4.8,
      sessions: 32,
      specialties: ['Essay Writing', 'Literature Analysis', 'Namibian History'],
      availability: 'Evenings',
      location: 'Oshakati',
      bio: 'Passionate about languages and history. Patient and encouraging tutor.'
    },
    {
      id: 3,
      name: 'Maria Hamutenya',
      avatar: '👩🏾‍🎓',
      subjects: ['Science', 'Geography'],
      grade: 'Grade 11',
      rating: 4.7,
      sessions: 28,
      specialties: ['Biology', 'Chemistry', 'Physical Geography'],
      availability: 'Afternoons',
      location: 'Swakopmund',
      bio: 'Science enthusiast who makes learning fun and interactive.'
    }
  ]

  const leaderboard = [
    { rank: 1, name: 'Sarah M.', points: 2450, badge: '🏆', contributions: 89 },
    { rank: 2, name: 'Michael K.', points: 2180, badge: '🥈', contributions: 76 },
    { rank: 3, name: 'Emma N.', points: 1950, badge: '🥉', contributions: 68 },
    { rank: 4, name: 'David L.', points: 1720, badge: '⭐', contributions: 54 },
    { rank: 5, name: 'Lisa P.', points: 1580, badge: '⭐', contributions: 47 }
  ]

  const filteredPosts = forumPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSubject = selectedSubject === 'all' || post.subject === selectedSubject
    return matchesSearch && matchesSubject
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Community Hub</h1>
            <p className="text-muted-foreground text-lg">
              Connect with fellow Namibian students, join study groups, find tutors, and get help from peers
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="forum" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="forum">Forum</TabsTrigger>
            <TabsTrigger value="study-groups">Study Groups</TabsTrigger>
            <TabsTrigger value="tutors">Peer Tutors</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          <TabsContent value="forum" className="mt-6">
            <div className="grid lg:grid-cols-4 gap-6">
              {/* Main Forum Content */}
              <div className="lg:col-span-3 space-y-6">
                {/* Search and Filters */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search discussions..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                        <SelectTrigger className="w-full sm:w-48">
                          <SelectValue placeholder="All Subjects" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Subjects</SelectItem>
                          <SelectItem value="Mathematics">Mathematics</SelectItem>
                          <SelectItem value="English">English</SelectItem>
                          <SelectItem value="Science">Science</SelectItem>
                          <SelectItem value="Geography">Geography</SelectItem>
                          <SelectItem value="History">History</SelectItem>
                        </SelectContent>
                      </Select>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="gap-2">
                            <Plus className="h-4 w-4" />
                            New Post
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Create New Discussion</DialogTitle>
                            <DialogDescription>Share a question, tip, or start a discussion with the community</DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div>
                              <Label htmlFor="post-title">Title</Label>
                              <Input id="post-title" placeholder="What's your question or topic?" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="post-subject">Subject</Label>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select subject" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="mathematics">Mathematics</SelectItem>
                                    <SelectItem value="english">English</SelectItem>
                                    <SelectItem value="science">Science</SelectItem>
                                    <SelectItem value="geography">Geography</SelectItem>
                                    <SelectItem value="history">History</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label htmlFor="post-grade">Grade</Label>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select grade" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="8">Grade 8</SelectItem>
                                    <SelectItem value="9">Grade 9</SelectItem>
                                    <SelectItem value="10">Grade 10</SelectItem>
                                    <SelectItem value="11">Grade 11</SelectItem>
                                    <SelectItem value="12">Grade 12</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <div>
                              <Label htmlFor="post-content">Content</Label>
                              <Textarea 
                                id="post-content" 
                                placeholder="Describe your question or share your knowledge..."
                                className="min-h-32"
                              />
                            </div>
                            <div>
                              <Label htmlFor="post-tags">Tags (optional)</Label>
                              <Input id="post-tags" placeholder="e.g., algebra, help-needed, tips" />
                            </div>
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button variant="outline">Cancel</Button>
                            <Button>Post Discussion</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>

                {/* Forum Posts */}
                <div className="space-y-4">
                  {filteredPosts.map((post) => (
                    <Card key={post.id} className="hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="text-3xl">{post.avatar}</div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-semibold text-lg mb-1">{post.title}</h3>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <span>{post.author}</span>
                                  <span>•</span>
                                  <span>{post.grade}</span>
                                  <span>•</span>
                                  <span>{post.timeAgo}</span>
                                  {post.solved && (
                                    <>
                                      <span>•</span>
                                      <Badge className="bg-green-100 text-green-800">Solved</Badge>
                                    </>
                                  )}
                                </div>
                              </div>
                              <Badge variant="outline">{post.subject}</Badge>
                            </div>
                            
                            <p className="text-muted-foreground mb-4">{post.content}</p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <Button variant="ghost" size="sm" className="gap-2">
                                  <Heart className="h-4 w-4" />
                                  {post.likes}
                                </Button>
                                <Button variant="ghost" size="sm" className="gap-2">
                                  <Reply className="h-4 w-4" />
                                  {post.replies} replies
                                </Button>
                              </div>
                              <div className="flex gap-1">
                                {post.tags.map((tag, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Community Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Community Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Active Members</span>
                      <span className="font-semibold">2,847</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Discussions</span>
                      <span className="font-semibold">1,234</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Questions Solved</span>
                      <span className="font-semibold">892</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Study Groups</span>
                      <span className="font-semibold">47</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Popular Tags */}
                <Card>
                  <CardHeader>
                    <CardTitle>Popular Tags</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {['mathematics', 'help-needed', 'study-tips', 'science', 'english', 'exam-prep', 'algebra', 'chemistry'].map((tag) => (
                        <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="study-groups" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studyGroups.map((group) => (
                <Card key={group.id} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{group.name}</CardTitle>
                        <CardDescription className="mt-1">{group.description}</CardDescription>
                      </div>
                      <Badge variant="outline">{group.subject}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{group.members} members</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{group.schedule}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <span>{group.location}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {group.grades.map((grade, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {grade}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button 
                      className="w-full" 
                      variant={group.isJoined ? "outline" : "default"}
                    >
                      {group.isJoined ? 'Joined' : 'Join Group'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <Card className="max-w-md mx-auto">
                <CardContent className="p-6 text-center">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Create Your Own Study Group</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Can't find a group that fits? Start your own and invite others to join!
                  </p>
                  <Button>Create Study Group</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tutors" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tutors.map((tutor) => (
                <Card key={tutor.id} className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-2">{tutor.avatar}</div>
                      <h3 className="font-semibold text-lg">{tutor.name}</h3>
                      <p className="text-sm text-muted-foreground">{tutor.grade} • {tutor.location}</p>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium mb-1">Subjects</p>
                        <div className="flex flex-wrap gap-1">
                          {tutor.subjects.map((subject, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {subject}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium mb-1">Specialties</p>
                        <div className="flex flex-wrap gap-1">
                          {tutor.specialties.map((specialty, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{tutor.rating}</span>
                        </div>
                        <span className="text-muted-foreground">{tutor.sessions} sessions</span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">{tutor.bio}</p>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Available {tutor.availability}</span>
                      </div>
                    </div>
                    
                    <Button className="w-full mt-4">Connect</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="mt-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    Community Contributors
                  </CardTitle>
                  <CardDescription>Top contributors this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {leaderboard.map((user) => (
                      <div key={user.rank} className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{user.badge}</div>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.contributions} contributions</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">{user.points}</p>
                          <p className="text-xs text-muted-foreground">points</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>How to Earn Points</CardTitle>
                  <CardDescription>Contribute to the community and climb the leaderboard</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Ask a question</span>
                      <Badge variant="outline">+10 points</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Answer a question</span>
                      <Badge variant="outline">+20 points</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Get your answer marked as helpful</span>
                      <Badge variant="outline">+50 points</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Create a study group</span>
                      <Badge variant="outline">+100 points</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Help solve a problem</span>
                      <Badge variant="outline">+75 points</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Daily login streak (7 days)</span>
                      <Badge variant="outline">+200 points</Badge>
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

export default CommunityPage