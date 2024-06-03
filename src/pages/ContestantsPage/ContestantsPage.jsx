import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../../utils/apiClient'
import Header from '../../components/Header/Header'
import './ContestantsPage.scss'

const ContestantsPage = () => {
    const [contestants, setContestants] = useState([]);
    const [fetchError, setFetchError] = useState(false);

    useEffect(() => {
            const fetchContestants = async () => {
                try {
                    const { data } = await axiosInstance.get("/contestants");
                    setContestants(data);
                } catch (error) {
                    console.log(`Error retrieving contestants`, error);
                    setFetchError(true);
                }
            };
            fetchContestants();
        }, []);
        
        if (contestants.length === 0) {
            return <h3>Loading...</h3>
        }

        if (fetchError === true) {
            return <p>Sorry, our servers are having a hard time retrieving the challenges. Please come back later.</p>
        }

    return (
        <>
        <Header />
        <section className="contestants">
        <h1 className="contestants__heading">Contestants</h1>
        <div className="contestants__column-headings-wrapper-lg">
            <h2 className="contestants__column-heading-lg contestants__column-heading-lg--name">Name</h2>
            <h2 className="contestants__column-heading-lg">Season</h2>
            <h2 className="contestants__column-heading-lg">Career</h2>
        </div>
        {
            contestants.map((contestant) => {
                return (
                <Link to={`/contestants/${contestant.id}`} key={contestant.id} className="contestants__instance-link">
                    <div className="contestants__instance">
                    <img className="contestants__img" src={`${process.env.REACT_APP_SERVER_URL}/${contestant.photo}`} alt="contestant context"/>
                    <h3 className="contestants__text challenges__name">{contestant.name}</h3>
                    <h4 className="contestants__text">Season {contestant.season}</h4>
                    <h4 className="contestants__text">{contestant.career}</h4>
                </div>
                </Link>
                )
            })
        }
        </section>
        </>
    )
}

export default ContestantsPage;