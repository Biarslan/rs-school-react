import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';
import { describe, it } from 'vitest';
// import { getCharacters } from '../../services/api';
// import { ICharacter } from '../../types/Character';

// vi.mock('../../services/api');

// const mockedGetCharacters = getCharacters as vi.MockedFunction<typeof getCharacters>;

// const mockCharacters: ICharacter[] = [
//   {
//     id: 1,
//     name: 'Rick Sanchez',
//     status: 'Alive',
//     species: 'Human',
//     type: '',
//     gender: 'Male',
//     origin: { name: 'Earth', url: '' },
//     location: { name: 'Earth', url: '' },
//     image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
//     episode: [],
//     url: '',
//     created: '',
//   },
//   {
//     id: 2,
//     name: 'Morty Smith',
//     status: 'Alive',
//     species: 'Human',
//     type: '',
//     gender: 'Male',
//     origin: { name: 'Earth', url: '' },
//     location: { name: 'Earth', url: '' },
//     image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
//     episode: [],
//     url: '',
//     created: '',
//   },
// ];

describe('Home', () => {
  // beforeEach(() => {
  //   vi.clearAllMocks();
  // });
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

  // it('should display search results when API call returns successfully', async () => {
  //   const { getByTestId, findByTestId, getByPlaceholderText, getByText } = render(<Home />);

  //   const searchBar = getByPlaceholderText('E.g. Rick / Morty / Smith');
  //   const searchButton = getByText('Search');
  //   await fireEvent.change(searchBar, { target: { value: 'Rick' } });
  //   mockedGetCharacters.mockResolvedValueOnce(() => mockCharacters);
  //   fireEvent.submit(await findByTestId('search-form'));
  //   expect(searchButton).toBeInTheDocument();
  //   await waitForElementToBeRemoved(() => getByTestId('loading-indicator'));
  //   await waitForElementToBeRemoved(() => getByTestId('loading-indicator2'));
  //   const card = findByTestId('card');
  //   expect(getCharacters).toHaveBeenCalledWith('Rick');
  //   expect(card).toBeInTheDocument();
  // });

  // it('should display error message when API call returns an error', async () => {
  //   mockedGetCharacters.mockImplementation(() =>
  //     Promise.reject(new Error('There is nothing here'))
  //   );
  //   const { getByTestId, findByText, getByPlaceholderText, getByText } = render(<Home />);
  //   const searchBar = getByPlaceholderText('E.g. Rick / Morty / Smith');
  //   const searchButton = getByText('Search');
  //   fireEvent.change(searchBar, { target: { value: 'BillGates' } });
  //   fireEvent.click(searchButton);
  //   await waitForElementToBeRemoved(() => getByTestId('loading-indicator'));
  //   const errorMessage = await findByText('There is no matches for your request');
  //   expect(getCharacters).toHaveBeenCalledWith('BillGates');
  //   expect(errorMessage).toBeInTheDocument();
  // });

  // it('should display character modal when a card is clicked', async () => {
  //   mockedGetCharacters.mockImplementation(() => Promise.resolve(mockCharacters));
  //   const { getByTestId, findByTestId, getByPlaceholderText, getByText } = render(<Home />);
  //   const searchBar = getByPlaceholderText('E.g. Rick / Morty / Smith');
  //   const searchButton = getByText('Search');
  //   fireEvent.change(searchBar, { target: { value: 'Rick' } });
  //   fireEvent.click(searchButton);
  //   await waitForElementToBeRemoved(() => getByTestId('loading-indicator'));
  //   const card = await findByTestId('card');
  //   fireEvent.click(card);
  //   const modalBg = await findByTestId('modal-bg');
  //   expect(modalBg).toBeInTheDocument();
  // });
});
