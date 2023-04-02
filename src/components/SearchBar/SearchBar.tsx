import React, { useEffect, useRef } from 'react';
import styles from './index.module.scss';
import searchIcon from '../../assets/search-icon.svg';

const SearchBar: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const inputCurrent = inputRef.current;
    return () => {
      if (inputCurrent !== null) localStorage.setItem('inputValue', inputCurrent.value);
    };
  }, []);

  return (
    <div className={styles.searchBar}>
      <input
        ref={inputRef}
        style={{ backgroundImage: `url(${searchIcon})` }}
        placeholder="This info will be stored"
        className={styles.searchBarInput}
        type="text"
        defaultValue={localStorage.getItem('inputValue') || ''}
      />
    </div>
  );
};

export default SearchBar;
