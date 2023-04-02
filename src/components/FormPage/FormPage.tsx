import React, { useState } from 'react';
import styles from './index.module.scss';
import Form from '../Form/Form';
import FormCard, { IFormCard } from '../FormCard/FormCard';

const FormPage: React.FC = () => {
  const [cards, setCards] = useState<IFormCard[]>([]);
  const [popupShow, setPopupShow] = useState(false);

  const addCard = (card: IFormCard) => {
    setCards([...cards, card]);
    setPopupShow(true);
    setTimeout(() => {
      setPopupShow(false);
    }, 2500);
  };

  return (
    <div className={styles.formPage}>
      <h1 className={styles.title}>Form</h1>
      <Form onFormSubmit={addCard} />
      <div className={styles.cards}>
        {cards.map((card, index) => (
          <FormCard key={index} {...card} />
        ))}
      </div>
      <div className={`${styles.popup} ${popupShow ? styles.popupShow : ''}`}>
        Form successfully submitted!
      </div>
    </div>
  );
};

export default FormPage;
