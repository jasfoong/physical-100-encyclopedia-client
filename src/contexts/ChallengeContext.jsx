import { createContext, useContext, useState, useEffect } from "react";
import { axiosInstance } from "../utils/apiClient";

const ChallengeContext = createContext();

export const useChallenges = () => {
    return useContext(ChallengeContext);
};

export const ChallengeProvider = ({ children }) => {
    const [challenges, setChallenges] = useState([]);
    const [loadingChallenge, setLoadingChallenge] = useState(true);
    const [errorChallenge, setErrorChallenge] = useState(null);

    useEffect(() => {
        const fetchChallenges = async () => {
            try {
                const { data } = await axiosInstance.get(`/challenges`);
                setChallenges(data);
                setLoadingChallenge(false);
            } catch (error) {
                setErrorChallenge(`Error retrieving challenges`, error);
                setLoadingChallenge(false);
            }
        }

        fetchChallenges();

    }, []);

    return (
        <ChallengeContext.Provider value={{ challenges, loadingChallenge, errorChallenge, setChallenges}}>
            { children }
        </ChallengeContext.Provider>
    )
}