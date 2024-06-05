import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useContestants } from '../../contexts/ContestantContext';
import Navbar from '../../components/Navbar/Navbar'
import './ContestantDetailsPage.scss'

const ContestantDetailsPage = ({ selectedContestant, isInSidebar }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { contestants, loading, error } = useContestants();
    const [contestant, setContestant] = useState(selectedContestant || null);
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
    }, [selectedContestant, id, contestants])
        
    const handleEditClick = () => {
        navigate(`/contestants/${contestant.id}/edit`)
    };

    if (loading) {
        return <h3 className="page-loading-text">Loading...</h3>
    }

    if (error || fetchError || !contestant) {
        return <p className="fetch-error-text">Sorry, our servers are having a hard time retrieving your contestant's information. Please come back later.</p>
    }

    return (
        <>
        { !isInSidebar && <Navbar /> }
            <section className={`contestant ${isInSidebar && "contestant--sidebar-style"}`}>
                <div className="contestant--left">
                    <img className={`contestant__img ${isInSidebar && "contestant__img--sidebar-style"}`} src={`${process.env.REACT_APP_SERVER_URL}/${contestant.photo}`} alt={contestant.name}/>
                </div>
                <div className="contestant--right">
                    <h1 className="contestant__name">{contestant.name}</h1>
                    <p className="contestant__description">{contestant.description}</p>
                </div>
                <button className="contestant__edit-btn" onClick={handleEditClick}>Edit</button>
            </section>
        </>
    )
}

export default ContestantDetailsPage;