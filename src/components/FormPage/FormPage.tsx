import React from 'react';
import styles from './index.module.scss';
import Form from '../Form/Form';
import FormCard, { IFormCard } from '../FormCard/FormCard';

export default class FormPage extends React.Component {
  state: { cards: IFormCard[] } = {
    cards: [],
  };

  addCard = (card: IFormCard) => {
    this.setState({
      cards: [...this.state.cards, card],
    });
    alert('Form submitted');
  };
  render() {
    return (
      <div className={styles.formPage}>
        <h1 className={styles.title}>Form</h1>
        <Form onFormSubmit={this.addCard} />
        <div className={styles.cards}>
          {this.state.cards.map((card, index) => (
            <FormCard key={index} {...card} />
          ))}
        </div>
      </div>
    );
  }
}
