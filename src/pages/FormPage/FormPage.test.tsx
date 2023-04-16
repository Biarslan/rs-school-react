import React from 'react';
import { it } from 'vitest';
import { screen } from '@testing-library/react';
import FormPage from './FormPage';
import { renderWithProviders } from '../../utils/test-utils';

describe('FormPage', () => {
  it('should render the title correctly', () => {
    renderWithProviders(<FormPage />);
    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent('Form');
  });

  it('should display stored submitted forms', async () => {
    renderWithProviders(<FormPage />, {
      preloadedState: {
        submittedForms: {
          value: [
            {
              name: 'TestingName',
              date: 1,
              sex: 'female',
              isReactLiked: false,
              language: 'Other',
              image: 'testUrl',
            },
          ],
        },
      },
    });
    expect(screen.getByAltText('TestingName')).toHaveAttribute('src', 'testUrl');
    expect(
      screen.getByText(/We dont know what favourite language is :\( *Doesnt like ReactJS/)
    ).toBeInTheDocument();

    const heightField = screen.getByText('Sex:').parentElement;
    expect(heightField).toBeInTheDocument();
    expect(heightField).toHaveTextContent('female');
  });
});
