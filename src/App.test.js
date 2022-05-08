import { render, screen } from '@testing-library/react';
import AddCustomerComponent from './App';

test('renders learn react link', () => {
  render(<AddCustomerComponent />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
