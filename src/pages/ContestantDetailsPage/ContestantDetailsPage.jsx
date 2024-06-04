import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { axiosInstance } from '../../utils/apiClient'
import Navbar from '../../components/Navbar/Navbar'
import EditForm from '../../components/EditForm/EditForm';
import './ContestantDetailsPage.scss'

const ContestantDetailsPage = () => {
    const { id } = useParams();
    const [contestant, setContestant] = useState({});
    const [fetchError, setFetchError] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editError, setEditError] = useState(false);

    useEffect(() => {
        const fetchContestant = async () => {
            try {
                const { data } = await axiosInstance.get(`/contestants/${id}`);
                const fetchedContestant = data;

                if (JSON.stringify(fetchedContestant) !== JSON.stringify(contestant)) {
                    setContestant(fetchedContestant);
                }
            } catch (error) {
                console.log(`Error retrieving your contestant's information`, error);
                setFetchError(true);
            }
        };
        fetchContestant();
    }, [id, contestant]);
        
    const handleEditClick = () => {
        setIsEditing(true);
    };

    const updateContestant = async (updatedContestant) => {
        try {
            await axiosInstance.put(`/contestants/${id}`, updatedContestant);
            setContestant(updatedContestant);
            setIsEditing(false);
        } catch (error) {
            console.log(`Could not update contestant`, error);
            setEditError(true);
        }
    };

    if (!contestant) {
        return <h3>Loading...</h3>
    };

    if (fetchError === true) {
        return <p>Sorry, our servers are having a hard time retrieving your contestant's information. Please come back later.</p>
    };

    return (
        <>
        <Navbar />
        {isEditing ? (
            <EditForm 
                contestant={contestant}
                setIsEditing={setIsEditing}
                updateContestant={updateContestant}
                editError={editError}
                setEditError={setEditError}
            />
        ) : (
            <section className="contestant">
                <div className="contestant--left">
                    <img className="contestant__img" src={`${process.env.REACT_APP_SERVER_URL}/${contestant.photo}`} alt="contestant portrait"/>
                </div>
                <div className="contestant--right">
                    <h1 className="contestant__name">{contestant.name}</h1>
                    <p className="contestant__description">{contestant.description}</p>
                </div>
                <button className="contestant__edit-btn" onClick={handleEditClick}>Edit</button>
            </section>
        )}
        </>
    )
}

export default ContestantDetailsPage;