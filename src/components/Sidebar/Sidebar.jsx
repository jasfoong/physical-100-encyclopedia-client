import ContestantDetailsPage from '../../pages/ContestantDetailsPage/ContestantDetailsPage';
import './Sidebar.scss'

const Sidebar = ({ selectedContestant, closeSidebar }) => {
    return (
        <aside className="sidebar">
            <button className="sidebar__close-btn" onClick={closeSidebar}>X</button>
            <ContestantDetailsPage contestant={selectedContestant}/>
        </aside>
    )
}

export default Sidebar;