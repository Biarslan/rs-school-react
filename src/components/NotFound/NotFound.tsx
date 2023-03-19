import React from 'react';
import styles from './index.module.scss';

export default class NotFound extends React.Component {
  render() {
    return <h1 className={styles.title}>😔 Page Not Found 😔</h1>;
  }
}
