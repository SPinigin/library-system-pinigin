import { FILTER_TYPES } from '../../types';
import styles from './Filter.module.css';

const Filter = ({ currentFilter, onFilterChange, searchTerm, onSearchChange }) => {
  return (
    <div className={styles.filterContainer}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Поиск по названию..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className={styles.searchInput}
        />
      </div>
      
      <div className={styles.filterButtons}>
        <button
          className={`${styles.filterButton} ${currentFilter === FILTER_TYPES.ALL ? styles.active : ''}`}
          onClick={() => onFilterChange(FILTER_TYPES.ALL)}
        >
          Все книги
        </button>
        <button
          className={`${styles.filterButton} ${currentFilter === FILTER_TYPES.READ ? styles.active : ''}`}
          onClick={() => onFilterChange(FILTER_TYPES.READ)}
        >
          Прочитанные
        </button>
        <button
          className={`${styles.filterButton} ${currentFilter === FILTER_TYPES.UNREAD ? styles.active : ''}`}
          onClick={() => onFilterChange(FILTER_TYPES.UNREAD)}
        >
          Непрочитанные
        </button>
      </div>
    </div>
  );
};

export default Filter;
