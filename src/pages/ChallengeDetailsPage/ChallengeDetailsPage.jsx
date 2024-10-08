import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useChallenges } from '../../contexts/ChallengeContext';
import Navbar from '../../components/Navbar/Navbar'
import './ChallengeDetailsPage.scss'

const ContestantDetailsPage = ({ selectedChallenge, isInSidebar }) => {
    const { id } = useParams();
    const { challenges, loadingChallenge, errorChallenge } = useChallenges();
    const [challenge, setChallenge] = useState(selectedChallenge || null);
    const [fetchError, setFetchError] = useState(false);

    useEffect(() => {
        if (!selectedChallenge && id) {
            if (challenges.length === 0) {
                fetch(`${process.env.REACT_APP_SERVER_URL}/challenges/${id}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => {
                        setChallenge(data);
                    })
                    .catch(err => {
                        console.error('Fetch error:', err);
                        setFetchError(true);
                    });
            } else {
                const fetchedChallenge = challenges.find(challenge => challenge.id === parseInt(id))
    
                if (fetchedChallenge) {
                    setChallenge(fetchedChallenge)
                } else {
                    setFetchError(true)
                }
            }
        } else {
            setChallenge(selectedChallenge)
        }
    }, [selectedChallenge, id, challenges]);
    
    if (loadingChallenge) {
        return <h3 className="page-loading-text">Loading...</h3>
    }

    if (errorChallenge || fetchError || !challenge) {
        return (
            <>
            <Navbar />
            <p className="fetch-error-text">Sorry, our servers are having a hard time retrieving the challenge information. Please come back later.</p>
            </>
        )
    }

    return (
        <>
        { !isInSidebar && <Navbar /> }
            <section className={`challenge ${isInSidebar && "challenge--sidebar-style"}`}>
                <div className="challenge--left">
                    <Link to={`/challenges/${challenge.id}`}><img className={`challenge__img ${isInSidebar && "challenge__img--sidebar-style"}`} src={`${process.env.REACT_APP_SERVER_URL}/${challenge.photo}`} alt="challenge background"/></Link>
                </div>
                <div className="challenge--right">
                    <Link to={`/challenges/${challenge.id}`}><h1 className="challenge__name">{challenge.name}</h1></Link>
                    <p className="challenge__description">{challenge.description}</p>
                </div>
            </section>
        </>
    )
}

export default ContestantDetailsPage;