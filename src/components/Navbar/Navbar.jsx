import { slide as Menu } from 'react-burger-menu'
import contestantsIcon from "../../assets/logos/contestants.png"
import challengeIcon from "../../assets/logos/challenge.png"
import './Navbar.scss'

const Navbar = () => {

    return (
        <>
        <Menu>
        <a id="home" className="menu-item" href="/">
            <img className="navbar__contestant" src={contestantsIcon} alt="icon of a person"/>
            Contestants</a>
        <a id="challenges" className="menu-item" href="/challenges">
            <img className="navbar__challenge" src={challengeIcon} alt="icon of rocket ship"/>
            Challenges</a>
        </Menu>
        </>
    )
}

export default Navbar;