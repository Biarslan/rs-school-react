import React from 'react';
import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import Home from './Home';

describe('Home', () => {
  it('Renders heading', () => {
    render(<Home />);
    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent('Module 1');
  });
});
