import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Studio Ghibli link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Studio Ghibli/i);
  expect(linkElement).toBeInTheDocument();
});