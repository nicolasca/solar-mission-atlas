import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { spacecraftModels } from '../data/spacecraftModels';
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
    const textureCredits = within(dialog).getByRole('list', {
      name: 'Texture credits',
    });
    expect(within(textureCredits).getAllByRole('listitem')).toHaveLength(
      Object.keys(visualAssets).length,
    );
    expect(
      within(textureCredits).getAllByRole('link', {
        name: 'Official source ↗',
      }),
    ).toHaveLength(Object.keys(visualAssets).length);
    expect(
      within(dialog).getByText(/does not imply endorsement/i),
    ).toBeVisible();

    fireEvent.click(
      within(dialog).getByRole('button', {
        name: 'Close visual credits',
      }),
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(toggle).toHaveFocus();
  });

  it('credits every distinct spacecraft file once with its notes and source', () => {
    render(<VisualAssetCredits />);
    fireEvent.click(screen.getByRole('button', { name: 'Visual credits' }));

    const list = screen.getByRole('list', { name: '3D model credits' });
    const models = Object.values(spacecraftModels).filter(
      (model) => model !== undefined,
    );
    expect(within(list).getAllByRole('listitem')).toHaveLength(
      new Set(models.map((model) => model.url)).size,
    );
    expect(
      within(list).getAllByRole('heading', { name: 'Voyager — NASA model' }),
    ).toHaveLength(1);
    for (const model of models) {
      const heading = within(list).getByRole('heading', { name: model.name });
      const item = heading.closest('li');
      expect(item).not.toBeNull();
      if (!item) continue;
      expect(within(item).getByRole('link')).toHaveAttribute(
        'href',
        model.sourceUrl,
      );
      expect(within(item).getByText(`Credit: ${model.credit}`)).toBeVisible();
      if (model.note) expect(within(item).getByText(model.note)).toBeVisible();
    }
  });

  it('moves focus into the dialog and closes it with Escape', () => {
    render(<VisualAssetCredits />);
    const toggle = screen.getByRole('button', { name: 'Visual credits' });
    fireEvent.click(toggle);

    expect(
      screen.getByRole('button', { name: 'Close visual credits' }),
    ).toHaveFocus();
    fireEvent.keyDown(window, { key: 'Escape' });

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(toggle).toHaveFocus();
  });
});
