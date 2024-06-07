import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { slide as Menu } from 'react-burger-menu'
import contestantsIcon from "../../assets/logos/contestants.png"
import challengeIcon from "../../assets/logos/challenge.png"
import statsIcon from "../../assets/logos/charts.png"
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
                <img className="navbar__contestant" src={contestantsIcon} alt="icon of a person"/>
                Contestants</a>
            <a id="challenges" className="menu-item" href="/challenges">
                <img className="navbar__challenge" src={challengeIcon} alt="icon of rocket ship"/>
                Challenges</a>
            <a id="stats" className="menu-item" href="/stats">
                <img className="navbar__stat" src={statsIcon} alt="icon of toggle bars"/>
                Stats</a>
            </Menu>
        ) : (
        <section className="navbar">
            <Link to="/" className="navbar__contestant-wrapper">
                <div>
                    <img className="navbar__contestant" src={contestantsIcon} alt="icon of a person"/>
                </div>
            </Link>
            <Link to="/challenges" className="navbar__challenge-wrapper">
                <div>
                    <img className="navbar__challenge" src={challengeIcon} alt="icon of rocket ship"/>
                </div>
            </Link>
            <Link to="/stats" className="navbar__stat-wrapper">
                <div>
                    <img className="navbar__stat" src={statsIcon} alt="icon of toggle bars"/>
                </div>
            </Link>
        </section>
        )}
        </>
    )
}

export default Navbar;