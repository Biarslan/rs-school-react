import React, { useState } from 'react';
import styles from './index.module.scss';
import SearchBar from '../SearchBar/SearchBar';
import Card from '../Card/Card';
import { ICharacter } from '../../types/Character';
import CharacterModal from '../CharacterModal/CharacterModal';

const Home: React.FC = () => {
  const basURL = 'https://rickandmortyapi.com/api/character/?name=';
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuerry, setCurrentQuerry] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCharacter, setCurrentCharacter] = useState<ICharacter | null>(null);

  const submitHandler = (searchQuerry: string) => {
    if (isLoading) return;
    if (searchQuerry.trim().length === 0) return;
    const searchQuerryNormalized = searchQuerry.trim().replaceAll(' ', '%20');
    setCharacters([]);
    setIsLoading(true);
    setCurrentQuerry(searchQuerry);
    fetch(basURL + searchQuerryNormalized)
      .then((response) => response.json())
      .then((data) => {
        if (data.results) {
          setCharacters(data.results);
        }
        if (data.error) {
          setCharacters([]);
        }
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
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
        <div className={styles.loading}></div>
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
