import { render, screen, waitFor } from '@testing-library/react';
import Async from '../../pages/Async';

describe('Home Page', () => {
  it('should render H1 tag', async () => {
    render(<Async />);

    await waitFor(() => {
      return expect(screen.queryByText('Async')).toBeInTheDocument();
    });
  });
});
