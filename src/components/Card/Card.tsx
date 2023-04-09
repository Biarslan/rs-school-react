import React from 'react';
import styles from './index.module.scss';
import { ICharacter } from '../../types/Character';

const Card: React.FC<{ character: ICharacter; onClick: () => void }> = ({ character, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <h5 className={styles.cardTitle}>{character.name}</h5>
      <img src={character.image} className={styles.cardImage} alt={character.name} />
      <div className={styles.cardParameters}>
        <span className={styles.location}>
          <span className={styles.bold}>Location:</span> {character.location.name}
        </span>
      </div>
    </div>
  );
};

export default Card;
