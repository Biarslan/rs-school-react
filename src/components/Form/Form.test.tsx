import React from 'react';
import { describe, it, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import Form from './Form';

describe('Form', () => {
  window.URL.createObjectURL = vi.fn(() => 'fakeImage');

  it('should show error messages for missing required fields', async () => {
    const mockOnFormSubmit = vi.fn();
    render(<Form onFormSubmit={mockOnFormSubmit} />);
    const user = userEvent.setup();
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    await user.click(submitButton);
    expect(
      screen.getByText(/Name shound contain only latin letters and start with capital/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/ate is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Select sex/i)).toBeInTheDocument();
    expect(screen.getByText(/Please upload image/i)).toBeInTheDocument();
  });

  it('should submit the form with all required fields filled', async () => {
    const mockOnFormSubmit = vi.fn();

    render(<Form onFormSubmit={mockOnFormSubmit} />);
    const user = userEvent.setup();

    const nameInput = screen.getByLabelText(/name/i);
    const dateInput = screen.getByLabelText(/date/i);
    const languageSelect = screen.getByLabelText(/favourite language/i);
    const reactCheckbox = screen.getByLabelText(/likes reactjs/i);
    const maleRadioButton = screen.getByLabelText(/Male/);
    const imageInput = screen.getByLabelText(/upload photo/i);

    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    await user.upload(imageInput, file);

    await fireEvent.change(nameInput, { target: { value: 'JohnDoe' } });
    await fireEvent.change(dateInput, { target: { value: '2022-01-01' } });
    await fireEvent.change(languageSelect, { target: { value: 'PHP' } });
    await fireEvent.click(reactCheckbox);
    await fireEvent.click(maleRadioButton);

    const submitButton = screen.getByRole('button', { name: 'Submit' });
    await user.click(submitButton);

    await waitFor(() => expect(mockOnFormSubmit).toHaveBeenCalledTimes(1));
    expect(mockOnFormSubmit).toHaveBeenCalledWith({
      name: 'JohnDoe',
      date: '2022-01-01',
      language: 'PHP',
      isReactLiked: true,
      sex: 'male',
      image: 'fakeImage',
    });
  });
});
