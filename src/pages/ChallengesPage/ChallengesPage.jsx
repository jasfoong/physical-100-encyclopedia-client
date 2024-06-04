import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../../utils/apiClient'
import Navbar from '../../components/Navbar/Navbar'
import './ChallengesPage.scss'

const ChallengesPage = () => {
    const [challenges, setChallenges] = useState([]);
    const [fetchError, setFetchError] = useState(false);

    useEffect(() => {
        const fetchChallenges = async () => {
            try {
                const { data } = await axiosInstance.get("/challenges");
                setChallenges(data);
            } catch (error) {
                console.log(`Error retrieving challenges`, error);
                setFetchError(true);
            }
        };
        fetchChallenges();
    }, []);
        
    if (challenges.length === 0) {
        return <h3>Loading...</h3>
    }

    if (fetchError === true) {
        return <p>Sorry, our servers are having a hard time retrieving the challenges. Please come back later.</p>
    }

    return (
        <>
        <Navbar />
        <section className="challenges">
        <h1 className="challenges__heading">Challenges</h1>
        <div className="challenges__column-headings-wrapper-lg">
            <h2 className="challenges__column-heading-lg challenges__column-heading-lg--title">Title</h2>
            <h2 className="challenges__column-heading-lg">Season</h2>
            <h2 className="challenges__column-heading-lg">Team/Solo</h2>
        </div>
        {
            challenges.map((challenge) => {
                return (
                <Link to={`/challenges/${challenge.id}`} key={challenge.id} className="challenges__instance-link">
                    <div className="challenges__instance">
                    <img className="challenges__img" src={`${process.env.REACT_APP_SERVER_URL}/${challenge.photo}`} alt="challenge context"/>
                    <h3 className="challenges__text challenges__name">{challenge.name}</h3>
                    <h4 className="challenges__text">Season {challenge.season}</h4>
                    <h4 className="challenges__text">{challenge.team ? "Team" : "Solo"}</h4>
                </div>
                </Link>
                )
            })
        }
        </section>
        </>
    )
}

export default ChallengesPage;