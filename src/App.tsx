import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense, ComponentType, useEffect } from 'react';
import { useStore } from './store/useStore';
import Navbar from './components/Navbar';
import AppDock from './components/AppDock';

// Lazy load pages for code splitting
const Landing = lazy(() => import('./pages/Landing'));
const Login = lazy(() => import('./pages/Auth').then(module => ({ default: module.Login as ComponentType<any> })));
const Signup = lazy(() => import('./pages/Auth').then(module => ({ default: module.Signup as ComponentType<any> })));
const StackSelection = lazy(() => import('./pages/StackSelection'));
const Roadmap = lazy(() => import('./pages/Roadmap'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const Flashcards = lazy(() => import('./pages/Flashcards'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const SuggestProject = lazy(() => import('./pages/SuggestProject'));
const SnakeGame = lazy(() => import('./pages/SnakeGame'));
const InterviewPrep = lazy(() => import('./pages/InterviewPrep'));

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useStore();
  if (isLoading) {
    return <PageLoader />;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

function PageLoader() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function App() {
  const isLoading = useStore((state) => state.isLoading);

  useEffect(() => {
    void useStore.getState().initialize();
  }, []);

  return (
    <BrowserRouter>
      {isLoading ? (
        <PageLoader />
      ) : (
        <div className="min-h-screen bg-[#0A0A0A] text-white pb-28">
          <Navbar />
          <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/stack-selection" element={
              <ProtectedRoute><StackSelection /></ProtectedRoute>
            } />
            <Route path="/roadmap" element={
              <ProtectedRoute><Roadmap /></ProtectedRoute>
            } />
            <Route path="/project/:id" element={
              <ProtectedRoute><ProjectDetail /></ProtectedRoute>
            } />
            <Route path="/flashcards" element={
              <ProtectedRoute><Flashcards /></ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute><Dashboard /></ProtectedRoute>
            } />
            <Route path="/suggest" element={
              <ProtectedRoute><SuggestProject /></ProtectedRoute>
            } />
            <Route path="/snake" element={
              <ProtectedRoute><SnakeGame /></ProtectedRoute>
            } />
            <Route path="/interview-prep" element={
              <ProtectedRoute><InterviewPrep /></ProtectedRoute>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
          <AppDock />
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
