import React from 'react';
import styles from './index.module.scss';
import { ICharacter } from '../../types/Character';

const CharacterModal: React.FC<{ character: ICharacter | null; onClose: () => void }> = ({
  character,
  onClose,
}) => {
  return (
    <div
      className={styles.modalBg}
      onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.currentTarget !== e.target) return;
        onClose();
      }}
    >
      {character && (
        <div className={styles.modalInfo}>
          <img src={character.image} className={styles.modalImage} alt={character.name} />
          <div className={styles.modalParameters}>
            <ul>
              <li className={styles.parameter}>
                <span className={styles.bold}>Name:</span> {character.name}
              </li>
              <li className={styles.parameter}>
                <span className={styles.bold}>ID:</span> {character.id}
              </li>
              <li className={styles.parameter}>
                <span className={styles.bold}>Status:</span> {character.status}
              </li>
              <li className={styles.parameter}>
                <span className={styles.bold}>Species:</span> {character.species}
              </li>
              <li className={styles.parameter}>
                <span className={styles.bold}>Type:</span> {character.type}
              </li>
              <li className={styles.parameter}>
                <span className={styles.bold}>Gender:</span> {character.gender}
              </li>
              <li className={styles.parameter}>
                <span className={styles.bold}>Origin:</span> {character.origin.name}
              </li>
              <li className={styles.parameter}>
                <span className={styles.bold}>Location:</span> {character.location.name}
              </li>
              <li className={styles.parameter}>
                <span className={styles.bold}>Episodes:</span>{' '}
                {character.episode.map((episode) => episode.split('/').pop()).join(', ')}
              </li>
            </ul>
          </div>
          <button onClick={onClose} className={styles.close}>
            X
          </button>
        </div>
      )}
    </div>
  );
};

export default CharacterModal;
