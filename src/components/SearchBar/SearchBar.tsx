import React from 'react';
import styles from './index.module.scss';
import searchIcon from '../../assets/search-icon.svg';

export default class SearchBar extends React.Component {
  state = {
    inputValue: localStorage.getItem('inputValue') || '',
  };

  handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    this.setState({ inputValue: value });
  };

  componentWillUnmount() {
    localStorage.setItem('inputValue', this.state.inputValue);
  }

  render() {
    return (
      <div className={styles.searchBar}>
        <input
          style={{ backgroundImage: `url(${searchIcon})` }}
          placeholder="This info will be stored"
          className={styles.searchBarInput}
          type="text"
          value={this.state.inputValue}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
