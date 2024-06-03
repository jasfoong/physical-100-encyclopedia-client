import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { axiosInstance } from '../../utils/apiClient'
import Header from '../../components/Header/Header'
import './ContestantDetailsPage.scss'

const ContestantDetailsPage = () => {
    const { id } = useParams();
    const [contestant, setContestant] = useState({});
    const [fetchError, setFetchError] = useState(false);

    useEffect(() => {
            const fetchContestant = async () => {
                try {
                    const { data } = await axiosInstance.get(`/contestants/${id}`);
                    setContestant(data);
                } catch (error) {
                    console.log(`Error retrieving your contestant's information`, error);
                    setFetchError(true);
                }
            };
            fetchContestant();
        }, [id]);
        
        if (!contestant) {
            return <h3>Loading...</h3>
        }

        if (fetchError === true) {
            return <p>Sorry, our servers are having a hard time retrieving your contestant's information. Please come back later.</p>
        }

        return (
        <>
        <Header />
        <section className="contestant">
            <div className="contestant--left">
                <img className="contestant__img" src={`${process.env.REACT_APP_SERVER_URL}/${contestant.photo}`} alt="contestant portrait"/>
            </div>
            <div className="contestant--right">
                <h1 className="contestant__name">{contestant.name}</h1>
                <p className="contestant__description">{contestant.description}</p>
            </div>
        </section>
        </>
    )
}

export default ContestantDetailsPage;