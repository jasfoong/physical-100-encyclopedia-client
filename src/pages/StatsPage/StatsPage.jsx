import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useContestants } from '../../contexts/ContestantContext'
import Navbar from '../../components/Navbar/Navbar'
import './StatsPage.scss'

const StatsPage = () => {
    const { contestants, loading, error } = useContestants();
    const [contestantsByStrength, setContestantsByStrength] = useState([]);
    const [contestantsByEndurance, setContestantsByEndurance] = useState([]);
    const [contestantsBySpeed, setContestantsBySpeed] = useState([]);

    useEffect(() => {
        if (contestants.length > 0) {
            const sortedByStrength = [...contestants].sort((a, b) => b.stats.strength - a.stats.strength);
            setContestantsByStrength(sortedByStrength.slice(0, 10))
    
            const sortedByEndurance = [...contestants].sort((a, b) => b.stats.endurance - a.stats.endurance);
            setContestantsByEndurance(sortedByEndurance.slice(0, 10))

            const sortedBySpeed = [...contestants].sort((a, b) => b.stats.speed - a.stats.speed)
            setContestantsBySpeed(sortedBySpeed.slice(0, 10))
        }
    }, [contestants])

    if (loading) {
        return <h3 className="page-loading-text">Loading...</h3>
    };

    if (error) {
        return <p className="fetch-error-text">Sorry, our servers are having a hard time retrieving the contestants. Please come back later.</p>
    };

    return (
        <>
        <Navbar />
        <section className="stats">
        <h1 className="stats__heading">Season 2 Stats</h1>
        <div className="stats__tables-wrapper">
            <table className="stats__table">
                <h2 className="stats__subheading">Strength</h2>
                <tr className="stats__table-headings-wrapper">
                    <th className="stats__table-heading stats__table-heading-contestant">Contestant</th>
                    <th className="stats__table-heading stats__table-heading-score">STR</th>
                </tr>
                {contestantsByStrength.map((contestant) => {
                    return (
                        <tr className="stats__table-data-wrapper"> 
                            <Link to={`/contestants/${contestant.id}`} className="stats__table-link">
                                <td className="stats__table-data">
                                    <img className="stats__table-img" src={`${process.env.REACT_APP_SERVER_URL}/${contestant.photo}`} alt={`portrait of ${contestant.name}`}/>
                                    {contestant.name}
                                </td>
                            </Link>
                            <td className="stats__table-data stats__table-data-score">{contestant.stats.strength}</td>
                        </tr>
                    )
                })}
            </table>
            <table className="stats__table">
                <h2 className="stats__subheading">Endurance</h2>
                <tr className="stats__table-headings-wrapper">
                    <th className="stats__table-heading stats__table-heading-contestant">Contestant</th>
                    <th className="stats__table-heading stats__table-heading-score">EDR</th>
                </tr>
                {contestantsByEndurance.map((contestant) => {
                    return (
                        <tr className="stats__table-data-wrapper">
                            <Link to={`/contestants/${contestant.id}`} className="stats__table-link">
                            <td className="stats__table-data">
                                <img className="stats__table-img" src={`${process.env.REACT_APP_SERVER_URL}/${contestant.photo}`} alt={`portrait of ${contestant.name}`}/>
                                {contestant.name}
                            </td>
                            </Link>
                            <td className="stats__table-data stats__table-data-score">{contestant.stats.endurance}</td>
                        </tr>
                    )
                })}
            </table>
            <table className="stats__table">
                <h2 className="stats__subheading">Speed</h2>
                <tr className="stats__table-headings-wrapper">
                    <th className="stats__table-heading stats__table-heading-contestant">Contestant</th>
                    <th className="stats__table-heading stats__table-heading-score">SPD</th>
                </tr>
                {contestantsBySpeed.map((contestant) => {
                    return (
                        <tr className="stats__table-data-wrapper">
                            <Link to={`/contestants/${contestant.id}`} className="stats__table-link">
                            <td className="stats__table-data">
                                <img className="stats__table-img" src={`${process.env.REACT_APP_SERVER_URL}/${contestant.photo}`} alt={`portrait of ${contestant.name}`}/>
                                {contestant.name}
                            </td>
                            </Link>
                            <td className="stats__table-data stats__table-data-score">{contestant.stats.speed}</td>
                        </tr>
                    )
                })}
            </table>
        </div>
        </section>
        </>
    )
}

export default StatsPage;