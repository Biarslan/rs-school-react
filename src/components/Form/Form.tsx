import React from 'react';
import styles from './index.module.scss';
import { IFormData, validateForm, IValidForm, prepareData } from './utils';
import { IFormCard } from '../FormCard/FormCard';
export default class Form extends React.Component<{ onFormSubmit: (formData: IFormCard) => void }> {
  state: { previewImage: undefined | string; isValid: IValidForm } = {
    previewImage: undefined,
    isValid: { name: true, date: true, sex: true, image: true },
  };

  formRef = React.createRef<HTMLFormElement>();
  nameRef = React.createRef<HTMLInputElement>();
  dateRef = React.createRef<HTMLInputElement>();
  languageRef = React.createRef<HTMLSelectElement>();
  isReactLikedRef = React.createRef<HTMLInputElement>();
  sexMaleRef = React.createRef<HTMLInputElement>();
  sexFemaleRef = React.createRef<HTMLInputElement>();
  sexOtherRef = React.createRef<HTMLInputElement>();
  imageRef = React.createRef<HTMLInputElement>();

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData: IFormData = {
      name: this.nameRef.current?.value,
      date: this.dateRef.current?.valueAsNumber,
      language: this.languageRef.current?.value,
      isReactLiked: this.isReactLikedRef.current?.checked,
      sex: {
        male: this.sexMaleRef.current?.checked,
        female: this.sexFemaleRef.current?.checked,
        other: this.sexOtherRef.current?.checked,
      },
      image: this.imageRef.current?.files,
    };
    const { haveErrors, isFormValid: validationResult } = validateForm(formData);

    if (haveErrors) {
      this.setState({ isValid: validationResult });
    } else {
      const preparedData = prepareData(formData);
      if (preparedData !== undefined) {
        this.props.onFormSubmit(preparedData);
        this.resetForm();
      }
    }
  };

  resetForm = () => {
    this.formRef.current?.reset();
    this.setState({
      previewImage: undefined,
      isValid: { name: true, date: true, sex: true, image: true },
    });
  };

  handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;
    this.setState({ previewImage: URL.createObjectURL(e.target.files[0]) });
  };

  render() {
    return (
      <form ref={this.formRef} className={styles.form} onSubmit={this.handleSubmit}>
        <legend className={styles.legend}>Input known programmers</legend>
        <label className={styles.label} htmlFor="name">
          Name* :
        </label>
        <input ref={this.nameRef} className={styles.field} type="text" id="name" />
        {!this.state.isValid.name && (
          <span className={styles.error}>
            Name shound contain only latin letters and start with capital
          </span>
        )}
        <label className={styles.label} htmlFor="date">
          Date of birth* :
        </label>
        <input ref={this.dateRef} className={styles.field} type="date" id="date" />
        {!this.state.isValid.date && <span className={styles.error}>Date is required</span>}
        <label className={styles.label} htmlFor="language">
          Favourite language* :
        </label>

        <select ref={this.languageRef} className={styles.field} name="language" id="language">
          <option value="PHP">PHP</option>
          <option value="Perl">Perl</option>
          <option value="Visual Basic">Visual Basic</option>
          <option value="Other">Other 😔</option>
        </select>

        <label className={styles.labelCheckbox} htmlFor="check1">
          <input
            ref={this.isReactLikedRef}
            className={styles.checkbox}
            type="checkbox"
            id="check1"
          />
          Likes ReactJS
        </label>

        <label className={styles.label}>Sex* :</label>

        <div className={styles.sexInput}>
          <label className={styles.labelRadio} htmlFor="sexMale">
            <input ref={this.sexMaleRef} id="sexMale" type="radio" name="radio" value="male" />
            Male
          </label>

          <label className={styles.labelRadio} htmlFor="sexFemale">
            <input
              ref={this.sexFemaleRef}
              id="sexFemale"
              type="radio"
              name="radio"
              value="female"
            />
            Female
          </label>
          <label className={styles.labelRadio} htmlFor="sexOther">
            <input ref={this.sexOtherRef} id="sexOther" type="radio" name="radio" value="other" />
            Other 🤔
          </label>
        </div>
        {!this.state.isValid.sex && <span className={styles.error}>Sex is required</span>}
        <label className={styles.labelCheckbox} htmlFor="image">
          Upload photo* :
        </label>
        <input
          ref={this.imageRef}
          type="file"
          id="image"
          name="img"
          accept="image/*"
          className={styles.inputPhoto}
          onChange={this.handleChangeImage}
        />
        {!this.state.isValid.image && <span className={styles.error}>Please upload image</span>}
        {this.state.previewImage && (
          <img className={styles.previewImage} src={this.state.previewImage} alt="img" />
        )}
        <button className={styles.submitButton} type="submit">
          Submit
        </button>
      </form>
    );
  }
}
