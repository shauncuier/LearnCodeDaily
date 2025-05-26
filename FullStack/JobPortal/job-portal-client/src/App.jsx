import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LoadingSpinner from './components/ui/LoadingSpinner';
import { Suspense, lazy } from 'react';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const Jobs = lazy(() => import('./pages/jobs/Jobs'));
const JobDetails = lazy(() => import('./pages/jobs/JobDetails'));
const AddJob = lazy(() => import('./pages/jobs/AddJob'));
const UpdateJob = lazy(() => import('./pages/jobs/UpdateJob'));
const MyJobs = lazy(() => import('./pages/jobs/MyJobs'));
const JobApplications = lazy(() => import('./pages/jobs/JobApplications'));
const ApplyJob = lazy(() => import('./pages/applications/ApplyJob'));
const MyApplications = lazy(() => import('./pages/applications/MyApplications'));
const Profile = lazy(() => import('./pages/user/Profile'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router>
            <div className="min-h-screen bg-gray-50 flex flex-col">
              <Navbar />
              
              <main className="flex-grow">
                <Suspense 
                  fallback={
                    <div className="flex items-center justify-center min-h-[400px]">
                      <LoadingSpinner size="lg" />
                    </div>
                  }
                >
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    
                    {/* Protected Routes */}
                    <Route 
                      path="/jobs" 
                      element={
                        <ProtectedRoute>
                          <Jobs />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/jobs/details/:id" 
                      element={
                        <ProtectedRoute>
                          <JobDetails />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/add-jobs" 
                      element={
                        <ProtectedRoute>
                          <AddJob />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/jobs/update/:id" 
                      element={
                        <ProtectedRoute>
                          <UpdateJob />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/my-jobs" 
                      element={
                        <ProtectedRoute>
                          <MyJobs />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/my-jobs/:id" 
                      element={
                        <ProtectedRoute>
                          <JobApplications />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/application/apply/:id" 
                      element={
                        <ProtectedRoute>
                          <ApplyJob />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/application/me" 
                      element={
                        <ProtectedRoute>
                          <MyApplications />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/profile" 
                      element={
                        <ProtectedRoute>
                          <Profile />
                        </ProtectedRoute>
                      } 
                    />
                    
                    {/* 404 Route */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </main>
              
              <Footer />
            </div>
            
            {/* Toast Notifications */}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  style: {
                    background: '#10b981',
                  },
                },
                error: {
                  style: {
                    background: '#ef4444',
                  },
                },
              }}
            />
          </Router>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
