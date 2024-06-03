import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { axiosInstance } from '../../utils/apiClient'
import Header from '../../components/Header/Header'
import './ChallengeDetailsPage.scss'

const ContestantDetailsPage = () => {
    const { id } = useParams();
    const [challenge, setChallenge] = useState({});
    const [fetchError, setFetchError] = useState(false);

    useEffect(() => {
            const fetchChallenge = async () => {
                try {
                    const { data } = await axiosInstance.get(`/challenges/${id}`);
                    setChallenge(data[0]);
                } catch (error) {
                    console.log(`Error retrieving challenge information`, error);
                    setFetchError(true);
                }
            };
            fetchChallenge();
        }, [id]);
        
        if (!challenge) {
            return <h3>Loading...</h3>
        }

        if (fetchError === true) {
            return <p>Sorry, our servers are having a hard time retrieving the challenge information. Please come back later.</p>
        }

        return (
        <>
        <Header />
        <section className="challenge">
            <div className="challenge--left">
                <img className="challenge__img" src={`${process.env.REACT_APP_SERVER_URL}/${challenge.photo}`} alt="challenge background"/>
            </div>
            <div className="challenge--right">
                <h1 className="challenge__name">{challenge.name}</h1>
                <p className="challenge__description">{challenge.description}</p>
            </div>
        </section>
        </>
    )
}

export default ContestantDetailsPage;