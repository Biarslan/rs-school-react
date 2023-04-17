import React, { useEffect, useState, useRef } from 'react';
import styles from './index.module.scss';
import searchIcon from '../../assets/search-icon.svg';
import { update } from '../../feature/search/search-slice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

const SearchBar: React.FC<{ disabled: boolean; submitHandler: (searchQuerry: string) => void }> = ({
  disabled,
  submitHandler,
}) => {
  const [haveErrors, setHaveErros] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isInited, setIsInited] = useState(false);

  const searchStoredValue = useAppSelector((state) => state.search.value);
  const dispatch = useAppDispatch();
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
      dispatch(update(inputCurrent.value));
      submitHandler(inputCurrent.value);
    }
  };
  useEffect(() => {
    if (isInited) return;
    setIsInited(true);
    submitHandler(searchStoredValue || 'Smith');
  }, [submitHandler, isInited, searchStoredValue]);

  return (
    <div className={styles.searchBar}>
      <form
        className={styles.searchBarForm}
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          handleSubmit();
        }}
        data-testid="search-form"
      >
        <input
          ref={inputRef}
          style={{ backgroundImage: `url(${searchIcon})` }}
          placeholder="E.g. Rick / Morty / Smith"
          className={styles.searchBarInput}
          type="text"
          disabled={disabled}
          defaultValue={searchStoredValue || 'Smith'}
        />
        <button className={styles.searchBarButton} type="submit">
          Search
        </button>
      </form>
      {haveErrors && (
        <p className={styles.error}>Input should not be empty and contain only latin letters.</p>
      )}
    </div>
  );
};

export default SearchBar;
