import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="project-navbar">
      <div className="project-navbar-content">
        <Link to="/" className="project-logo">Projekthantering</Link>
        <ul className="project-nav-links">
          <li>
            <Link to="/" className="project-nav-link">Hem</Link>
          </li>
          <li>
            <Link to="/projects" className="project-nav-link">Projekt</Link>
          </li>
          <li>
            <Link to="/projects/new" className="project-nav-link">Skapa projekt</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
};

export default Navbar;