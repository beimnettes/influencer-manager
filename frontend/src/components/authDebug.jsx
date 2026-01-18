import { useAuth } from '../contexts/AuthContext'; 
// if AuthProvider is in a different folder, adjust path

function AuthDebug() {
  const { user, isAuthenticated, loading } = useAuth();

  return (
    <div style={{ padding: '1rem', border: '1px solid red' }}>
      <p>Loading: {loading ? 'Yes' : 'No'}</p>
      <p>Is Authenticated: {isAuthenticated ? 'Yes' : 'No'}</p>
      <p>User: {user ? JSON.stringify(user) : 'None'}</p>
    </div>
  );
}

export default AuthDebug;
