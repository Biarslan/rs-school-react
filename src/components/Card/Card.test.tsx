import React from 'react';
import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import Card from './Card';

describe('Card', () => {
  const cardInfo = {
    name: 'test name',
    image: '_',
    description: 'Testing description',
    weight: '1kg',
    height: '2.28m',
    link: 'https://rs.school/',
  };

  it('Renders heading', () => {
    render(<Card {...cardInfo} />);

    expect(
      screen.getByRole('heading', {
        level: 5,
      })
    ).toHaveTextContent('test name');
  });

  it('Have Image source', () => {
    render(<Card {...cardInfo} />);

    expect(screen.getByAltText('test name')).toHaveAttribute('src', '_');
  });

  it('Have link', () => {
    render(<Card {...cardInfo} />);

    expect(screen.getByRole('link')).toHaveAttribute('href', 'https://rs.school/');
  });

  it('Have description', () => {
    render(<Card {...cardInfo} />);

    expect(screen.getByText('Testing description')).toBeInTheDocument();

    const weightField = screen.getByText('Weight:').parentElement;
    expect(weightField).toBeInTheDocument();
    expect(weightField).toHaveTextContent('1kg');

    const heightField = screen.getByText('Height:').parentElement;
    expect(heightField).toBeInTheDocument();
    expect(heightField).toHaveTextContent('2.28m');
  });
});
