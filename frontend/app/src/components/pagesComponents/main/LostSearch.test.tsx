import { LostSearch } from './LostSearch';

import { render, screen } from '@testing-library/react';

test('renders learn react link', () => {
    render(<LostSearch />);
    const searchTitle = screen.getByText(/Search/i)
    expect(searchTitle).toHaveClass('lostSearch__title')
    expect(searchTitle).toBeInTheDocument()
});
