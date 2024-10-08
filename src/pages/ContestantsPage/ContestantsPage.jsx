import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContestants } from '../../contexts/ContestantContext';
import sortArray from 'sort-array';
import Navbar from '../../components/Navbar/Navbar'
import FilterChips from '../../components/FilterChips/FilterChips';
import Sidebar from '../../components/Sidebar/Sidebar'
import SearchBar from '../../components/SearchBar/SearchBar';
import scrollUpIcon from '../../assets/logos/up-arrow.png'
import './ContestantsPage.scss'

const ContestantsPage = () => {
    const { contestants, loading, error } = useContestants();
    const [renderedContestants, setRenderedContestants] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
    const [careerCategories, setCareerCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSeason, setSelectedSeason] = useState(null);
    const [selectedContestant, setSelectedContestant] = useState(null);
    const [scrollVisible, setScrollVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const seasons = [...new Set(contestants.map(c => c.season))];
    const navigate = useNavigate();

    useEffect(() => {
        if (contestants.length > 0) {
            setRenderedContestants(contestants);

            const uniqueCategories = [...new Set(contestants.map(contestant => contestant.career_category))];
            setCareerCategories(uniqueCategories);
        } else {
            setRenderedContestants([])
            setCareerCategories([])
        }

        window.addEventListener("scroll", handleScrollVisible)
    }, [contestants]);

    const applyFilters = useCallback((category, season) => {
        let filteredContestants = contestants;
    
        if (category !== null) {
            filteredContestants = filteredContestants.filter(contestant => contestant.career_category === category);
        }
    
        if (season !== null) {
            filteredContestants = filteredContestants.filter(contestant => contestant.season === season);
        }

        if (searchTerm) {
            filteredContestants = filteredContestants.filter(contestant => contestant.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }
    
        if (JSON.stringify(filteredContestants) !== JSON.stringify(renderedContestants)) {
            setRenderedContestants(filteredContestants);
        }
    }, [contestants, renderedContestants, searchTerm]);

    useEffect(() => {
        applyFilters(selectedCategory, selectedSeason, searchTerm);
    }, [selectedCategory, selectedSeason, searchTerm, applyFilters]);

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

        const sortedData = sortArray([...renderedContestants], {
            by: key,
            order: direction
        });

        setRenderedContestants(sortedData);
        setSortConfig({ key, direction });
    };

    const filterContestants = (category) => {
        setSelectedCategory(category);
        applyFilters(category, selectedSeason);
    };
    
    const filterBySeason = (season) => {
        setSelectedSeason(season);
        applyFilters(selectedCategory, season);
    };
      
    const handleContestantClick = (contestant) => {
        if (window.innerWidth >= 1280) {
            setSelectedContestant(contestant)
        } else {
            navigate(`/contestants/${contestant.id}`)
        }
    };

    const closeContestantSidebar = () => {
        setSelectedContestant(null)
    };

    if (loading) {
        return <h3 className="page-loading-text">Loading...</h3>
    };

    if (error) {
        return (
            <>
            <Navbar />
            <p className="fetch-error-text">Sorry, our servers are having a hard time retrieving the contestants. Please come back later.</p>
            </>
        )
    };

    return (
        <main className={`contestants__wrapper ${selectedContestant && "contestants__wrapper--sidebar-open"}`}>
        <div className={`contestants__main ${selectedContestant && "contestants__main--sidebar-open"}`}>
            <Navbar />
            <section className="contestants">
            <Link to="/"><h1 className="contestants__heading">Contestants</h1></Link>
            <FilterChips careerCategories={careerCategories} filterContestants={filterContestants} />
            <div className="contestants__filters-wrapper">
                <FilterChips seasons={seasons} filterBySeason={filterBySeason}/> 
                <SearchBar onSearch={setSearchTerm} />
            </div>
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
            {scrollVisible && (
                <div className="contestants__scroll-to-top-wrapper" onClick={handleScrollClick}>
                <img className="contestants__scroll-to-top" src={scrollUpIcon} alt="up arrow"/>
                </div>
            )}
        </div>
        {selectedContestant && <Sidebar selectedContestant={selectedContestant} closeContestantSidebar={closeContestantSidebar}/>}
        </main>
    )
}

export default ContestantsPage;