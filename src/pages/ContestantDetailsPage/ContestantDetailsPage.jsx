import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useContestants } from '../../contexts/ContestantContext';
import Navbar from '../../components/Navbar/Navbar'
import ContestantStats from '../../components/ContestantStats/ContestantStats';
import './ContestantDetailsPage.scss'

const ContestantDetailsPage = ({ selectedContestant, isInSidebar }) => {
    const { id } = useParams();
    const { contestants, loading, error } = useContestants();
    const [contestant, setContestant] = useState(selectedContestant || null);
    const [fetchError, setFetchError] = useState(false);

    useEffect(() => {
        if (selectedContestant) {
            setContestant(selectedContestant);
        } 
        else if (id) {
            const fetchedContestant = contestants.find(c => c.id === parseInt(id));

            if (fetchedContestant) {
                setContestant(fetchedContestant);  
            } else {
                fetch(`${process.env.REACT_APP_SERVER_URL}contestants/${id}`)
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error('Error fetching contestant');
                        }
                        return response.json();
                    })
                    .then((data) => {
                        setContestant(data);  
                    })
                    .catch((err) => {
                        console.error('Fetch error:', err);
                        setFetchError(true);  
                    });
            }
        }
    }, [selectedContestant, id, contestants])

    if (loading) {
        return <h3 className="page-loading-text">Loading...</h3>
    }

    if (error || fetchError || !contestant) {
        return (
            <>
            <Navbar />
            <p className="fetch-error-text">Sorry, our servers are having a hard time retrieving your contestant's information. Please come back later.</p>
            </>
        )
    }

    return (
        <>
        { !isInSidebar && <Navbar /> }
            <section className={`contestant ${isInSidebar && "contestant--sidebar-style"}`}>
                <div className="contestant--left">
                    <Link to={`/contestants/${contestant.id}`}>
                        <img className={`contestant__img ${isInSidebar && "contestant__img--sidebar-style"}`} src={`${process.env.REACT_APP_SERVER_URL}/${contestant.photo}`} alt={contestant.name}/>
                    </Link>
                </div>
                <div className="contestant--right">
                    <h1 className="contestant__name">{contestant.name}</h1>
                    <p className="contestant__description">{contestant.description}</p>
                </div>
            </section>
            <ContestantStats selectedContestant={selectedContestant} isInSidebar={isInSidebar}/>
        </>
    )
}

export default ContestantDetailsPage;