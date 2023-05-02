import React from 'react';
import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import FormCard from './FormCard';

describe('Card', () => {
  const cardInfo = {
    name: 'Linus',
    date: 0,
    sex: 'male',
    isReactLiked: false,
    language: 'Other',
    image: 'NoImage',
  };
  const cardInfo2 = {
    name: 'Ada Lovelace',
    date: 0,
    sex: 'female',
    isReactLiked: true,
    language: 'Visual Basic',
    image: 'NoImage',
  };

  it('Renders heading', () => {
    render(<FormCard {...cardInfo} />);

    expect(
      screen.getByRole('heading', {
        level: 5,
      })
    ).toHaveTextContent('Linus');
  });

  it('Have Image source', () => {
    render(<FormCard {...cardInfo} />);

    expect(screen.getByAltText('Linus')).toHaveAttribute('src', 'NoImage');
  });

  it('Have description', () => {
    render(<FormCard {...cardInfo} />);

    expect(
      screen.getByText(/We dont know what favourite language is :\( *Doesnt like ReactJS/)
    ).toBeInTheDocument();

    const birthField = screen.getByText('Birth date:').parentElement;
    expect(birthField).toBeInTheDocument();
    expect(birthField).toHaveTextContent('Birth date: 1/1/1970');

    const heightField = screen.getByText('Sex:').parentElement;
    expect(heightField).toBeInTheDocument();
    expect(heightField).toHaveTextContent('male');
  });

  it('Test Another description ', () => {
    render(<FormCard {...cardInfo2} />);

    expect(
      screen.getByText(/Favourite language is Visual Basic *Likes ReactJS/)
    ).toBeInTheDocument();

    const heightField = screen.getByText('Sex:').parentElement;
    expect(heightField).toBeInTheDocument();
    expect(heightField).toHaveTextContent('female');
  });
});
