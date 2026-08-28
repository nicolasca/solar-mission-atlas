import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { visualAssets } from '../data/visualAssets';
import { VisualAssetCredits } from './VisualAssetCredits';

describe('VisualAssetCredits', () => {
  it('opens a complete credit list and closes it through its close control', () => {
    render(<VisualAssetCredits />);

    const toggle = screen.getByRole('button', { name: 'Visual credits' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(toggle);

    const dialog = screen.getByRole('dialog', {
      name: 'Visual asset credits',
    });
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(within(dialog).getAllByRole('listitem')).toHaveLength(
      Object.keys(visualAssets).length,
    );
    expect(
      within(dialog).getAllByRole('link', { name: 'View official source' }),
    ).toHaveLength(Object.keys(visualAssets).length);
    expect(
      within(dialog).getByText(/does not imply endorsement/i),
    ).toBeVisible();

    fireEvent.click(
      within(dialog).getByRole('button', { name: 'Close visual credits' }),
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
