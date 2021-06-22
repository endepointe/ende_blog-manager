import './Nav.css';
import {
	Link
} from 'react-router-dom';

export default function Nav() {
	return (
    <nav className="nav">
      <ul className="nav-links">
        <li>
          <Link to="/">Post Blog</Link>
        </li>
        <li>
          <Link to="/get-blog">Get Blog</Link>
        </li>
        <li>
          <Link to="/delete-blog">Delete Blog</Link>
        </li>
        <li>
          <Link to="/all-blogs">View All Blogs</Link>
        </li>
      </ul>
    </nav>
	)
}