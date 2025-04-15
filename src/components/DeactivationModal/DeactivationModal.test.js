import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DeactivationModal from './DeactivationModal';

describe('DeactivationModal', () => {
  const mockOnClose = jest.fn();
  const mockOnSubmit = jest.fn();
  const defaultProps = {
    isOpen: true,
    onClose: mockOnClose,
    onSubmit: mockOnSubmit,
    pluginName: 'Test Plugin'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the modal with correct title when open', () => {
    render(<DeactivationModal {...defaultProps} />);
    expect(screen.getByText(/Goodbyes are always hard/)).toBeInTheDocument();
  });

  it('calls onClose when cancel button is clicked', () => {
    render(<DeactivationModal {...defaultProps} />);
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('disables submit button when no option is selected', () => {
    render(<DeactivationModal {...defaultProps} />);
    const submitButton = screen.getByRole('button', { name: 'Submit & Deactivate' });
    expect(submitButton).toBeDisabled();
  });

  it('enables submit button when an option is selected', async () => {
    render(<DeactivationModal {...defaultProps} />);
    const option = screen.getByText('Found a better plugin');
    await userEvent.click(option);
    const submitButton = screen.getByRole('button', { name: 'Submit & Deactivate' });
    expect(submitButton).not.toBeDisabled();
  });

  it('submits feedback with correct data', async () => {
    render(<DeactivationModal {...defaultProps} />);
    
    // Select a reason
    const option = screen.getByText('Found a better plugin');
    await userEvent.click(option);
    
    // Add additional feedback
    const textarea = screen.getByPlaceholderText(/Would you mind sharing which plugin/);
    await userEvent.type(textarea, 'Test feedback message');
    
    // Submit the form
    const submitButton = screen.getByRole('button', { name: 'Submit & Deactivate' });
    await userEvent.click(submitButton);
    
    expect(mockOnSubmit).toHaveBeenCalledWith({
      reason: 'better_plugin',
      feedback: 'Test feedback message'
    });
  });

  it('does not render when isOpen is false', () => {
    render(<DeactivationModal {...defaultProps} isOpen={false} />);
    expect(screen.queryByText(/Goodbyes are always hard/)).not.toBeInTheDocument();
  });

  it('shows privacy notice with correct text', () => {
    render(<DeactivationModal {...defaultProps} />);
    expect(screen.getByText(/We share your data with Appsero/)).toBeInTheDocument();
    expect(screen.getByText('Learn more')).toBeInTheDocument();
  });
});