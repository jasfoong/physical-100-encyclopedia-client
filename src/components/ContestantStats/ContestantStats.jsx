import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useContestants } from '../../contexts/ContestantContext';
import './ContestantStats.scss'
import WinsAndLosses from '../WinsAndLosses/WinsAndLosses';

const ContestantStats = ({ selectedContestant, isInSidebar }) => {
    const { id } = useParams();
    const { contestants, loading, error } = useContestants();
    const [contestant, setContestant] = useState(null);
    const [fetchError, setFetchError] = useState(false);

    useEffect(() => {
        if (!selectedContestant && id) {
            const fetchedContestant = contestants.find(contestant => contestant.id === parseInt(id))

            if (fetchedContestant) {
                setContestant(fetchedContestant)
            } else {
                setFetchError(true)
            }
        } else {
            setContestant(selectedContestant)
        }

    }, [selectedContestant, id, contestants]);

    if (loading) {
        return <h3 className="page-loading-text">Loading...</h3>
    }

    if (error || fetchError || !contestant) {
        return <p className="fetch-error-text">Sorry, our servers are having a hard time retrieving your contestant's information. Please come back later.</p>
    }

    return (
        <Link to={`/contestants/${contestant.id}`}><section className="contestant-stats">
            <h3 className="contestant-stats__heading">Stats</h3>
            <div className="contestant-stats__stats-wrapper">
                <div className="contestant-stats__instance">
                    <span className={`contestant-stats__data ${isInSidebar && "contestant-stats__data--sidebar"}`}>{contestant.stats.strength}</span>
                    <h5 className={`contestant-stats__label ${isInSidebar && "contestant-stats__label--sidebar"}`}>Strength</h5>
                    <div className="contestant-stats__bar">
                        <div className="contestant-stats__bar-fill" style={{ width: `${contestant.stats.strength}%` }}></div>
                    </div>
                </div>
                <div className="contestant-stats__instance">
                    <span className={`contestant-stats__data ${isInSidebar && "contestant-stats__data--sidebar"}`}>{contestant.stats.endurance}</span>
                    <h5 className={`contestant-stats__label ${isInSidebar && "contestant-stats__label--sidebar"}`}>Endurance</h5>
                    <div className="contestant-stats__bar">
                        <div className="contestant-stats__bar-fill" style={{ width: `${contestant.stats.endurance}%` }}></div>
                    </div>
                </div>
                <div className="contestant-stats__instance">
                    <span className={`contestant-stats__data ${isInSidebar && "contestant-stats__data--sidebar"}`}>{contestant.stats.speed}</span>
                    <h5 className={`contestant-stats__label ${isInSidebar && "contestant-stats__label--sidebar"}`}>Speed</h5>
                    <div className="contestant-stats__bar">
                        <div className="contestant-stats__bar-fill" style={{ width: `${contestant.stats.speed}%` }}></div>
                    </div>
                </div>
            </div>
            <WinsAndLosses selectedContestant={selectedContestant} isInSidebar={isInSidebar}/>
            <div className="contestant-stats__specialty-wrapper">
                <div className="contestant-stats__instance contestant-stats__specialty-instance">
                    <h5 className={`contestant-stats__label contestant-stats__specialty-label ${isInSidebar && "contestant-stats__label--sidebar"}`}>Specialty</h5>
                    <span className={`contestant-stats__data contestant-stats__specialty-data ${isInSidebar && "contestant-stats__data--sidebar"}`}>{contestant.stats.special_skills}</span>
                </div>
            </div>
        </section> 
        </Link>   
    )
}

export default ContestantStats;