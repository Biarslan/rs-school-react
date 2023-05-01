import React from 'react';
import { vi, it } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import SearchBar from './SearchBar';
import { renderWithProviders } from '../../utils/test-utils';

describe('SearchBar', () => {
  it('should render input field and search button', () => {
    renderWithProviders(<SearchBar disabled={false} submitHandler={() => {}} />);
    const input = screen.getByPlaceholderText('E.g. Rick / Morty / Smith');
    const button = screen.getByText('Search');
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('should call submitHandler with correct search query when form is submitted', () => {
    const mockSubmitHandler = vi.fn();
    renderWithProviders(<SearchBar disabled={false} submitHandler={mockSubmitHandler} />);
    const input = screen.getByPlaceholderText('E.g. Rick / Morty / Smith');
    const button = screen.getByText('Search');
    fireEvent.change(input, { target: { value: 'Rick' } });
    fireEvent.click(button);
    expect(mockSubmitHandler).toHaveBeenCalledWith('Rick');
  });

  it('should show error message if input contains non-latin letters', () => {
    const mockSubmitHandler = vi.fn();
    renderWithProviders(<SearchBar disabled={false} submitHandler={mockSubmitHandler} />);
    const input = screen.getByPlaceholderText('E.g. Rick / Morty / Smith');
    const button = screen.getByText('Search');
    fireEvent.change(input, { target: { value: 'тест' } });
    fireEvent.click(button);
    expect(mockSubmitHandler).not.toHaveBeenCalled();
    expect(screen.queryByText('Input should contain only latin letters.')).toBeInTheDocument();

    fireEvent.change(input, { target: { value: '123' } });
    fireEvent.click(button);
    expect(mockSubmitHandler).not.toHaveBeenCalled();
    expect(screen.queryByText('Input should contain only latin letters.')).toBeInTheDocument();
  });

  it('should use stored search query when component is mounted', () => {
    const mockSubmitHandler = vi.fn();
    renderWithProviders(<SearchBar disabled={false} submitHandler={mockSubmitHandler} />, {
      preloadedState: {
        search: { value: 'Morty' },
        searchResults: { value: [] },
        submittedForms: { value: [] },
      },
    });
    const input = screen.getByPlaceholderText('E.g. Rick / Morty / Smith') as HTMLInputElement;
    expect(input.value).toBe('Morty');
  });
});
