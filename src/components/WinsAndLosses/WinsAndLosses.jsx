import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../../utils/apiClient';
import './WinsAndLosses.scss'

const WinsAndLosses = ({ selectedContestant, isInSidebar }) => {
    const [challengesWon, setChallengesWon] = useState([]);
    const [challengesLost, setChallengesLost] = useState([]);
    const [fetchError, setFetchError] = useState(false);
    const { id } = useParams();

    const contestantId = selectedContestant ? selectedContestant.id : id;

    useEffect(() => {
        const fetchChallengesWon = async () => {
            try {
                const { data } = await axiosInstance.get(`/challenges-won/${contestantId}`);
                setChallengesWon(data)
            } catch (error) {
                console.log(`Error retrieving challenges won`, error);
                setFetchError(true)
            }
        }

        const fetchChallengesLost = async () => {
            try {
                const { data } = await axiosInstance.get(`/challenges-lost/${contestantId}`);
                setChallengesLost(data);
            } catch (error) {
                console.log(`Error retrieving challenges lost`, error);
                setFetchError(true)
            }
        }

        fetchChallengesWon();
        fetchChallengesLost();
    }, [contestantId])

    
    if (challengesWon.length === 0 && challengesLost.length === 0) {
        return <h3 className="page-loading-text">Loading...</h3>
    }
    
    if (fetchError === true) {
        return <p className="fetch-error-text">Sorry, our servers are having a hard time retrieving the challenges. Please come back later.</p>
    }

    return (
        <>
        <div className="wins">
            <h5 className={`wins__label ${isInSidebar && `wins__label--sidebar`}`}>Wins</h5>
                {challengesWon.length === 0 ? (
                    <p>No wins recorded.</p>
                ) : (
                    <ul className="wins__list-wrapper">
                    {challengesWon.map((challenge) => 
                        (
                            <li key={challenge.id} className={`wins__list-item ${isInSidebar && `wins__list-item--sidebar`}`}>{challenge.name}</li>
                        )
                    )}
                    </ul>
                )}
        </div>
        <div className="losses">
            <h5 className={`losses__label ${isInSidebar && `losses__label--sidebar`}`}>Losses</h5>
                {challengesLost.length === 0 ? (
                    <p>No losses recorded.</p>
                ) : (
                    <ul className="losses__list-wrapper">
                    {challengesLost.map((challenge) => 
                        (
                            <li key={challenge.id} className={`losses__list-item ${isInSidebar && `losses__list-item--sidebar`}`}>{challenge.name}</li>
                        )
                    )}
                    </ul>
                )}
        </div>
        </>
    )
};

export default WinsAndLosses