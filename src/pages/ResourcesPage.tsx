import { useState } from 'react'
import { Download, FileText, Search, Filter, BookOpen, Calculator, Beaker, Globe, Users, Zap, Star, Clock, Eye } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Input } from '../components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'

const ResourcesPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('all')
  const [selectedGrade, setSelectedGrade] = useState('all')
  const [selectedYear, setSelectedYear] = useState('all')

  // Mock data for past papers
  const pastPapers = [
    {
      id: 1,
      title: 'Mathematics Grade 12 Final Exam',
      subject: 'Mathematics',
      grade: 'Grade 12',
      year: '2023',
      type: 'Final Exam',
      pages: 8,
      downloads: 1247,
      rating: 4.8,
      size: '2.4 MB',
      format: 'PDF',
      difficulty: 'Advanced',
      topics: ['Calculus', 'Algebra', 'Trigonometry', 'Statistics']
    },
    {
      id: 2,
      title: 'English Grade 11 Mid-Year Paper',
      subject: 'English',
      grade: 'Grade 11',
      year: '2023',
      type: 'Mid-Year',
      pages: 12,
      downloads: 892,
      rating: 4.6,
      size: '1.8 MB',
      format: 'PDF',
      difficulty: 'Intermediate',
      topics: ['Literature', 'Grammar', 'Essay Writing', 'Comprehension']
    },
    {
      id: 3,
      title: 'Science Grade 10 Practical Exam',
      subject: 'Science',
      grade: 'Grade 10',
      year: '2023',
      type: 'Practical',
      pages: 6,
      downloads: 654,
      rating: 4.7,
      size: '1.2 MB',
      format: 'PDF',
      difficulty: 'Intermediate',
      topics: ['Biology', 'Chemistry', 'Physics', 'Lab Work']
    },
    {
      id: 4,
      title: 'Geography Grade 9 Term Test',
      subject: 'Geography',
      grade: 'Grade 9',
      year: '2023',
      type: 'Term Test',
      pages: 4,
      downloads: 423,
      rating: 4.5,
      size: '0.8 MB',
      format: 'PDF',
      difficulty: 'Beginner',
      topics: ['Physical Geography', 'Climate', 'Maps', 'Namibian Geography']
    },
    {
      id: 5,
      title: 'History Grade 12 Final Exam',
      subject: 'History',
      grade: 'Grade 12',
      year: '2022',
      type: 'Final Exam',
      pages: 10,
      downloads: 756,
      rating: 4.4,
      size: '2.1 MB',
      format: 'PDF',
      difficulty: 'Advanced',
      topics: ['World Wars', 'Namibian Independence', 'Cold War', 'Decolonization']
    },
    {
      id: 6,
      title: 'Physics Grade 11 Practical',
      subject: 'Physics',
      grade: 'Grade 11',
      year: '2023',
      type: 'Practical',
      pages: 5,
      downloads: 567,
      rating: 4.9,
      size: '1.5 MB',
      format: 'PDF',
      difficulty: 'Advanced',
      topics: ['Mechanics', 'Electricity', 'Waves', 'Experiments']
    }
  ]

  const cheatSheets = [
    {
      id: 1,
      title: 'Algebra Formulas Quick Reference',
      subject: 'Mathematics',
      description: 'Essential algebra formulas and equations for Grades 8-12',
      downloads: 2341,
      rating: 4.9,
      size: '0.5 MB',
      pages: 2,
      topics: ['Quadratic Formula', 'Factoring', 'Linear Equations']
    },
    {
      id: 2,
      title: 'English Grammar Rules',
      subject: 'English',
      description: 'Complete grammar reference with examples and common mistakes',
      downloads: 1876,
      rating: 4.7,
      size: '0.8 MB',
      pages: 4,
      topics: ['Tenses', 'Punctuation', 'Parts of Speech']
    },
    {
      id: 3,
      title: 'Periodic Table with Properties',
      subject: 'Science',
      description: 'Comprehensive periodic table with element properties and trends',
      downloads: 1654,
      rating: 4.8,
      size: '1.2 MB',
      pages: 1,
      topics: ['Elements', 'Atomic Structure', 'Chemical Properties']
    },
    {
      id: 4,
      title: 'Physics Formulas Collection',
      subject: 'Physics',
      description: 'All essential physics formulas organized by topic',
      downloads: 1432,
      rating: 4.6,
      size: '0.7 MB',
      pages: 3,
      topics: ['Mechanics', 'Electricity', 'Thermodynamics']
    }
  ]

  const practiceProblems = [
    {
      id: 1,
      title: 'Calculus Practice Problems',
      subject: 'Mathematics',
      description: '50 calculus problems with step-by-step solutions',
      difficulty: 'Advanced',
      problems: 50,
      timeEstimate: '3-4 hours',
      topics: ['Derivatives', 'Integrals', 'Limits']
    },
    {
      id: 2,
      title: 'Chemistry Stoichiometry Worksheets',
      subject: 'Science',
      description: 'Practice problems for chemical calculations and reactions',
      difficulty: 'Intermediate',
      problems: 30,
      timeEstimate: '2-3 hours',
      topics: ['Molar Mass', 'Chemical Equations', 'Limiting Reagents']
    },
    {
      id: 3,
      title: 'English Essay Writing Prompts',
      subject: 'English',
      description: 'Creative and analytical essay prompts with writing guidelines',
      difficulty: 'Intermediate',
      problems: 25,
      timeEstimate: '1-2 hours',
      topics: ['Argumentative Essays', 'Descriptive Writing', 'Analysis']
    }
  ]

  const subjectIcons = {
    'Mathematics': Calculator,
    'English': BookOpen,
    'Science': Beaker,
    'Geography': Globe,
    'History': Users,
    'Physics': Zap
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800'
      case 'Intermediate': return 'bg-blue-100 text-blue-800'
      case 'Advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredPapers = pastPapers.filter(paper => {
    const matchesSearch = paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         paper.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesSubject = selectedSubject === 'all' || paper.subject === selectedSubject
    const matchesGrade = selectedGrade === 'all' || paper.grade === selectedGrade
    const matchesYear = selectedYear === 'all' || paper.year === selectedYear
    return matchesSearch && matchesSubject && matchesGrade && matchesYear
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Resources Library</h1>
            <p className="text-muted-foreground text-lg">
              Access past exam papers, study guides, cheat sheets, and practice problems for all subjects
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="past-papers" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="past-papers">Past Papers</TabsTrigger>
            <TabsTrigger value="study-guides">Study Guides</TabsTrigger>
            <TabsTrigger value="practice">Practice Problems</TabsTrigger>
          </TabsList>

          <TabsContent value="past-papers" className="mt-6">
            {/* Search and Filters */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div className="lg:col-span-2 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search papers or topics..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Subjects" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Subjects</SelectItem>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Science">Science</SelectItem>
                      <SelectItem value="Geography">Geography</SelectItem>
                      <SelectItem value="History">History</SelectItem>
                      <SelectItem value="Physics">Physics</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Grades" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Grades</SelectItem>
                      <SelectItem value="Grade 8">Grade 8</SelectItem>
                      <SelectItem value="Grade 9">Grade 9</SelectItem>
                      <SelectItem value="Grade 10">Grade 10</SelectItem>
                      <SelectItem value="Grade 11">Grade 11</SelectItem>
                      <SelectItem value="Grade 12">Grade 12</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Years" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Years</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2022">2022</SelectItem>
                      <SelectItem value="2021">2021</SelectItem>
                      <SelectItem value="2020">2020</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Results Summary */}
            <div className="mb-6">
              <p className="text-muted-foreground">
                Showing {filteredPapers.length} of {pastPapers.length} past papers
              </p>
            </div>

            {/* Past Papers Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPapers.map((paper) => {
                const SubjectIcon = subjectIcons[paper.subject as keyof typeof subjectIcons] || FileText
                return (
                  <Card key={paper.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                            <SubjectIcon className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-lg leading-tight">{paper.title}</CardTitle>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">{paper.grade}</Badge>
                              <Badge variant="outline" className="text-xs">{paper.year}</Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Type</span>
                        <Badge className={getDifficultyColor(paper.difficulty)}>{paper.type}</Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Pages</span>
                          <div className="font-semibold">{paper.pages}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Size</span>
                          <div className="font-semibold">{paper.size}</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{paper.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Download className="h-3 w-3" />
                          <span>{paper.downloads}</span>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Topics covered:</p>
                        <div className="flex flex-wrap gap-1">
                          {paper.topics.slice(0, 3).map((topic, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {topic}
                            </Badge>
                          ))}
                          {paper.topics.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{paper.topics.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button className="flex-1" size="sm">
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3 mr-1" />
                          Preview
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="study-guides" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cheatSheets.map((sheet) => {
                const SubjectIcon = subjectIcons[sheet.subject as keyof typeof subjectIcons] || FileText
                return (
                  <Card key={sheet.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                          <SubjectIcon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{sheet.title}</CardTitle>
                          <Badge variant="outline" className="text-xs mt-1">{sheet.subject}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground text-sm">{sheet.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Pages</span>
                          <div className="font-semibold">{sheet.pages}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Size</span>
                          <div className="font-semibold">{sheet.size}</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{sheet.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Download className="h-3 w-3" />
                          <span>{sheet.downloads}</span>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Includes:</p>
                        <div className="flex flex-wrap gap-1">
                          {sheet.topics.map((topic, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button className="w-full" size="sm">
                        <Download className="h-3 w-3 mr-1" />
                        Download Guide
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="practice" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {practiceProblems.map((practice) => {
                const SubjectIcon = subjectIcons[practice.subject as keyof typeof subjectIcons] || FileText
                return (
                  <Card key={practice.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                          <SubjectIcon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{practice.title}</CardTitle>
                          <Badge variant="outline" className="text-xs mt-1">{practice.subject}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground text-sm">{practice.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Problems</span>
                          <div className="font-semibold">{practice.problems}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Time</span>
                          <div className="font-semibold">{practice.timeEstimate}</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <Badge className={getDifficultyColor(practice.difficulty)}>
                          {practice.difficulty}
                        </Badge>
                        <div className="flex items-center gap-1 text-muted-foreground text-sm">
                          <Clock className="h-3 w-3" />
                          <span>Self-paced</span>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Topics:</p>
                        <div className="flex flex-wrap gap-1">
                          {practice.topics.map((topic, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button className="w-full" size="sm">
                        Start Practice
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <Card className="mt-12 bg-gradient-to-r from-primary/5 to-accent/5">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Need More Resources?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Can't find what you're looking for? Request specific past papers or study materials, 
              and we'll do our best to add them to our library.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">Request Resources</Button>
              <Button variant="outline" size="lg">Contribute Materials</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ResourcesPage