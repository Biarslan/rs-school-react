import React, { useEffect, useState, useRef } from 'react';
import styles from './index.module.scss';
import searchIcon from '../../assets/search-icon.svg';

const SearchBar: React.FC<{ disabled: boolean; submitHandler: (searchQuerry: string) => void }> = ({
  disabled,
  submitHandler,
}) => {
  const [haveErrors, setHaveErros] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isInited, setIsInited] = useState(false);

  const handleSubmit = () => {
    const inputCurrent = inputRef.current;
    if (inputCurrent !== null) {
      const value = inputCurrent.value.trim();
      if (value.length === 0 || !/^[A-Za-z\s]*$/.test(value)) {
        setHaveErros(true);
        submitHandler('');
        return;
      }
      setHaveErros(false);
      localStorage.setItem('inputValue', inputCurrent.value);
      submitHandler(inputCurrent.value);
    }
  };
  useEffect(() => {
    if (isInited) return;
    submitHandler(localStorage.getItem('inputValue') || 'Smith');
    setIsInited(true);
  }, [submitHandler, isInited]);

  return (
    <div className={styles.searchBar}>
      <form
        className={styles.searchBarForm}
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          ref={inputRef}
          style={{ backgroundImage: `url(${searchIcon})` }}
          placeholder="E.g. Rick / Morty / Smith"
          className={styles.searchBarInput}
          type="text"
          disabled={disabled}
          defaultValue={localStorage.getItem('inputValue') || 'Smith'}
        />
        {haveErrors && (
          <p className={styles.error}>Input should not be empty and contain only latin letters.</p>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
