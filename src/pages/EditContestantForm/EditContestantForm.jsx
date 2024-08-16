import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useContestants } from '../../contexts/ContestantContext';
import { axiosInstance } from '../../utils/apiClient'
import Navbar from '../../components/Navbar/Navbar';
import './EditContestantForm.scss'

const EditContestantForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { contestants, loading, error, setContestants } = useContestants();
    const contestant = contestants.find(contestant => contestant.id === parseInt(id))
    const [fetchError, setFetchError] = useState(false);
    const [inputErrors, setInputErrors] = useState({});
    const [editError, setEditError] = useState(false);
    const [formData, setFormData] = useState({
        name: contestant && contestant.name,
        description: contestant && contestant.description
    });

    useEffect(() => {
        if (contestant) {
            setFormData({
                name: contestant.name,
                description: contestant.description
            })
        } else if (!loading && !error) {
            setFetchError(true)
        }
    }, [contestant, loading, error])
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name) newErrors.name = "Required"
        if (!formData.description) newErrors.description = "Required"

        setInputErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
  
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        try {
            const { data } = await axiosInstance.put(`/contestants/${id}`, formData);
            setContestants(prevContestants => 
                prevContestants.map(c => c.id === parseInt(id) ? data : c)
            );
            navigate(`/contestants/${id}`);
        } catch (error) {
            console.log(`Could not edit contestant`, error);
            setEditError(true);
        } 
    };

    const handleCancelClick = () => {
        navigate(`/contestants/${id}`);
        window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
    };

    if (loading) {
        return <h3 className="page-loading-text">Loading...</h3>
    };

    if (error || fetchError) {
        return (
            <>
            <Navbar />
            <p className="fetch-error-text">Sorry, our servers are having a hard time retrieving your contestant's information. Please come back later.</p>
            </>
        )
    };

  
    return (
    <>
    <Navbar />
    <h1 className="edit-contestant-form__heading">Edit Contestant</h1>
    <section className="edit-contestant-form__section">
    <div className="edit-contestant-form__img-wrapper">
        {contestant && (
            <img className="edit-contestant-form__img" src={`${process.env.REACT_APP_SERVER_URL}/${contestant.photo}`} alt={`portrait of ${contestant.name}`}/>
        )}
    </div>
    <form className="edit-contestant-form" onSubmit={handleFormSubmit}>
        <div className="edit-contestant-form__name-wrapper">
          <label className="edit-contestant-form__label" htmlFor="name">Name</label>
          <br />
            <input 
            className={`edit-contestant-form__name-input ${inputErrors.name && 'edit-contestant-form__input--error'}`}
            id="name"
            type="text" 
            name="name"
            value={formData.name} 
            onChange={handleInputChange} />
          {inputErrors.name && <h5 className="edit-contestant-form__error-text">{inputErrors.name}</h5>}
        </div>
        <div className="edit-contestant-form__description-wrapper">
          <label className="edit-contestant-form__label" htmlFor="description">Description</label>
          <br />
            <textarea 
            className={`edit-contestant-form__description-input ${inputErrors.description && 'edit-contestant-form__input--error'}`} 
            id="description"
            name="description"
            value={formData.description} 
            onChange={handleInputChange} />
          {inputErrors.description && <h5 className="edit-contestant-form__error-text">{inputErrors.description}</h5>}
        </div>
        {
            editError === true && <p>Sorry, our servers could not make the changes you requested. Please try again later.</p>
        }
        <div className="edit-contestant-form__btns-wrapper">
            <button className="edit-contestant-form__btn" type="submit">Publish</button>
            <button className="edit-contestant-form__btn" type="button" onClick={handleCancelClick}>Cancel</button>
        </div>
      </form>
      </section>
      </>
    );
  };
  
  export default EditContestantForm;