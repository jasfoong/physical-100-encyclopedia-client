import ContestantDetailsPage from '../../pages/ContestantDetailsPage/ContestantDetailsPage';
import ChallengeDetailsPage from '../../pages/ChallengeDetailsPage/ChallengeDetailsPage'
import './Sidebar.scss'

const Sidebar = ({ selectedContestant, closeContestantSidebar, selectedChallenge, closeChallengeSidebar }) => {
    return (
        <>
        { selectedContestant && 
            <aside className="sidebar">
                <button className="sidebar__close-btn" onClick={closeContestantSidebar}>X</button>
                <ContestantDetailsPage selectedContestant={selectedContestant} isInSidebar={true}/>
            </aside>    
        }
        { selectedChallenge && 
            <aside className="sidebar">
                <button className="sidebar__close-btn" onClick={closeChallengeSidebar}>X</button>
                <ChallengeDetailsPage selectedChallenge={selectedChallenge} isInSidebar={true}/>
            </aside>
        }   
        </>
    )
}

export default Sidebar;