import { useState, useEffect } from 'react';
import axios from 'axios';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import Filter from './components/Filter';
import { FILTER_TYPES } from './types';
import './App.css';

const API_URL = 'https://33d6d7af49dbe331.mokky.dev/books';

function App() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [currentFilter, setCurrentFilter] = useState(FILTER_TYPES.ALL);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    filterBooks();
  }, [books, currentFilter, searchTerm]);

  const fetchBooks = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(API_URL);
      setBooks(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке книг:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addBook = async (bookData) => {
    try {
      const response = await axios.post(API_URL, bookData);
      setBooks(prev => [...prev, response.data]);
    } catch (error) {
      console.error('Ошибка при добавлении книги:', error);
      throw error;
    }
  };

  const deleteBook = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить эту книгу?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setBooks(prev => prev.filter(book => book.id !== id));
      } catch (error) {
        console.error('Ошибка при удалении книги:', error);
      }
    }
  };

  const toggleBookRead = async (id, isRead) => {
    try {
      setBooks(prev => prev.map(book => 
        book.id === id ? { ...book, isRead } : book
      ));
    } catch (error) {
      console.error('Ошибка при обновлении статуса книги:', error);
    }
  };

  const filterBooks = () => {
    let filtered = books;
    
    if (currentFilter === FILTER_TYPES.READ) {
      filtered = filtered.filter(book => book.isRead);
    } else if (currentFilter === FILTER_TYPES.UNREAD) {
      filtered = filtered.filter(book => !book.isRead);
    }

    if (searchTerm) {
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredBooks(filtered);
  };

  const readBooks = books.filter(book => book.isRead).length;
  const unreadBooks = books.filter(book => !book.isRead).length;

  return (
    <div className="app">
      <header className="header">
        <h1>📚 Библиотечная система</h1>
        <div className="stats">
          <div className="stat">
            <span className="stat-number">{books.length}</span>
            <span className="stat-label">Всего книг</span>
          </div>
          <div className="stat">
            <span className="stat-number">{readBooks}</span>
            <span className="stat-label">Прочитано</span>
          </div>
          <div className="stat">
            <span className="stat-number">{unreadBooks}</span>
            <span className="stat-label">Не прочитано</span>
          </div>
        </div>
      </header>

      <main className="main">
        <BookForm onAddBook={addBook} />
        
        <Filter
          currentFilter={currentFilter}
          onFilterChange={setCurrentFilter}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        
        <BookList
          books={filteredBooks}
          onToggleRead={toggleBookRead}
          onDeleteBook={deleteBook}
          isLoading={isLoading}
        />
      </main>
    </div>
  );
}

export default App;
