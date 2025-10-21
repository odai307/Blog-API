import './Navbar.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='navbar'>
        <div className="nav-brand">
            <Link to='/'>MyPosts</Link>
        </div>
    </nav>
  )
}

export default Navbar
