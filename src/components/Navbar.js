import {Link} from 'react-router-dom';

const Navbar = () => {
    return ( 
        <nav className="navbar">
            <h1>The Lecture Managment System</h1>
            <div className="links">
                <Link to="/teachers">Teachers</Link>
                <Link to="/subjects">Subjects</Link>
                <Link to="/lectures">Lectures</Link>
            </div>
        </nav>
    );
}
 
export default Navbar;