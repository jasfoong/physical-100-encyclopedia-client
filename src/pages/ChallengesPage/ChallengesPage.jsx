import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../../utils/apiClient'
import sortArray from 'sort-array';
import Navbar from '../../components/Navbar/Navbar'
import FilterChips from '../../components/FilterChips/FilterChips';
import scrollUpIcon from '../../assets/logos/up-arrow.png'
import './ChallengesPage.scss'

const ChallengesPage = () => {
    const [challenges, setChallenges] = useState([]);
    const [fetchError, setFetchError] = useState(false);
    const [renderedData, setRenderedData] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
    const [scrollVisible, setScrollVisible] = useState(false);

    useEffect(() => {
        const fetchChallenges = async () => {
            try {
                const { data } = await axiosInstance.get("/challenges");
                setChallenges(data);
                setRenderedData(data)
            } catch (error) {
                console.log(`Error retrieving challenges`, error);
                setFetchError(true);
            }
        };
        fetchChallenges();

        window.addEventListener("scroll", handleScrollVisible)
    }, []);

    const handleScrollVisible = () => {
        if (window.scrollY > 100) {
            setScrollVisible(true)
        } else {
            setScrollVisible(false)
        }
    };

    const handleScrollClick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    };

    const sortColumns = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";

        const sortedData = sortArray([...renderedData], {
            by: key,
            order: direction,
            customOrders: {
                [key]: (a, b) => {
                    if (typeof a === 'boolean' && typeof b === 'boolean') {
                        return direction === 'asc' ? a - b : b - a;
                    }
                    return 0;
                }
            }
        });

        setRenderedData(sortedData);
        setSortConfig({ key, direction });
    };

    const filterChallenges = (challengeType) => {
        if (challengeType === "team") {
            const teamChallenges = challenges.filter(challenge => challenge.team === 1);
            setRenderedData(teamChallenges);
            console.log(`team Challenges`, teamChallenges)
        } else if (challengeType === "solo") {
            const soloChallenges = challenges.filter(challenge => challenge.team === 0);
            setRenderedData(soloChallenges);
        } else {
            setRenderedData(challenges);
        }
    }
        
    if (challenges.length === 0) {
        return <h3 className="page-loading-text">Loading...</h3>
    }

    if (fetchError === true) {
        return <p className="fetch-error-text">Sorry, our servers are having a hard time retrieving the challenges. Please come back later.</p>
    }

    return (
        <>
        <Navbar />
        <section className="challenges">
        <Link to="/challenges"><h1 className="challenges__heading">Challenges</h1></Link>
        <FilterChips challenges={challenges} filterChallenges={filterChallenges}/>
        <div className="challenges__column-headings-wrapper-lg">
            <h2 className="challenges__column-heading-lg challenges__column-heading-lg--title" onClick={() => {sortColumns("name")}}>Title {sortConfig.key === "name" && (sortConfig.direction === "asc" ? "▲" : "▼")}</h2>
            <h2 className="challenges__column-heading-lg">Season</h2>
            <h2 className="challenges__column-heading-lg">Team/Solo</h2>
        </div>
        {
            renderedData.map((challenge) => {
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
        {scrollVisible && (
            <div className="challenges__scroll-to-top-wrapper" onClick={handleScrollClick}>
                <img className="challenges__scroll-to-top" src={scrollUpIcon} alt="up arrow"/>
            </div>
        )}
        </section>
        </>
    )
}

export default ChallengesPage;