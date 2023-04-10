import React from 'react';
import styles from './index.module.scss';

export interface IFormCard {
  name: string;
  date: number;
  sex: string;
  isReactLiked: boolean;
  language: string;
  image: string;
}

const FormCard: React.FC<IFormCard> = ({ name, image, date, language, sex, isReactLiked }) => {
  return (
    <div className={styles.card}>
      <h5 className={styles.cardTitle}>{name}</h5>
      <img src={image} className={styles.cardImage} alt={name} />
      <p className={styles.cardDescription}>
        {language === 'Other'
          ? 'We dont know what favourite language is :('
          : ' Favourite language is ' + language}
        <br />
        {isReactLiked ? 'Likes ReactJS' : 'Doesnt like ReactJS'}
      </p>
      <div className={styles.cardParameters}>
        <span className={styles.cardWeight}>
          <span className={styles.bold}>Sex:</span> {sex === 'other' ? 'Other 🤔' : sex}
        </span>
        <span className={styles.cardHeight}>
          <span className={styles.bold}>Birth date:</span> {new Date(date).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default FormCard;
