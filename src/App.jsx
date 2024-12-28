import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import AuthenticatedApp from "./components/AuthenticatedApp/AuthenticatedApp";
import Login from './pages/Login/Login';
import NoMatch from "./pages/NoMatch/NoMatch"

const App = () => (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route 
          path="/*" element={
            <ProtectedRoute>
              <AuthenticatedApp /> 
            </ProtectedRoute> 
            
          }/>
          

        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;