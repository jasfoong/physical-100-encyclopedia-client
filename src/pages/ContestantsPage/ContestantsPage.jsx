import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../utils/apiClient'
import sortArray from 'sort-array';
import Navbar from '../../components/Navbar/Navbar'
import FilterChips from '../../components/FilterChips/FilterChips';
import Sidebar from '../../components/Sidebar/Sidebar'
import './ContestantsPage.scss'

const ContestantsPage = () => {
    const [fetchedContestants, setFetchedContestants] = useState([]);
    const [fetchError, setFetchError] = useState(false);
    const [renderedContestants, setRenderedContestants] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
    const [careerCategories, setCareerCategories] = useState([]);
    const [selectedContestant, setSelectedContestant] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchContestants = async () => {
            try {
                const { data } = await axiosInstance.get("/contestants");
                setFetchedContestants(data);
                setRenderedContestants(data)
                
                const uniqueCategories = [...new Set(data.map(contestant => contestant.career_category))];
                setCareerCategories(uniqueCategories);
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

        const sortedData = sortArray([...renderedContestants], {
            by: key,
            order: direction
        });

        setRenderedContestants(sortedData);
        setSortConfig({ key, direction });
    };

    const filterContestants = (category) => {
        if (category === null) {
            setRenderedContestants(fetchedContestants);
        } else {
            const filteredContestants = fetchedContestants.filter(contestant => contestant.career_category === category)
            setRenderedContestants(filteredContestants);
        }
    };
      
    const handleContestantClick = (contestant) => {
        if (window.innerWidth >= 1280) {
            setSelectedContestant(contestant)
        } else {
            navigate(`/contestants/${contestant.id}`)
        }
    };

    const closeSidebar = () => {
        setSelectedContestant(null)
    };

    if (fetchedContestants.length === 0) {
        return <h3 className="page-loading-text">Loading...</h3>
    };

    if (fetchError === true) {
        return <p className="fetch-error-text">Sorry, our servers are having a hard time retrieving the contestants. Please come back later.</p>
    };

    return (
        <>
        <Navbar />
        <section className="contestants">
        <Link to="/"><h1 className="contestants__heading">Contestants</h1></Link>
        <FilterChips careerCategories={careerCategories} filterContestants={filterContestants}/>
        <div className="contestants__column-headings-wrapper-lg">
            <h3 onClick={() => {sortColumns("name")}}className="contestants__column-heading-lg contestants__column-heading-lg--name">Name {sortConfig.key === "name" && (sortConfig.direction === "asc" ? "▲" : "▼")}</h3>
            <h3 className="contestants__column-heading-lg">Season</h3>
            <h3 className="contestants__column-heading-lg">Career</h3>
        </div>
        {
            renderedContestants.map((contestant) => {
                return (
                <div className="contestants__instance" key={contestant.id} onClick={() => handleContestantClick(contestant)}>
                    <img className="contestants__img" src={`${process.env.REACT_APP_SERVER_URL}/${contestant.photo}`} alt={contestant.name}/>
                    <h4 className="contestants__text contestants__name">{contestant.name}</h4>
                    <h4 className="contestants__text">Season {contestant.season}</h4>
                    <h4 className="contestants__text">{contestant.career}</h4>
                </div>
                )
            })
        }
        </section>
        {selectedContestant && <Sidebar selectedContestant={selectedContestant} closeSidebar={closeSidebar}/>}
        </>
    )
}

export default ContestantsPage;