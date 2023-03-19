import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import styles from './index.module.scss';

const getNavLinkClassName = ({ isActive }: { isActive: boolean }) =>
  isActive ? `${styles.navbarLink} ${styles.navbarLinkActive}` : `${styles.navbarLink}`;

export default class Layout extends React.Component {
  render() {
    return (
      <main className={styles.main}>
        <nav className={styles.navbar}>
          <NavLink className={getNavLinkClassName} to="/">
            Home
          </NavLink>
          <NavLink className={getNavLinkClassName} to="/about">
            About
          </NavLink>
        </nav>
        <Outlet />
      </main>
    );
  }
}
