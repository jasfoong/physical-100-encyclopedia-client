import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useChallenges } from '../../contexts/ChallengeContext';
import { axiosInstance } from '../../utils/apiClient'
import Navbar from '../../components/Navbar/Navbar';
import './EditChallengeForm.scss'

const EditChallengeForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { challenges, loadingChallenge, errorChallenge, setChallenges } = useChallenges();
  const challenge = challenges.find(challenge => challenge.id === parseInt(id));
  const [fetchError, setFetchError] = useState(false);
  const [inputErrors, setInputErrors] = useState({});
  const [editError, setEditError] = useState(false);
  const [formData, setFormData] = useState({
    name: challenge && challenge.name,
    description: challenge && challenge.description
  });

  useEffect(() => {
    if (challenge) {
      setFormData({
          name: challenge.name,
          description: challenge.description
      })
    } else if (!loadingChallenge && !errorChallenge) {
      setFetchError(true)
    }
  }, [challenge, loadingChallenge, errorChallenge])

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
  }
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
      }

    try {
      const { data } = await axiosInstance.put(`/challenges/${id}`, formData);
      setChallenges(prevChallenges =>
        prevChallenges.map(c => c.id === parseInt(id) ? data : c)
      )
      navigate(`/challenges/${id}`)
    } catch (error) {
      console.log(`Could not edit challenge`, error);
      setEditError(true);
    } 
  };

  const handleCancelClick = () => {
    navigate(`/challenges/${id}`);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  if (loadingChallenge) {
    return <h3 className="page-loading-text">Loading...</h3>
  };

  if (errorChallenge || fetchError) {
    return (
        <>
        <Navbar />
        <p className="fetch-error-text">Sorry, our servers are having a hard time retrieving the challenge information. Please come back later.</p>
        </>
    )
  };

  return (
    <>
    <Navbar />
    <h1 className="edit-challenge-form__heading">Edit Challenge</h1>
    <section className="edit-challenge-form__section">
      <div className="edit-challenge-form__img-wrapper">
          {challenge && (
            <img className="edit-challenge-form__img" src={`${process.env.REACT_APP_SERVER_URL}/${challenge.photo}`} alt={`background of ${challenge.name}`}/>
          )}
      </div>
    <form className="edit-challenge-form" onSubmit={handleFormSubmit}>
        <div className="edit-challenge-form__name-wrapper">
          <label className="edit-challenge-form__label" htmlFor="name">Name</label>
          <br />
            <input 
            className={`edit-challenge-form__name-input ${inputErrors.name && 'edit-challenge-form__input--error'}`}
            id="name"
            type="text" 
            name="name"
            value={formData.name} 
            onChange={handleInputChange} />
          {inputErrors.name && <h5 className="edit-challenge-form__error-text">{inputErrors.name}</h5>}
        </div>
        <div className="edit-challenge-form__description-wrapper">
          <label className="edit-challenge-form__label" htmlFor="description">Description</label>
          <br />
            <textarea 
            className={`edit-challenge-form__description-input ${inputErrors.description && 'edit-challenge-form__input--error'}`} 
            id="description"
            name="description"
            value={formData.description} 
            onChange={handleInputChange} />
          {inputErrors.description && <h5 className="edit-challenge-form__error-text">{inputErrors.description}</h5>}
        </div>
        {
            editError === true && <p>Sorry, our servers could not make the changes you requested. Please try again later.</p>
        }
        <div className="edit-challenge-form__btns-wrapper">
            <button className="edit-challenge-form__btn" type="submit">Publish</button>
            <button className="edit-challenge-form__btn" type="button" onClick={handleCancelClick}>Cancel</button>
        </div>
    </form>
    </section>
    </>
  );
};
  
export default EditChallengeForm;