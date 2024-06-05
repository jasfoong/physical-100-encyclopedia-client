import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { axiosInstance } from '../../utils/apiClient'
import Navbar from '../../components/Navbar/Navbar'
import EditChallengeForm from '../../components/EditChallengeForm/EditChallengeForm'
import './ChallengeDetailsPage.scss'

const ContestantDetailsPage = () => {
    const { id } = useParams();
    const [challenge, setChallenge] = useState({});
    const [fetchError, setFetchError] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editError, setEditError] = useState(false);

    useEffect(() => {
        const fetchChallenge = async () => {
            try {
                const { data } = await axiosInstance.get(`/challenges/${id}`);
                const fetchedChallenge = data[0];
                
                if (JSON.stringify(fetchedChallenge) !== JSON.stringify(challenge)) {
                    setChallenge(fetchedChallenge);
                }
            } catch (error) {
                console.log(`Error retrieving challenge information`, error);
                setFetchError(true);
            }
        };
        fetchChallenge();
    }, [id, challenge]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const updateChallenge = async (updatedChallenge) => {
        try {
            await axiosInstance.put(`/challenges/${id}`, updatedChallenge);
            setChallenge(updatedChallenge);
            setIsEditing(false);
        } catch (error) {
            console.log(`Could not update challenge`, error);
            setEditError(true);
        }
    };
    
    if (!challenge) {
        return <h3 className="page-loading-text">Loading...</h3>
    }

    if (fetchError === true) {
        return <p className="fetch-error-text">Sorry, our servers are having a hard time retrieving the challenge information. Please come back later.</p>
    }

    return (
        <>
        <Navbar />
        {isEditing ? (
            <EditChallengeForm 
                challenge={challenge}
                setIsEditing={setIsEditing}
                updateChallenge={updateChallenge}
                editError={editError}
                setEditError={setEditError}
            />
        ) : (
            <section className="challenge">
                <div className="challenge--left">
                    <img className="challenge__img" src={`${process.env.REACT_APP_SERVER_URL}/${challenge.photo}`} alt="challenge background"/>
                </div>
                <div className="challenge--right">
                    <h1 className="challenge__name">{challenge.name}</h1>
                    <p className="challenge__description">{challenge.description}</p>
                </div>
                <button className="challenge__edit-btn" onClick={handleEditClick}>Edit</button>
            </section>
        )}
        </>
    )
}

export default ContestantDetailsPage;