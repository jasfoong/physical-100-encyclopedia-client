import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../../utils/apiClient'
import sortArray from 'sort-array';
import Navbar from '../../components/Navbar/Navbar'
import './ContestantsPage.scss'

const ContestantsPage = () => {
    const [contestants, setContestants] = useState([]);
    const [fetchError, setFetchError] = useState(false);
    const [renderedData, setRenderedData] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

    useEffect(() => {
        const fetchContestants = async () => {
            try {
                const { data } = await axiosInstance.get("/contestants");
                setContestants(data);
                setRenderedData(data)
            } catch (error) {
                console.log(`Error retrieving contestants`, error);
                setFetchError(true);
            }
        };
        fetchContestants();
    }, []);

    const sortColumns = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";

        const sortedData = sortArray([...renderedData], {
            by: key,
            order: direction
        });

        setRenderedData(sortedData);
        setSortConfig({ key, direction });
    };
        
        if (contestants.length === 0) {
            return <h3 className="page-loading-text">Loading...</h3>
        }

        if (fetchError === true) {
            return <p className="fetch-error-text">Sorry, our servers are having a hard time retrieving the contestants. Please come back later.</p>
        }

    return (
        <>
        <Navbar />
        <section className="contestants">
        <Link to="/"><h1 className="contestants__heading">Contestants</h1></Link>
        <div className="contestants__column-headings-wrapper-lg">
            <h3 onClick={() => {sortColumns("name")}}className="contestants__column-heading-lg contestants__column-heading-lg--name">Name {sortConfig.key === "name" && (sortConfig.direction === "asc" ? "▲" : "▼")}</h3>
            <h3 className="contestants__column-heading-lg">Season</h3>
            <h3 className="contestants__column-heading-lg" onClick={() => {sortColumns("career")}}>Career {sortConfig.key === "career" && (sortConfig.direction === "asc" ? "▲" : "▼")}</h3>
        </div>
        {
            renderedData.map((contestant) => {
                return (
                <Link to={`/contestants/${contestant.id}`} key={contestant.id} className="contestants__instance-link">
                    <div className="contestants__instance">
                    <img className="contestants__img" src={`${process.env.REACT_APP_SERVER_URL}/${contestant.photo}`} alt="contestant context"/>
                    <h4 className="contestants__text contestants__name">{contestant.name}</h4>
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