import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from "./pages/Signup";
import Hero from "./pages/Hero";
import Login from './pages/Login';
import Home from './pages/Home';
import ProtectedRoute from "./utils/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Hero />
          } 
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/home" 
          element = {
            <ProtectedRoute>
                <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App