import '@testing-library/jest-dom';
import { screen, fireEvent } from '@testing-library/dom';
import { setupEventListeners } from '../public/activityGenerator';

document.body.innerHTML = `
  <div id="activity-display"></div>
  <button id="generate-btn">Generate</button>
  <input id="participants" value="1">
  <select id="category">
    <option value="Sport">Sport</option>
    <option value="Culture">Culture</option>
    <option value="random">Random</option>
  </select>
`;

describe('Random Activity Generator', () => {
    beforeAll(() => {
      setupEventListeners(); // Richte die Event-Listener ein
    });
  
    it('should display activity when generated', async () => {
      const mockResponse = { description: 'Tennis spielen' };
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockResponse),
        })
      );
  
      fireEvent.click(screen.getByText('Generate'));
  
      const activityDisplay = await screen.findByText('Aktivität: Tennis spielen');
      expect(activityDisplay).toBeInTheDocument();
    });
  
    it('should display error message when no activity found', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve({}),
        })
      );
  
      fireEvent.click(screen.getByText('Generate'));
  
      const activityDisplay = await screen.findByText('Keine Aktivität gefunden. Versuchen Sie es erneut!');
      expect(activityDisplay).toBeInTheDocument();
    });
  });