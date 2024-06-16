import { jest } from '@jest/globals';
import { setupEventListeners } from '../public/activityGenerator.js';

// Mocking des Moduls, um tatsächliche DOM-Manipulation und Seiteneffekte zu vermeiden
jest.mock('../public/activityGenerator.js', () => ({
  setupEventListeners: jest.fn(),
}));

describe('index.js tests', () => {
  beforeEach(() => {
    // Löschen aller Instanzen und Aufrufe des Konstruktors und aller Methoden:
    setupEventListeners.mockClear();
  });

  test('setupEventListeners is called once on startup', () => {
    // Simulieren Sie die anfängliche Skriptausführung, die setupEventListeners aufrufen soll
    require('../public/index.js');

    expect(setupEventListeners).toHaveBeenCalledTimes(1);
  });

  test('setupEventListeners does not throw an error when called', () => {
    expect(() => setupEventListeners()).not.toThrow();
  });
});