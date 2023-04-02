import React from 'react';
import NavBar from '../NavBar/NavBar';
import { Outlet } from 'react-router-dom';
import styles from './index.module.scss';

const Layout: React.FC = () => {
  return (
    <main className={styles.main}>
      <NavBar />
      <Outlet />
    </main>
  );
};

export default Layout;
