import { ICharacter } from '../types/Character';
import { IAPIResponse } from '../types/api';

export const testCharacter: ICharacter = {
  id: 1,
  name: 'Rick Sanchez',
  url: 'https://rickandmortyapi.com/api/character/1',
  created: '2017-11-04T18:48:46.250Z',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: { name: 'Earth', url: 'https://rickandmortyapi.com/api/location/1' },
  location: { name: 'Earth', url: 'https://rickandmortyapi.com/api/location/20' },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  episode: [
    'https://rickandmortyapi.com/api/episode/1',
    'https://rickandmortyapi.com/api/episode/2',
  ],
};

export const testAPIRequestSuccess: IAPIResponse = {
  info: {
    count: 1,
    pages: 1,
    next: null,
    prev: null,
  },
  results: [testCharacter],
};
