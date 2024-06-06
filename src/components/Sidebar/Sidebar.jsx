import ContestantDetailsPage from '../../pages/ContestantDetailsPage/ContestantDetailsPage';
import ContestantStats from '../ContestantStats/ContestantStats'
import './Sidebar.scss'

const Sidebar = ({ selectedContestant, closeSidebar }) => {
    return (
        <aside className="sidebar">
            <button className="sidebar__close-btn" onClick={closeSidebar}>X</button>
            <ContestantDetailsPage selectedContestant={selectedContestant} isInSidebar={true}/>
            <ContestantStats selectedContestant={selectedContestant}/>
        </aside>
    )
}

export default Sidebar;