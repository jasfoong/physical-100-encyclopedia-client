import { useState } from 'react';
import './FilterChips.scss'

const FilterChips = ({ careerCategories, filterContestants, challenges, filterChallenges, seasons, filterBySeason }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [challengeType, setChallengeType] = useState(null);
    const [selectedSeason, setSelectedSeason] = useState(null);

    const handleContestantChipClick = (category) => {
        setSelectedCategory((selectedCategory === category) ? null : category);
        filterContestants((selectedCategory === category) ? null : category)
    }

    // const handleChallengeChipClick = (type) => {
    //     if (type === "team") {
    //         setChallengeType((challengeType === type) ? null : type);
    //         filterChallenges((challengeType === type) ? null : "team")
    //     } else if (type === "solo") {
    //         setChallengeType((challengeType === type) ? null : type);
    //         filterChallenges((challengeType === type) ? null : "solo")
    //     } else {
    //         setChallengeType(null);
    //         filterChallenges(null)
    //     }
    // }

    const handleChallengeChipClick = (type) => {
        setChallengeType((challengeType === type) ? null : type);
        filterChallenges((challengeType === type) ? null : type);
    }

    const handleSeasonChipClick = (season) => {
        setSelectedSeason((selectedSeason === season) ? null : season);
        filterBySeason((selectedSeason === season) ? null : season);
    }

    return (
        <div className="filter-chips">
            {
                careerCategories && careerCategories.map((category) => (
                    <span
                    key={category}
                    className={`filter-chips__chip ${selectedCategory === category && "filter-chips__chip--selected"}`}
                    onClick={() => handleContestantChipClick(category)}
                    >
                    {category}
                    </span>
                ))
            }
            {
                challenges && (
                    <>
                    <span 
                    className={`filter-chips__chip ${challengeType === "team" && "filter-chips__chip--selected"}`}
                    onClick={() => handleChallengeChipClick("team")}
                    >
                        Team</span>
                    <span
                    className={`filter-chips__chip ${challengeType === "solo" && "filter-chips__chip--selected"}`}
                    onClick={() => handleChallengeChipClick("solo")}
                    >
                        Solo</span>
                    </>
                )
            }
            {
                seasons && seasons.map((season) => (
                    <span
                        key={season}
                        className={`filter-chips__chip ${selectedSeason === season && "filter-chips__chip--selected"}`}
                        onClick={() => handleSeasonChipClick(season)}
                    >
                        Season {season}
                    </span>
                ))
            }
        </div>
    )
}

export default FilterChips;

