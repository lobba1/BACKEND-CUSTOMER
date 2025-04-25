import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/section/Navbar";
import ProjectList from "./pages/ProjectList";
import ProjectCreate from "./pages/ProjectCreate";
import ProjectEdit from "./pages/ProjectEdit";
import Home from "./pages/Home";
//AI
function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="project-container">
          <Routes>
            {/* Root route can be a specific home page or redirect to projects */}
            <Route path="/" element={<Navigate to="/projects" replace />} />
            
            {/* Projects routes */}
            <Route path="/projects" element={<ProjectList />} />
            <Route path="/projects/new" element={<ProjectCreate />} />
            <Route path="/projects/edit/:id" element={<ProjectEdit />} />
            
            {/* Optional: Add a 404 Not Found route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

// Optional 404 component
const NotFound = () => {
  return (
    <div>
      <h1>404 - Sidan hittades inte</h1>
      <p>Tyvärr kunde vi inte hitta den sida du letade efter.</p>
      <Link to="/projects">Tillbaka till projektlistan</Link>
    </div>
  );
};

export default App;