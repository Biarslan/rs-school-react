export interface ICharacterLocation {
  name: string;
  url: string;
}

export interface ICharacter {
  id: number;
  name: string;
  url: string;
  created: string;
  status: 'Dead' | 'Alive' | 'unknown';
  species: string;
  type: string;
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
  origin: ICharacterLocation;
  location: ICharacterLocation;
  image: string;
  episode: string[];
}

declare global {
  interface Window {
    __PRELOADED_STATE__: ICharacter[];
  }
}
