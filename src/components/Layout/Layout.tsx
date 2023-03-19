import React from 'react';
import NavBar from '../NavBar/NavBar';
import { Outlet } from 'react-router-dom';
import styles from './index.module.scss';

export default class Layout extends React.Component {
  render() {
    return (
      <main className={styles.main}>
        <NavBar />
        <Outlet />
      </main>
    );
  }
}
