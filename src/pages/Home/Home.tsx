import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import SearchBar from '../../components/SearchBar/SearchBar';
import Card from '../../components/Card/Card';
import CharacterModal from '../../components/CharacterModal/CharacterModal';
import { ICharacter } from '../../types/Character';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useFetchCharactersQuery } from '../../feature/characters/characters-api-slice';
import { updateCharacterList } from '../../feature/search-results/search-results-slice';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const characters = useAppSelector((store) => store.searchResults.value);
  const [currentQuerry, setCurrentQuerry] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSkipping, setIsSkipping] = useState(true);
  const [currentCharacter, setCurrentCharacter] = useState<ICharacter | null>(null);
  const [searchQueryValue, setSearchQueryValue] = useState('');
  const { data, isFetching, isLoading } = useFetchCharactersQuery(searchQueryValue, {
    skip: isSkipping,
  });

  const submitHandler = async (searchQuery: string) => {
    if (isFetching || isLoading) return;
    setIsSkipping(false);
    const searchQuerryNormalized = searchQuery.trim().replaceAll(' ', '%20');
    setCurrentQuerry(searchQuery);
    setSearchQueryValue(searchQuerryNormalized);
  };
  useEffect(() => {
    if (data !== undefined) {
      dispatch(updateCharacterList(data.results));
    }
  }, [dispatch, data]);

  const handleCardClick = (character: ICharacter) => {
    setIsModalOpen(true);
    setCurrentCharacter(character);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
    setCurrentCharacter(null);
  };
  return (
    <>
      <h1 className={styles.title}>Find characters from Rick and Morty by name</h1>
      <SearchBar disabled={isFetching} submitHandler={submitHandler} />
      {isFetching || isLoading ? (
        <div className={styles.loading} data-testid="loading-indicator"></div>
      ) : (
        <>
          {currentQuerry.length > 0 && (
            <p className={styles.message}>Results for querry &apos;{currentQuerry}&apos;</p>
          )}
          {characters.length > 0 ? (
            <div className={styles.cards}>
              {characters.map((character) => (
                <Card
                  key={character.id}
                  character={character}
                  onClick={() => {
                    handleCardClick(character);
                  }}
                />
              ))}
            </div>
          ) : (
            <p className={styles.message}>There is no matches for your request</p>
          )}
        </>
      )}
      {isModalOpen && <CharacterModal character={currentCharacter} onClose={handleModalClose} />}
    </>
  );
};

export default Home;
