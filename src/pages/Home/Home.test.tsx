import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { screen, fireEvent, act, waitFor } from '@testing-library/react';
import Home from './Home';
import { describe, it } from 'vitest';
import { renderWithProviders } from '../../utils/test-utils';
import { setupStore } from '../../app/store';
import { testAPIRequestSuccess, testCharacter } from '../../utils/test-data';

export const handlers = [
  rest.get('https://rickandmortyapi.com/api/character/', (req, res, ctx) => {
    const name = req.url.searchParams.get('name');

    if (name === 'Rick') {
      return res(ctx.json(testAPIRequestSuccess), ctx.delay(150));
    } else {
      return res(ctx.json(testAPIRequestSuccess), ctx.delay(150));
    }
  }),
];
const server = setupServer(...handlers);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Home', () => {
  it('Renders heading', () => {
    const store = setupStore();

    renderWithProviders(<Home />, { store });

    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent('Find characters from Rick and Morty by name');
  });

  it('should display search bar when component is mounted', () => {
    const store = setupStore();

    renderWithProviders(<Home />, {
      store,
      preloadedState: { searchResults: { value: [testCharacter] } },
    });
    const searchBar = screen.getByPlaceholderText('E.g. Rick / Morty / Smith');
    const searchButton = screen.getByText('Search');
    expect(searchBar).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  it('should display search querry in message', async () => {
    const store = setupStore();
    renderWithProviders(<Home />, {
      store,
    });
    const preloader = await screen.getByTestId('loading-indicator');

    await waitFor(() => {
      expect(preloader).not.toBeInTheDocument();
    });
    const searchBar = screen.getByPlaceholderText('E.g. Rick / Morty / Smith');
    await fireEvent.change(searchBar, {
      target: { defaultValue: 'TestTest', value: 'TestTest' },
    });
    await fireEvent.submit(screen.getByTestId('search-form'));
    const searchQueryMessage = await screen.findByText(`Results for querry 'TestTest'`);
    expect(searchQueryMessage).toBeInTheDocument();
  });

  it('should display character modal when a card is clicked', async () => {
    const store = setupStore();
    renderWithProviders(<Home />, {
      store,
    });
    const preloader = await screen.getByTestId('loading-indicator');

    await waitFor(() => {
      expect(preloader).not.toBeInTheDocument();
    });
    const searchBar = screen.getByPlaceholderText('E.g. Rick / Morty / Smith');

    await fireEvent.change(searchBar, {
      target: { defaultValue: 'Rick', value: 'Rick' },
    });
    await fireEvent.submit(screen.getByTestId('search-form'));
    const card = await screen.findByText('Rick Sanchez');
    expect(card).toBeInTheDocument();
    fireEvent.click(card);
    const modalBg = await screen.findByTestId('modal-bg');
    expect(modalBg).toBeInTheDocument();
  });

  it('should display and close character modal when a card is clicked', async () => {
    const store = setupStore();
    renderWithProviders(<Home />, {
      store,
      preloadedState: { searchResults: { value: [testCharacter] } },
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
