import React, { useState } from 'react';
import styles from './index.module.scss';
import Form from '../../components/Form/Form';
import FormCard from '../../components/FormCard/FormCard';
import { IFormCard } from '../../types/Form';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addSubmittedForm } from '../../feature/submitted-forms/submitted-forms-slice';

const FormPage: React.FC = () => {
  const submittedForms = useAppSelector((state) => state.submittedForms.value);
  const dispatch = useAppDispatch();

  const [popupShow, setPopupShow] = useState(false);

  const addCard = (card: IFormCard) => {
    dispatch(addSubmittedForm(card));
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
        {submittedForms.map((card, index) => (
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
