import { render, screen } from '@testing-library/react';
import { LostSearch } from './LostSearch';

test('renders learn react link', () => {
    render(<LostSearch />);
    const searchTitle = screen.getByText(/Search/i)
    expect(searchTitle).toHaveClass('lostSearch__title')
    expect(searchTitle).toBeInTheDocument()
});
