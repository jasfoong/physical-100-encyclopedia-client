import { Link } from "react-router-dom"
import homeIcon from "../../assets/logos/home.png"
import searchIcon from "../../assets/logos/search.png"
import './Navbar.scss'

const Navbar = () => {
    return (
        <section className="navbar">
            <Link to="/" className="navbar__home-wrapper">
                <div >
                    <img className="navbar__home" src={homeIcon} alt="icon of a house"/>
                </div>
            </Link>
            <Link to="/search" className="navbar__search-wrapper">
                <div >
                    <img className="navbar__search" src={searchIcon} alt="icon of a magnifying glass"/>
                </div>
            </Link>
        </section>
    )
}

export default Navbar;