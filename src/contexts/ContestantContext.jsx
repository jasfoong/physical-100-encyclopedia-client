import { createContext, useContext, useState, useEffect } from 'react'
import { axiosInstance } from '../utils/apiClient'

const ContestantContext = createContext();

export const useContestants = () => {
    return useContext(ContestantContext);
};

export const ContestantProvider = ({ children }) => {
    const [contestants, setContestants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchContestants = async () => {
            try {
                const { data } = await axiosInstance.get(`/contestants`);
                setContestants(data);
                setLoading(false);
            } catch (error) {
                setError(`Error retrieving contestants`, error);
                setLoading(false);
            }
        };

        fetchContestants();

    }, []);

    return (
        <ContestantContext.Provider value={{ contestants, loading, error, setContestants }}>
            {children}
        </ContestantContext.Provider>
    )
}