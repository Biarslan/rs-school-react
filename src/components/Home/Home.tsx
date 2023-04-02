import React from 'react';
import styles from './index.module.scss';
import SearchBar from '../SearchBar/SearchBar';
import Card from '../Card/Card';

import cardsInfo from '../../data/cardsInfo';

const Home: React.FC = () => {
  return (
    <div className={styles.test}>
      <h1 className={styles.title}>Module 1</h1>
      <SearchBar />
      <div className={styles.cards}>
        {cardsInfo.map((cardInfo, index) => (
          <Card key={index} {...cardInfo} />
        ))}
      </div>
    </div>
  );
};

export default Home;
