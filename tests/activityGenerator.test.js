import '@testing-library/jest-dom';
import { screen, fireEvent } from '@testing-library/dom';
import { generateActivity, loadVersionedCss, setupEventListeners } from '../public/activityGenerator';

document.body.innerHTML = `
  <div id="activity-display"></div>
  <button id="generate-btn">Aktivität generieren</button>
  <input type="number" id="participants" min="1" value="1"/>
  <select id="category">
    <option value="random">Zufällige Kategorie</option>
    <option value="Sport">Sport</option>
    <option value="Culture">Kultur</option>
    <option value="Culinary">Kulinarik</option>
    <option value="Education">Bildung</option>
    <option value="Information">Information</option>
    <option value="Housework">Hausarbeit</option>
  </select>
  <link rel="stylesheet" type="text/css" href="/style.css" id="versionedCss">
`;

describe('Random Activity Generator', () => {
  beforeAll(() => {
    setupEventListeners(); // Event-Listener einrichten
  });

  it('should display activity when generated', async () => {
    const mockResponse = { description: 'Tennis spielen' };
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      })
    );

    fireEvent.click(screen.getByText('Aktivität generieren'));

    const activityDisplay = await screen.findByText('Aktivität: Tennis spielen');
    expect(activityDisplay).toBeInTheDocument();
  });

  it('should display error message when no activity found', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({}),
      })
    );

    fireEvent.click(screen.getByText('Aktivität generieren'));

    const activityDisplay = await screen.findByText('Keine Aktivität gefunden. Versuchen Sie es erneut!');
    expect(activityDisplay).toBeInTheDocument();
  });

  it('should load versioned CSS', async () => {
    const mockCssPath = '/style.css?v=20230101000000';
    global.fetch = jest.fn(() =>
      Promise.resolve({
        text: () => Promise.resolve(mockCssPath),
      })
    );

    loadVersionedCss();

    const link = await screen.findByRole('link', { href: mockCssPath });
    expect(link).toBeInTheDocument();
    expect(link.href).toContain(mockCssPath);
  });
});