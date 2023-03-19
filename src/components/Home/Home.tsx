import React from 'react';
import styles from './index.module.scss';
import SearchBar from '../SearchBar/SearchBar';
import Card from '../Card/Card';

import cardsInfo from '../../data/cardsInfo';

export default class Home extends React.Component {
  render() {
    return (
      <div className={styles.test}>
        <h2 className={styles.title}>Module 1</h2>
        <SearchBar />
        <div className={styles.cards}>
          {cardsInfo.map((cardInfo, index) => (
            <Card key={index} {...cardInfo} />
          ))}
        </div>
      </div>
    );
  }
}
