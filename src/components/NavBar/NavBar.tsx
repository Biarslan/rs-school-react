import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './index.module.scss';

const getNavLinkClassName = ({ isActive }: { isActive: boolean }) =>
  isActive ? `${styles.navbarLink} ${styles.navbarLinkActive}` : `${styles.navbarLink}`;

const NavBar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <NavLink className={getNavLinkClassName} to="/">
        Home
      </NavLink>
      <NavLink className={getNavLinkClassName} to="/about">
        About
      </NavLink>
      <NavLink className={getNavLinkClassName} to="/form">
        Form
      </NavLink>
    </nav>
  );
};

export default NavBar;
