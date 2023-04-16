import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './index.module.scss';
import { IFormCard, IFormData } from '../../types/Form';

const Form: React.FC<{ onFormSubmit: (formData: IFormCard) => void }> = ({ onFormSubmit }) => {
  const [previewImage, setPreviewImage] = useState<string | undefined>(undefined);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormData>();

  const onSubmit = (formData: IFormData) => {
    const FormCardData: IFormCard = { ...formData, image: URL.createObjectURL(formData.image[0]) };
    onFormSubmit(FormCardData);
    resetForm();
  };

  const resetForm = () => {
    reset();
    setPreviewImage(undefined);
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <legend className={styles.legend}>Input known programmers</legend>
      <label className={styles.label} htmlFor="name">
        Name* :
      </label>
      <input
        {...register('name', {
          validate: (value) => value.trim() !== '',
          pattern: /^[A-Z][a-zA-Z]*$/g,
        })}
        className={styles.field}
        type="text"
        id="name"
      />
      {errors.name && (
        <span className={styles.error}>
          Name shound contain only latin letters and start with capital
        </span>
      )}
      <label className={styles.label} htmlFor="date">
        Date of birth* :
      </label>
      <input
        {...register('date', { required: true })}
        className={styles.field}
        type="date"
        id="date"
      />
      {errors.date && <span className={styles.error}>Date is required</span>}
      <label className={styles.label} htmlFor="language">
        Favourite language* :
      </label>

      <select {...register('language')} className={styles.field} name="language" id="language">
        <option value="PHP">PHP</option>
        <option value="Perl">Perl</option>
        <option value="Visual Basic">Visual Basic</option>
        <option value="Other">Other 😔</option>
      </select>

      <label className={styles.labelCheckbox} htmlFor="check1">
        <input
          {...register('isReactLiked')}
          className={styles.checkbox}
          type="checkbox"
          id="check1"
        />
        Likes ReactJS
      </label>

      <label className={styles.label}>Sex* :</label>

      <div className={styles.sexInput}>
        <label className={styles.labelRadio} htmlFor="sexMale">
          <input
            {...register('sex', { validate: (value) => value !== null })}
            id="sexMale"
            type="radio"
            name="sex"
            value="male"
          />
          Male
        </label>
        <label className={styles.labelRadio} htmlFor="sexFemale">
          <input
            {...register('sex', { validate: (value) => value !== null })}
            id="sexFemale"
            type="radio"
            name="sex"
            value="female"
          />
          Female
        </label>
        <label className={styles.labelRadio} htmlFor="sexOther">
          <input
            {...register('sex', { validate: (value) => value !== null })}
            id="sexOther"
            type="radio"
            name="sex"
            value="other"
          />
          Other 🤔
        </label>
      </div>
      {errors.sex && <span className={styles.error}>Select sex</span>}
      <label className={styles.labelCheckbox} htmlFor="image">
        Upload photo* :
      </label>
      <input
        {...register('image', { validate: (value) => value.length > 0 })}
        type="file"
        id="image"
        name="image"
        accept="image/*"
        className={styles.inputPhoto}
        onChange={handleChangeImage}
      />
      {errors.image && <span className={styles.error}>Please upload image</span>}
      {previewImage && <img className={styles.previewImage} src={previewImage} alt="img" />}
      <button className={styles.submitButton} type="submit">
        Submit
      </button>
    </form>
  );
};

export default Form;
