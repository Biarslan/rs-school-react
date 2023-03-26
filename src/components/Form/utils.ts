export interface IFormData {
  name: string | undefined;
  date: number | undefined;
  language: string | undefined;
  isReactLiked: boolean | undefined;
  sex: {
    male: boolean | undefined;
    female: boolean | undefined;
    other: boolean | undefined;
  };
  image: FileList | null | undefined;
}
export interface IValidForm {
  name: boolean;
  date: boolean;
  sex: boolean;
  image: boolean;
}

export function validateForm(formData: IFormData) {
  console.log(formData);
  const { name, date, sex, image } = formData;

  const isNameValid = name && name.length > 0 && name.match(/^[A-Z][a-zA-Z]*$/g) ? true : false;
  const isDateValid = date ? true : false;
  const isSexValid = sex.male || sex.female || sex.other ? true : false;
  const isImageValid = image && image[0] ? true : false;

  const isFormValid: IValidForm = {
    name: isNameValid,
    date: isDateValid,
    sex: isSexValid,
    image: isImageValid,
  };
  const haveErrors = !(isNameValid && isDateValid && isSexValid && isImageValid);
  return { haveErrors, isFormValid };
}

export function prepareData(formData: IFormData) {
  const { name, date, sex, isReactLiked, language, image } = formData;
  if (!image || !name || !date || isReactLiked === undefined || !language) return;
  return {
    name,
    date,
    sex: sex.female ? 'female' : sex.male ? 'male' : 'other',
    isReactLiked,
    language,
    image: URL.createObjectURL(image[0]),
  };
}
