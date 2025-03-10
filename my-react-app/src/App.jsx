import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/section/Main';
import Home from './pages/Home';
function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<ProjectList />} />
            <Route path="/projects/create" element={<CreateProject />} />
            <Route path="/projects/edit/:id" element={<ProjectEdit />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;