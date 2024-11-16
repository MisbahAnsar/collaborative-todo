import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from "./pages/Signup";
import Hero from "./pages/Hero";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Hero />
          } 
        />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  )
}

export default App