import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './components/MainLayout';
// Navbar removed in favor of Sidebar in MainLayout
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Ideas from './pages/Ideas';
import NewIdea from './pages/NewIdea';
import Captions from './pages/Captions';
import Posts from './pages/Posts';
import NewPost from './pages/NewPost';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Protected Routes wrapped in MainLayout */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Dashboard />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/ideas"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Ideas />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/captions"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Captions />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/posts"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Posts />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/analytics"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Analytics />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Settings />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Profile />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile/edit"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <EditProfile />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            {/* Sub-pages wrapped in MainLayout */}
            <Route
              path="/ideas/new"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <NewIdea />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/captions/new"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Captions />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/posts/new"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <NewPost />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/posts/:id"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <div className="container page">
                      <h1>📝 Post Details</h1>
                      <p>Post details page coming soon...</p>
                    </div>
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
