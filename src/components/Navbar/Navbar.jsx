import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { slide as Menu } from 'react-burger-menu'
import homeIcon from "../../assets/logos/home.png"
import challengeIcon from "../../assets/logos/challenge.png"
import './Navbar.scss'

const Navbar = () => {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1280);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1280);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
        {isDesktop ? (
            <Menu>
            <a id="home" className="menu-item" href="/">
                <img className="navbar__home" src={homeIcon} alt="icon of a house"/>
                Home</a>
            <a id="challenges" className="menu-item" href="/challenges">
                <img className="navbar__challenge" src={challengeIcon} alt="icon of rocket ship"/>
                Challenges</a>
            </Menu>
        ) : (
        <section className="navbar">
            <Link to="/" className="navbar__home-wrapper">
                <div>
                    <img className="navbar__home" src={homeIcon} alt="icon of a house"/>
                </div>
            </Link>
            <Link to="/challenges" className="navbar__challenge-wrapper">
                <div>
                    <img className="navbar__challenge" src={challengeIcon} alt="icon of rocket ship"/>
                </div>
            </Link>
        </section>
        )}
        </>
    )
}

export default Navbar;