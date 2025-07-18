import { useState } from 'react'
import { Trophy, Star, Zap, Target, Award, Crown, Medal, Shield, Flame, BookOpen, Brain, Users, Clock, TrendingUp } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Progress } from '../components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'

const AchievementsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')

  // User's current level and XP
  const userLevel = {
    current: 12,
    xp: 2450,
    xpToNext: 3000,
    title: "Advanced Scholar",
    nextTitle: "Master Student"
  }

  // Achievement categories
  const categories = [
    { id: 'all', name: 'All Achievements', icon: Trophy },
    { id: 'study', name: 'Study Milestones', icon: BookOpen },
    { id: 'quiz', name: 'Quiz Master', icon: Brain },
    { id: 'streak', name: 'Consistency', icon: Flame },
    { id: 'social', name: 'Community', icon: Users },
    { id: 'special', name: 'Special Events', icon: Star }
  ]

  // All achievements
  const achievements = [
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first lesson",
      icon: "🎯",
      category: "study",
      earned: true,
      earnedDate: "2024-01-10",
      xpReward: 50,
      rarity: "Common"
    },
    {
      id: 2,
      title: "Study Streak",
      description: "Study for 7 consecutive days",
      icon: "🔥",
      category: "streak",
      earned: true,
      earnedDate: "2024-01-15",
      xpReward: 100,
      rarity: "Uncommon"
    },
    {
      id: 3,
      title: "Quiz Champion",
      description: "Score 90%+ on 10 quizzes",
      icon: "🏆",
      category: "quiz",
      earned: true,
      earnedDate: "2024-01-18",
      xpReward: 200,
      rarity: "Rare"
    },
    {
      id: 4,
      title: "Math Master",
      description: "Complete all Grade 10 Math lessons",
      icon: "🧮",
      category: "study",
      earned: true,
      earnedDate: "2024-01-20",
      xpReward: 300,
      rarity: "Epic"
    },
    {
      id: 5,
      title: "Community Helper",
      description: "Help 5 students in the forum",
      icon: "🤝",
      category: "social",
      earned: true,
      earnedDate: "2024-01-12",
      xpReward: 150,
      rarity: "Uncommon"
    },
    {
      id: 6,
      title: "Speed Learner",
      description: "Complete 5 lessons in one day",
      icon: "⚡",
      category: "study",
      earned: false,
      progress: 60,
      xpReward: 100,
      rarity: "Uncommon"
    },
    {
      id: 7,
      title: "Perfect Score",
      description: "Get 100% on any quiz",
      icon: "💯",
      category: "quiz",
      earned: false,
      progress: 0,
      xpReward: 250,
      rarity: "Rare"
    },
    {
      id: 8,
      title: "Study Marathon",
      description: "Study for 30 consecutive days",
      icon: "🏃‍♂️",
      category: "streak",
      earned: false,
      progress: 40,
      xpReward: 500,
      rarity: "Epic"
    },
    {
      id: 9,
      title: "Science Explorer",
      description: "Complete all Science experiments",
      icon: "🔬",
      category: "study",
      earned: false,
      progress: 75,
      xpReward: 300,
      rarity: "Rare"
    },
    {
      id: 10,
      title: "Mentor",
      description: "Tutor 10 students successfully",
      icon: "👨‍🏫",
      category: "social",
      earned: false,
      progress: 30,
      xpReward: 400,
      rarity: "Epic"
    },
    {
      id: 11,
      title: "New Year Scholar",
      description: "Special achievement for January 2024",
      icon: "🎊",
      category: "special",
      earned: true,
      earnedDate: "2024-01-01",
      xpReward: 100,
      rarity: "Limited"
    },
    {
      id: 12,
      title: "Legendary Learner",
      description: "Reach Level 20",
      icon: "👑",
      category: "study",
      earned: false,
      progress: 60,
      xpReward: 1000,
      rarity: "Legendary"
    }
  ]

  // Daily challenges
  const dailyChallenges = [
    {
      id: 1,
      title: "Complete 3 Lessons",
      description: "Finish 3 lessons in any subject",
      progress: 2,
      target: 3,
      xpReward: 50,
      timeLeft: "6h 23m",
      completed: false
    },
    {
      id: 2,
      title: "Score 80%+ on Quiz",
      description: "Get at least 80% on any quiz",
      progress: 0,
      target: 1,
      xpReward: 75,
      timeLeft: "6h 23m",
      completed: false
    },
    {
      id: 3,
      title: "Help a Peer",
      description: "Answer a question in the community forum",
      progress: 1,
      target: 1,
      xpReward: 30,
      timeLeft: "6h 23m",
      completed: true
    }
  ]

  // Weekly challenges
  const weeklyChallenges = [
    {
      id: 1,
      title: "Study Streak",
      description: "Study every day this week",
      progress: 4,
      target: 7,
      xpReward: 200,
      timeLeft: "3 days",
      completed: false
    },
    {
      id: 2,
      title: "Subject Explorer",
      description: "Study 3 different subjects",
      progress: 3,
      target: 3,
      xpReward: 150,
      timeLeft: "3 days",
      completed: true
    }
  ]

  // Leaderboard
  const leaderboard = [
    { rank: 1, name: "Sarah M.", level: 15, xp: 4250, badge: "🥇" },
    { rank: 2, name: "Michael K.", level: 14, xp: 3890, badge: "🥈" },
    { rank: 3, name: "Emma N.", level: 13, xp: 3654, badge: "🥉" },
    { rank: 4, name: "You", level: userLevel.current, xp: userLevel.xp, badge: "⭐" },
    { rank: 5, name: "David L.", level: 11, xp: 2234, badge: "⭐" }
  ]

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'Uncommon': return 'bg-green-100 text-green-800 border-green-200'
      case 'Rare': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Epic': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'Legendary': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Limited': return 'bg-pink-100 text-pink-800 border-pink-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const filteredAchievements = achievements.filter(achievement => 
    selectedCategory === 'all' || achievement.category === selectedCategory
  )

  const earnedAchievements = achievements.filter(a => a.earned)
  const totalAchievements = achievements.length

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Achievements & Gamification</h1>
            <p className="text-muted-foreground text-lg">
              Track your progress, earn badges, complete challenges, and climb the leaderboard
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* User Level Section */}
        <Card className="mb-8 bg-gradient-to-r from-primary/5 to-accent/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <Crown className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Level {userLevel.current}</h2>
                  <p className="text-muted-foreground">{userLevel.title}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">{userLevel.xp} XP</p>
                <p className="text-sm text-muted-foreground">
                  {userLevel.xpToNext - userLevel.xp} XP to {userLevel.nextTitle}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress to Level {userLevel.current + 1}</span>
                <span>{Math.round((userLevel.xp / userLevel.xpToNext) * 100)}%</span>
              </div>
              <Progress value={(userLevel.xp / userLevel.xpToNext) * 100} className="h-3" />
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="achievements" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
          </TabsList>

          <TabsContent value="achievements" className="mt-6">
            <div className="grid lg:grid-cols-4 gap-6">
              {/* Achievement Categories */}
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Categories</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {categories.map((category) => {
                      const Icon = category.icon
                      return (
                        <Button
                          key={category.id}
                          variant={selectedCategory === category.id ? "default" : "ghost"}
                          className="w-full justify-start gap-2"
                          onClick={() => setSelectedCategory(category.id)}
                        >
                          <Icon className="h-4 w-4" />
                          {category.name}
                        </Button>
                      )
                    })}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary">{earnedAchievements.length}</div>
                        <div className="text-sm text-muted-foreground">of {totalAchievements} earned</div>
                      </div>
                      <Progress value={(earnedAchievements.length / totalAchievements) * 100} className="h-2" />
                      <div className="text-center text-sm text-muted-foreground">
                        {Math.round((earnedAchievements.length / totalAchievements) * 100)}% Complete
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Achievements Grid */}
              <div className="lg:col-span-3">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredAchievements.map((achievement) => (
                    <Card 
                      key={achievement.id} 
                      className={`relative transition-all duration-300 ${
                        achievement.earned 
                          ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 hover:shadow-lg' 
                          : 'opacity-75 hover:opacity-100'
                      }`}
                    >
                      <CardContent className="p-6 text-center">
                        <div className="text-4xl mb-3">{achievement.icon}</div>
                        <h3 className="font-semibold mb-2">{achievement.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{achievement.description}</p>
                        
                        <div className="space-y-3">
                          <Badge className={`${getRarityColor(achievement.rarity)} border`}>
                            {achievement.rarity}
                          </Badge>
                          
                          {achievement.earned ? (
                            <div>
                              <Badge className="bg-green-100 text-green-800 mb-2">Earned</Badge>
                              <p className="text-xs text-muted-foreground">
                                Completed on {achievement.earnedDate}
                              </p>
                              <p className="text-xs text-primary font-medium">
                                +{achievement.xpReward} XP
                              </p>
                            </div>
                          ) : (
                            <div>
                              {achievement.progress !== undefined && (
                                <div className="mb-2">
                                  <Progress value={achievement.progress} className="h-2" />
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {achievement.progress}% complete
                                  </p>
                                </div>
                              )}
                              <p className="text-xs text-muted-foreground">
                                Reward: {achievement.xpReward} XP
                              </p>
                            </div>
                          )}
                        </div>
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
              </div>
            </div>
          </TabsContent>

          <TabsContent value="challenges" className="mt-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Daily Challenges */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Daily Challenges
                  </CardTitle>
                  <CardDescription>Complete these challenges before they reset</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {dailyChallenges.map((challenge) => (
                    <div key={challenge.id} className={`p-4 rounded-lg border ${challenge.completed ? 'bg-green-50 border-green-200' : 'bg-background'}`}>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">{challenge.title}</h4>
                          <p className="text-sm text-muted-foreground">{challenge.description}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className="text-xs">
                            {challenge.xpReward} XP
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{challenge.progress}/{challenge.target}</span>
                        </div>
                        <Progress value={(challenge.progress / challenge.target) * 100} className="h-2" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Time left: {challenge.timeLeft}</span>
                          {challenge.completed && <span className="text-green-600 font-medium">Completed!</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Weekly Challenges */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Weekly Challenges
                  </CardTitle>
                  <CardDescription>Bigger challenges with greater rewards</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {weeklyChallenges.map((challenge) => (
                    <div key={challenge.id} className={`p-4 rounded-lg border ${challenge.completed ? 'bg-green-50 border-green-200' : 'bg-background'}`}>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">{challenge.title}</h4>
                          <p className="text-sm text-muted-foreground">{challenge.description}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className="text-xs">
                            {challenge.xpReward} XP
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{challenge.progress}/{challenge.target}</span>
                        </div>
                        <Progress value={(challenge.progress / challenge.target) * 100} className="h-2" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Time left: {challenge.timeLeft}</span>
                          {challenge.completed && <span className="text-green-600 font-medium">Completed!</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="mt-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    Global Leaderboard
                  </CardTitle>
                  <CardDescription>Top students this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {leaderboard.map((user) => (
                      <div key={user.rank} className={`flex items-center justify-between p-3 rounded-lg border ${user.name === 'You' ? 'bg-primary/5 border-primary/20' : ''}`}>
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{user.badge}</div>
                          <div>
                            <p className={`font-medium ${user.name === 'You' ? 'text-primary' : ''}`}>
                              {user.name}
                            </p>
                            <p className="text-sm text-muted-foreground">Level {user.level}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{user.xp} XP</p>
                          <p className="text-xs text-muted-foreground">Rank #{user.rank}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Ranking System</CardTitle>
                  <CardDescription>How the leaderboard works</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">How to Earn XP</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Complete a lesson</span>
                          <Badge variant="outline">+25 XP</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Pass a quiz (80%+)</span>
                          <Badge variant="outline">+50 XP</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Perfect quiz score</span>
                          <Badge variant="outline">+100 XP</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Daily login</span>
                          <Badge variant="outline">+10 XP</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Help in community</span>
                          <Badge variant="outline">+30 XP</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Complete challenges</span>
                          <Badge variant="outline">+50-200 XP</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Ranking Tiers</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Crown className="h-4 w-4 text-yellow-500" />
                          <span>Level 15+: Master Student</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Medal className="h-4 w-4 text-purple-500" />
                          <span>Level 10-14: Advanced Scholar</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-blue-500" />
                          <span>Level 5-9: Dedicated Learner</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-green-500" />
                          <span>Level 1-4: Rising Student</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="stats" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold">127</div>
                  <div className="text-sm text-muted-foreground">Lessons Completed</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Brain className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">89</div>
                  <div className="text-sm text-muted-foreground">Quizzes Passed</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Flame className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-sm text-muted-foreground">Day Streak</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">45.5h</div>
                  <div className="text-sm text-muted-foreground">Study Time</div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Learning Progress
                </CardTitle>
                <CardDescription>Your academic journey over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Overall Progress</span>
                      <span>73%</span>
                    </div>
                    <Progress value={73} className="h-2" />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Subject Mastery</h4>
                      <div className="space-y-3">
                        {[
                          { subject: 'Mathematics', progress: 78 },
                          { subject: 'Science', progress: 82 },
                          { subject: 'English', progress: 65 },
                          { subject: 'Geography', progress: 71 },
                          { subject: 'History', progress: 45 }
                        ].map((item) => (
                          <div key={item.subject}>
                            <div className="flex justify-between text-sm mb-1">
                              <span>{item.subject}</span>
                              <span>{item.progress}%</span>
                            </div>
                            <Progress value={item.progress} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3">Recent Achievements</h4>
                      <div className="space-y-2">
                        {earnedAchievements.slice(-5).reverse().map((achievement) => (
                          <div key={achievement.id} className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                            <span className="text-lg">{achievement.icon}</span>
                            <div>
                              <p className="font-medium text-sm">{achievement.title}</p>
                              <p className="text-xs text-muted-foreground">{achievement.earnedDate}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default AchievementsPage