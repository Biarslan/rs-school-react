import React from 'react';
import { vi, it } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import Card from './Card';
import { ICharacter } from '../../types/Character';

const props: {
  character: ICharacter;
  onClick: () => void;
} = {
  character: {
    id: 417,
    name: 'Baby Legs Chief',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: {
      name: 'Interdimensional Cable',
      url: 'https://rickandmortyapi.com/api/location/6',
    },
    location: {
      name: 'Interdimensional Cable',
      url: 'https://rickandmortyapi.com/api/location/6',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/417.jpeg',
    episode: ['https://rickandmortyapi.com/api/episode/8'],
    url: 'https://rickandmortyapi.com/api/character/417',
    created: '2018-04-15T21:40:39.871Z',
  },
  onClick: vi.fn(),
};

it('should render card details', () => {
  const { getByText } = render(<Card {...props} />);
  expect(getByText('Baby Legs Chief')).toBeInTheDocument();
  expect(getByText('Interdimensional Cable')).toBeInTheDocument();
});

it('should call onClick when card is clicked', () => {
  const { getByTestId } = render(<Card {...props} />);
  fireEvent.click(getByTestId('card'));
  expect(props.onClick).toHaveBeenCalled();
});
