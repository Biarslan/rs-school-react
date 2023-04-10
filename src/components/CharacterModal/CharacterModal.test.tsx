import React from 'react';
import { vi, it } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import CharacterModal from './CharacterModal';
import { ICharacter } from '../../types/Character';

describe('CharacterModal', () => {
  const onClose = vi.fn();
  const character: ICharacter = {
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

  it('renders the modal with character information', () => {
    const { getByText } = render(<CharacterModal character={character} onClose={onClose} />);
    expect(getByText('Rick Sanchez')).toBeInTheDocument();

    const idElem = getByText('ID:').parentElement;
    expect(idElem).toBeInTheDocument();
    expect(idElem).toHaveTextContent('1');
    const statusElem = getByText('Status:').parentElement;
    expect(statusElem).toBeInTheDocument();
    expect(statusElem).toHaveTextContent('Alive');

    const episodesElem = getByText('Episodes:').parentElement;
    expect(episodesElem).toBeInTheDocument();
    expect(episodesElem).toHaveTextContent('1, 2');

    expect(getByText('Human')).toBeInTheDocument();
    expect(getByText('Type:')).toBeInTheDocument();
    expect(getByText('Male')).toBeInTheDocument();

    const OriginElem = getByText('Origin:').parentElement;
    expect(OriginElem).toBeInTheDocument();
    expect(OriginElem).toHaveTextContent('Earth');
  });

  it('calls the onClose function when clicking outside the modal', () => {
    const { getByTestId } = render(<CharacterModal character={character} onClose={onClose} />);
    fireEvent.click(getByTestId('modal-bg'));
    expect(onClose).toHaveBeenCalled();
  });

  it('calls the onClose function when clicking the close button', () => {
    const { getByText } = render(<CharacterModal character={character} onClose={onClose} />);
    fireEvent.click(getByText('X'));
    expect(onClose).toHaveBeenCalled();
  });
});
