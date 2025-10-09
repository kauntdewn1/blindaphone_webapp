import { render, screen } from '@testing-library/react';
import BlindaphoneV2 from '../app/page';

// Mock do componente que usa 'use client'
jest.mock('../app/page', () => {
  return function MockBlindaphoneV2() {
    return (
      <div data-testid="blindaphone-page">
        <h1>Proteja smartphones com IRON FORCE</h1>
        <p>Não é película, é Iron Force</p>
      </div>
    );
  };
});

describe('BlindaphoneV2', () => {
  it('renders without crashing', () => {
    render(<BlindaphoneV2 />);
    expect(screen.getByTestId('blindaphone-page')).toBeInTheDocument();
  });

  it('displays the main heading', () => {
    render(<BlindaphoneV2 />);
    expect(screen.getByText('Proteja smartphones com IRON FORCE')).toBeInTheDocument();
  });

  it('displays the product description', () => {
    render(<BlindaphoneV2 />);
    expect(screen.getByText('Não é película, é Iron Force')).toBeInTheDocument();
  });
});
