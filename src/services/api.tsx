const basURL = 'https://rickandmortyapi.com/api/character/?name=';
export const getCharacters = async (querry: string) => {
  const response = await fetch(basURL + querry);
  const data = await response.json();
  if (data.error) {
    return new Error(data.error);
  } else {
    return data.results;
  }
};
