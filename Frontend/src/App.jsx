import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import Landing from './pages/Landing';           // Import the page components
import About from './pages/About';

function App() {
  return (
    <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </Router>
  );
}

export default App;
