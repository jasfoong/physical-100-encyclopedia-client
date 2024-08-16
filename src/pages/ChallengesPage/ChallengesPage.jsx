import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useChallenges } from '../../contexts/ChallengeContext';
import sortArray from 'sort-array';
import Navbar from '../../components/Navbar/Navbar'
import FilterChips from '../../components/FilterChips/FilterChips';
import Sidebar from '../../components/Sidebar/Sidebar';
import scrollUpIcon from '../../assets/logos/up-arrow.png'
import './ChallengesPage.scss'

const ChallengesPage = () => {
    const { challenges, loadingChallenge, errorChallenge } = useChallenges();
    const [renderedData, setRenderedData] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
    const [scrollVisible, setScrollVisible] = useState(false);
    const [selectedChallenge, setSelectedChallenge] = useState(null)
    const seasons = [...new Set(challenges.map(c => c.season))];
    const navigate = useNavigate();

    useEffect(() => {
        if (challenges.length > 0) {
            setRenderedData(challenges);
        } else {
            setRenderedData([]);
        }
        
        window.addEventListener("scroll", handleScrollVisible)
    }, [challenges]);

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

    const filterBySeason = (season) => {
        if (season === null) {
            setRenderedData(challenges);
        } else {
            const filteredChallengesBySeason = challenges.filter(challenge => challenge.season === season)
            setRenderedData(filteredChallengesBySeason);
        }
    }

    const handleChallengeClick = (challenge) => {
        if (window.innerWidth >= 1280) {
            setSelectedChallenge(challenge)
        } else {
            navigate(`/challenges/${challenge.id}`)
        }
    }

    const closeChallengeSidebar = () => {
        setSelectedChallenge(null)
    }
        
    if (loadingChallenge) {
        return <h3 className="page-loading-text">Loading...</h3>
    }

    if (errorChallenge) {
        return (
            <>
            <Navbar />
            <p className="fetch-error-text">Sorry, our servers are having a hard time retrieving the challenges. Please come back later.</p>
            </>
        )
    }

    return (
        <>
        <main className={`challenges__wrapper ${selectedChallenge && "challenges__wrapper--sidebar-open"}`}>
        <div className={`challenges__main ${selectedChallenge && "challenges__main--sidebar-open"}`}>
            <Navbar />
            <section className="challenges">
            <Link to="/challenges"><h1 className="challenges__heading">Challenges</h1></Link>
            <FilterChips challenges={challenges} filterChallenges={filterChallenges}/>
            <FilterChips seasons={seasons} filterBySeason={filterBySeason}/>
            <div className="challenges__column-headings-wrapper-lg">
                <h2 className="challenges__column-heading-lg challenges__column-heading-lg--title" onClick={() => {sortColumns("name")}}>Title {sortConfig.key === "name" && (sortConfig.direction === "asc" ? "▲" : "▼")}</h2>
                <h2 className="challenges__column-heading-lg">Season</h2>
                <h2 className="challenges__column-heading-lg">Team/Solo</h2>
            </div>
            {
                renderedData.map((challenge) => {
                    return (
                        <div className="challenges__instance" key={challenge.id} onClick={() => handleChallengeClick(challenge)}>
                        <img className="challenges__img" src={`${process.env.REACT_APP_SERVER_URL}/${challenge.photo}`} alt="challenge context"/>
                        <h3 className="challenges__text challenges__name">{challenge.name}</h3>
                        <h4 className="challenges__text">Season {challenge.season}</h4>
                        <h4 className="challenges__text">{challenge.team ? "Team" : "Solo"}</h4>
                    </div>
                    )
                })
            }
            </section>
            {scrollVisible && (
                <div className="challenges__scroll-to-top-wrapper" onClick={handleScrollClick}>
                    <img className="challenges__scroll-to-top" src={scrollUpIcon} alt="up arrow"/>
                </div>
            )}
        </div>
        {selectedChallenge && <Sidebar selectedChallenge={selectedChallenge} closeChallengeSidebar={closeChallengeSidebar}/>}
        </main>
        </>
    )
}

export default ChallengesPage;