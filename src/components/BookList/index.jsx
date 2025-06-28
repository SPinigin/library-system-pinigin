import styles from './BookList.module.css';

const BookList = ({ books, onToggleRead, onDeleteBook, isLoading }) => {
  if (isLoading) {
    return <div className={styles.loading}>Загрузка книг...</div>;
  }

  if (books.length === 0) {
    return <div className={styles.empty}>Книги не найдены</div>;
  }

  return (
    <div className={styles.bookList}>
      {books.map(book => (
        <div key={book.id} className={`${styles.bookCard} ${book.isRead ? styles.read : ''}`}>
          <div className={styles.bookInfo}>
            <h3 className={styles.title}>{book.title}</h3>
            <p className={styles.author}>Автор: {book.author}</p>
            <p className={styles.year}>Год: {book.year}</p>
            <span className={`${styles.status} ${book.isRead ? styles.statusRead : styles.statusUnread}`}>
              {book.isRead ? 'Прочитано' : 'Не прочитано'}
            </span>
          </div>
          
          <div className={styles.actions}>
            <button
              className={`${styles.toggleButton} ${book.isRead ? styles.markUnread : styles.markRead}`}
              onClick={() => onToggleRead(book.id, !book.isRead)}
            >
              {book.isRead ? 'Отметить как непрочитанное' : 'Отметить как прочитанное'}
            </button>
            <button
              className={styles.deleteButton}
              onClick={() => onDeleteBook(book.id)}
            >
              Удалить
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookList;
