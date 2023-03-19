import React from 'react';
import styles from './index.module.scss';
import linkIcon from '../../assets/link-icon.svg';
import ICard from '../../types/Card';

export default class Card extends React.Component<ICard> {
  render() {
    const { name, image, description, weight, height, link } = this.props;
    return (
      <div className={styles.card}>
        <h5 className={styles.cardTitle}>
          {name}{' '}
          <a href={link} target="_blank" rel="noreferrer">
            <img src={linkIcon} className={styles.linkIcon} alt="" />
          </a>
        </h5>
        <img src={image} className={styles.cardImage} alt="" />
        <p className={styles.cardDescription}>{description}</p>
        <div className={styles.cardParameters}>
          <span className={styles.cardWeight}>
            <span className={styles.bold}>Weight:</span> {weight}
          </span>
          <span className={styles.cardHeight}>
            <span className={styles.bold}>Height:</span> {height}
          </span>
        </div>
      </div>
    );
  }
}
