import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosInstance } from '../../utils/apiClient'
import './EditForm.scss'

const EditForm = ({ challenge, setIsEditing, updateChallenge, editError, setEditError }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [inputErrors, setInputErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    description: ""
  });

  useEffect(() => {
    if (challenge) {
      setFormData({
          name: challenge.name,
          description: challenge.description
      })
    }
  }, [challenge])

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
      await axiosInstance.put(`/challenges/${id}`, formData);
      console.log(formData);
      updateChallenge(formData);
      setIsEditing(false);
      navigate(`/challenges/${id}`)
    } catch (error) {
      console.log(`Could not edit challenge`, error);
      setEditError(true);
    } 
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    navigate(`/challenges/${id}`);
  };

  return (
    <>
    <section className="edit-form__section">
      <div className="edit-form__img-wrapper">
          <img className="edit-form__img" src={`${process.env.REACT_APP_SERVER_URL}/${challenge.photo}`} alt={`background of ${challenge.name}`}/>
      </div>
    <form className="edit-form" onSubmit={handleFormSubmit}>
        <div className="edit-form__name-wrapper">
          <label className="edit-form__label" htmlFor="name">Name</label>
          <br />
            <input 
            className={`edit-form__name-input ${inputErrors.name && 'edit-form__input--error'}`}
            id="name"
            type="text" 
            name="name"
            value={formData.name} 
            onChange={handleInputChange} />
          {inputErrors.name && <h5 className="edit-form__error-text">{inputErrors.name}</h5>}
        </div>
        <div className="edit-form__description-wrapper">
          <label className="edit-form__label" htmlFor="description">Description</label>
          <br />
            <textarea 
            className={`edit-form__description-input ${inputErrors.description && 'edit-form__input--error'}`} 
            id="description"
            name="description"
            value={formData.description} 
            onChange={handleInputChange} />
          {inputErrors.description && <h5 className="edit-form__error-text">{inputErrors.description}</h5>}
        </div>
        {
            editError === true && <p>Sorry, our servers could not make the changes you requested. Please try again later.</p>
        }
        <div className="edit-form__btns-wrapper">
            <button className="edit-form__btn" type="submit">Publish</button>
            <button className="edit-form__btn" type="button" onClick={handleCancelClick}>Cancel</button>
        </div>
    </form>
    </section>
    </>
  );
};
  
export default EditForm;