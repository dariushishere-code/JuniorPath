import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './store/useStore';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import { Login, Signup } from './pages/Auth';
import StackSelection from './pages/StackSelection';
import Roadmap from './pages/Roadmap';
import ProjectDetail from './pages/ProjectDetail';
import Flashcards from './pages/Flashcards';
import Dashboard from './pages/Dashboard';
import SuggestProject from './pages/SuggestProject';
import SnakeGame from './pages/SnakeGame';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0A0A0A] text-white">
        <Navbar />
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
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
