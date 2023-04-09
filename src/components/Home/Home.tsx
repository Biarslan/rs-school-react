import React, { useState } from 'react';
import styles from './index.module.scss';
import SearchBar from '../SearchBar/SearchBar';
import Card from '../Card/Card';
import { ICharacter } from '../../types/Character';
import CharacterModal from '../CharacterModal/CharacterModal';
import { getCharacters } from '../../services/api';
const Home: React.FC = () => {
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuerry, setCurrentQuerry] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCharacter, setCurrentCharacter] = useState<ICharacter | null>(null);

  const submitHandler = async (searchQuerry: string) => {
    if (isLoading) return;
    if (searchQuerry.trim().length === 0) return;
    setCharacters([]);
    setIsLoading(true);
    const searchQuerryNormalized = searchQuerry.trim().replaceAll(' ', '%20');
    setCurrentQuerry(searchQuerry);
    try {
      const fetched = await getCharacters(searchQuerryNormalized);
      setCharacters(fetched);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const handleCardClick = (character: ICharacter) => {
    setIsModalOpen(true);
    setCurrentCharacter(character);
    console.log(character);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
    setCurrentCharacter(null);
  };
  return (
    <>
      <h1 className={styles.title}>Find characters from Rick and Morty by name</h1>
      <SearchBar disabled={isLoading} submitHandler={submitHandler} />
      {isLoading ? (
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
