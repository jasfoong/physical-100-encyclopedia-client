import { useState } from 'react';
import './FilterChips.scss'

const FilterChips = ({ careerCategories, filterContestants, challenges, filterChallenges }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [challengeType, setChallengeType] = useState(null);

    const handleContestantChipClick = (category) => {
        setSelectedCategory((selectedCategory === category) ? null : category);
        filterContestants((selectedCategory === category) ? null : category)

            //function to handle chip click for contestants page and challenges page
            //1. contestants page: if a career category chip is clicked, pass the category into the handle chip click function -- to render all contestants by that category
            //2. challenges page: if a team chip is clicked, render all challenges by team = true
            //3. challenges page: if a solo chip is clicked, render all challenges by team = false
    }

    const handleChallengeChipClick = (type) => {
        if (type === "team") {
            setChallengeType((challengeType === type) ? null : type);
            filterChallenges((challengeType === type) ? null : "team")
        } else if (type === "solo") {
            setChallengeType((challengeType === type) ? null : type);
            filterChallenges((challengeType === type) ? null : "solo")
        } else {
            setChallengeType(null);
            filterChallenges(null)
        }
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
        </div>
    )
}

export default FilterChips;

