import React from 'react';
import { vi, it } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  it('should render input field and search button', () => {
    const { getByPlaceholderText, getByText } = render(
      <SearchBar disabled={false} submitHandler={() => {}} />
    );
    const input = getByPlaceholderText('E.g. Rick / Morty / Smith');
    const button = getByText('Search');
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('should call submitHandler with correct search query when form is submitted', () => {
    const mockSubmitHandler = vi.fn();
    const { getByPlaceholderText, getByText } = render(
      <SearchBar disabled={false} submitHandler={mockSubmitHandler} />
    );
    const input = getByPlaceholderText('E.g. Rick / Morty / Smith');
    const button = getByText('Search');
    fireEvent.change(input, { target: { value: 'Rick' } });
    fireEvent.click(button);
    expect(mockSubmitHandler).toHaveBeenCalledWith('Rick');
  });

  it('should show error message if input is empty or contains non-latin letters', () => {
    const mockSubmitHandler = vi.fn();
    const { getByPlaceholderText, getByText, queryByText } = render(
      <SearchBar disabled={false} submitHandler={mockSubmitHandler} />
    );
    const input = getByPlaceholderText('E.g. Rick / Morty / Smith');
    const button = getByText('Search');
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(button);
    expect(mockSubmitHandler).toHaveBeenCalledWith('');
    expect(
      queryByText('Input should not be empty and contain only latin letters.')
    ).toBeInTheDocument();

    fireEvent.change(input, { target: { value: '123' } });
    fireEvent.click(button);
    expect(mockSubmitHandler).toHaveBeenCalledWith('');
    expect(
      queryByText('Input should not be empty and contain only latin letters.')
    ).toBeInTheDocument();
  });

  it('should use default search query if localStorage is empty', () => {
    localStorage.clear();
    const mockSubmitHandler = vi.fn();
    render(<SearchBar disabled={false} submitHandler={mockSubmitHandler} />);
    expect(mockSubmitHandler).toHaveBeenCalledWith('Smith');
  });

  it('should use localStorage search query when component is mounted', () => {
    localStorage.setItem('inputValue', 'Morty');
    const mockSubmitHandler = vi.fn();
    render(<SearchBar disabled={false} submitHandler={mockSubmitHandler} />);
    expect(mockSubmitHandler).toHaveBeenCalledWith('Morty');
  });
});
