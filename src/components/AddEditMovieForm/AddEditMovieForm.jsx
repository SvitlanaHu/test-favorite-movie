import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import styles from "./AddEditMovieForm.module.css"

export const AddEditMovieForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    id: initialData ? initialData.id : uuidv4(),
    title: initialData ? initialData.title : "",
    rating: initialData ? initialData.rating : "",
    release_date: initialData ? initialData.release_date : "",
    description: initialData ? initialData.description : "",
    genre: initialData ? initialData.genre : [],
    actors: initialData ? initialData.actors : [],
    director: initialData ? initialData.director : "",
    image: initialData ? initialData.image : "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
        ...prevData,
        [name]: value,
    }));
  };
    
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };


  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.box}>
      <label htmlFor="title">Title:</label>
        <input
          className={styles.label}
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

      <label htmlFor="rating">Rating:</label>
      <input
          type="number"
          className={styles.label}
        id="rating"
        name="rating"
        value={formData.rating}
        onChange={handleChange}
        min="0"
        max="10"
        step="0.1"
        required
      />

      <label htmlFor="release_date">Release Date:</label>
      <input
          type="date"
          className={styles.label}
        id="release_date"
        name="release_date"
        value={formData.release_date}
        onChange={handleChange}
        required
      />

      <label htmlFor="description">Description:</label>
      <textarea
          id="description"
          className={styles.label}
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
          />
          
      <label htmlFor="genre">Genre:</label>
      <input
        type="text"
          id="genre"
          className={styles.label}
        name="genre"
        value={formData.genre}
        onChange={handleChange}
      />

      <label htmlFor="actors">Actors:</label>
      <input
          type="text"
          className={styles.label}
        id="actors"
        name="actors"
        value={formData.actors}
        onChange={handleChange}
      />

      <label htmlFor="director">Director:</label>
      <input
          type="text"
          className={styles.label}
        id="director"
        name="director"
        value={formData.director}
        onChange={handleChange}
      />

      <label htmlFor="image">Image URL:</label>
      <input
          type="text"
          className={styles.label}
        id="image"
        name="image"
        value={formData.image}
        onChange={handleChange}
      />

        <button className={styles.button} type="submit">Submit</button>
      </div>
    </form>
  );
};

