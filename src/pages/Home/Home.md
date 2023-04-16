import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Home from './Home';
import { describe, it, vi } from 'vitest';
import { getCharacters } from '../../services/api';

vi.mock('../../services/api', () => ({
  getCharacters: vi.fn(),
}));

const mockCharacter = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: {
    name: 'Earth (C-137)',
    url: 'https://rickandmortyapi.com/api/location/1',
  },
  location: {
    name: 'Earth (Replacement Dimension)',
    url: 'https://rickandmortyapi.com/api/location/20',
  },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  episode: [
    'https://rickandmortyapi.com/api/episode/1',
    'https://rickandmortyapi.com/api/episode/2',
  ],
  url: 'https://rickandmortyapi.com/api/character/1',
  created: '2017-11-04T18:48:46.250Z',
};
describe('Home', () => {
  it('Renders heading', () => {
    render(<Home />);

    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent('Find characters from Rick and Morty by name');
  });
  it('should display search bar when component is mounted', () => {
    const { getByPlaceholderText, getByText } = render(<Home />);
    const searchBar = getByPlaceholderText('E.g. Rick / Morty / Smith');
    const searchButton = getByText('Search');
    expect(searchBar).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  it('should display search results when API call returns successfully', async () => {
    (getCharacters as jest.Mock).mockResolvedValue([mockCharacter]);

    render(<Home />);
    const searchBar = screen.getByPlaceholderText('E.g. Rick / Morty / Smith');
    await act(async () => {
      await fireEvent.change(searchBar, { target: { defaultValue: 'Rick', value: 'Rick' } });
      await fireEvent.submit(screen.getByTestId('search-form'));
    });

    const card = await screen.findByText('Rick Sanchez');
    expect(card).toBeInTheDocument();
  });

  it('should display "Nothing found message" an error', async () => {
    (getCharacters as jest.Mock).mockResolvedValue(new Error('There is nothing here'));
    render(<Home />);
    const searchBar = screen.getByPlaceholderText('E.g. Rick / Morty / Smith');
    await act(async () => {
      await fireEvent.change(searchBar, {
        target: { defaultValue: 'BillGates', value: 'BillGates' },
      });
      await fireEvent.submit(screen.getByTestId('search-form'));
    });
    const errorMessage = await screen.findByText('There is no matches for your request');
    expect(errorMessage).toBeInTheDocument();
  });

  it('should display character modal when a card is clicked', async () => {
    (getCharacters as jest.Mock).mockResolvedValue([mockCharacter]);
    render(<Home />);
    const searchBar = screen.getByPlaceholderText('E.g. Rick / Morty / Smith');
    await act(async () => {
      await fireEvent.change(searchBar, { target: { defaultValue: 'Rick', value: 'Rick' } });
      await fireEvent.submit(screen.getByTestId('search-form'));
    });
    const card = await screen.findByText('Rick Sanchez');
    expect(card).toBeInTheDocument();
    fireEvent.click(card);
    const modalBg = await screen.findByTestId('modal-bg');
    expect(modalBg).toBeInTheDocument();
  });

  it('should display and close character modal when a card is clicked', async () => {
    (getCharacters as jest.Mock).mockResolvedValue([mockCharacter]);
    render(<Home />);
    const searchBar = screen.getByPlaceholderText('E.g. Rick / Morty / Smith');
    await act(async () => {
      await fireEvent.change(searchBar, { target: { defaultValue: 'Rick', value: 'Rick' } });
      await fireEvent.submit(screen.getByTestId('search-form'));
    });
    const card = await screen.findByText('Rick Sanchez');
    expect(card).toBeInTheDocument();
    fireEvent.click(card);
    const modalBg = await screen.findByTestId('modal-bg');
    expect(modalBg).toBeInTheDocument();

    await act(async () => {
      await fireEvent.click(modalBg);
    });
    expect(modalBg).not.toBeInTheDocument();
  });
});
