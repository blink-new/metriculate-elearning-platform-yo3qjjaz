import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from './components/ui/sonner'
import { AuthProvider } from './contexts/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AdminRoute } from './components/AdminRoute'
import { AdminBootstrap } from './components/AdminBootstrap'
import HomePage from './pages/HomePage'
import SubjectPage from './pages/SubjectPage'
import SubjectsPage from './pages/SubjectsPage'
import StudyPlannerPage from './pages/StudyPlannerPage'
import ProgressDashboardPage from './pages/ProgressDashboardPage'
import CommunityPage from './pages/CommunityPage'
import MotivationPage from './pages/MotivationPage'
import ResourcesPage from './pages/ResourcesPage'
import AchievementsPage from './pages/AchievementsPage'
import AdminDashboard from './pages/admin/AdminDashboard'
import SubjectsManagement from './pages/admin/SubjectsManagement'
import SubjectForm from './pages/admin/SubjectForm'
import Navigation from './components/Navigation'
import AdminNavigation from './components/AdminNavigation'
import { useAuth } from './hooks/useAuth'

function AppContent() {
  const location = useLocation()
  const { user } = useAuth()
  
  // Check if we're in admin area
  const isAdminArea = location.pathname.startsWith('/admin')
  
  // Only show navigation if user is authenticated OR not on home page
  const showNavigation = user && location.pathname !== '/' && !isAdminArea
  const showAdminNavigation = user && isAdminArea

  return (
    <div className="min-h-screen bg-background">
      {showNavigation && <Navigation />}
      {showAdminNavigation && <AdminNavigation />}
      <main className={showAdminNavigation ? 'lg:ml-64' : ''}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/subjects" element={
            <ProtectedRoute>
              <SubjectsPage />
            </ProtectedRoute>
          } />
          <Route path="/subject/:subjectId" element={
            <ProtectedRoute>
              <SubjectPage />
            </ProtectedRoute>
          } />
          <Route path="/planner" element={
            <ProtectedRoute>
              <StudyPlannerPage />
            </ProtectedRoute>
          } />
          <Route path="/progress" element={
            <ProtectedRoute>
              <ProgressDashboardPage />
            </ProtectedRoute>
          } />
          <Route path="/community" element={
            <ProtectedRoute>
              <CommunityPage />
            </ProtectedRoute>
          } />
          <Route path="/motivation" element={
            <ProtectedRoute>
              <MotivationPage />
            </ProtectedRoute>
          } />
          <Route path="/resources" element={
            <ProtectedRoute>
              <ResourcesPage />
            </ProtectedRoute>
          } />
          <Route path="/achievements" element={
            <ProtectedRoute>
              <AchievementsPage />
            </ProtectedRoute>
          } />
          
          {/* Admin Routes */}
          <Route path="/admin/bootstrap" element={
            <ProtectedRoute>
              <AdminBootstrap />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } />
          <Route path="/admin/subjects" element={
            <AdminRoute>
              <SubjectsManagement />
            </AdminRoute>
          } />
          <Route path="/admin/subjects/new" element={
            <AdminRoute>
              <SubjectForm />
            </AdminRoute>
          } />
          <Route path="/admin/subjects/:id/edit" element={
            <AdminRoute>
              <SubjectForm />
            </AdminRoute>
          } />
        </Routes>
      </main>
      <Toaster />
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  )
}

export default App