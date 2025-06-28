import { useState } from 'react';
import styles from './BookForm.module.css';

const BookForm = ({ onAddBook }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    year: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Название книги обязательно';
    }
    
    if (!formData.author.trim()) {
      newErrors.author = 'Автор книги обязателен';
    }
    
    if (!formData.year) {
      newErrors.year = 'Год издания обязателен';
    } else if (formData.year < 1000 || formData.year > new Date().getFullYear()) {
      newErrors.year = 'Некорректный год издания';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      await onAddBook({
        ...formData,
        year: parseInt(formData.year),
        isRead: false
      });
      
      setFormData({ title: '', author: '', year: '' });
      setErrors({});
    } catch (error) {
      console.error('Ошибка при добавлении книги:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Добавить книгу</h2>
      
      <div className={styles.inputGroup}>
        <input
          type="text"
          name="title"
          placeholder="Название книги"
          value={formData.title}
          onChange={handleChange}
          className={errors.title ? styles.error : ''}
        />
        {errors.title && <span className={styles.errorText}>{errors.title}</span>}
      </div>
      
      <div className={styles.inputGroup}>
        <input
          type="text"
          name="author"
          placeholder="Автор"
          value={formData.author}
          onChange={handleChange}
          className={errors.author ? styles.error : ''}
        />
        {errors.author && <span className={styles.errorText}>{errors.author}</span>}
      </div>
      
      <div className={styles.inputGroup}>
        <input
          type="number"
          name="year"
          placeholder="Год издания"
          value={formData.year}
          onChange={handleChange}
          className={errors.year ? styles.error : ''}
        />
        {errors.year && <span className={styles.errorText}>{errors.year}</span>}
      </div>
      
      <button 
        type="submit" 
        disabled={isLoading}
        className={styles.submitButton}
      >
        {isLoading ? 'Добавляется...' : 'Добавить книгу'}
      </button>
    </form>
  );
};

export default BookForm;
