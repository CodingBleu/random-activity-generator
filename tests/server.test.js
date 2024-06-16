import { jest } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import request from 'supertest';
import url from 'url';
import db from '../database';
import app from '../server';



jest.mock('sqlite3', () => {
  const mDatabase = {
    get: jest.fn(),
    all: jest.fn(),
    run: jest.fn(), 
    serialize: jest.fn((callback) => callback()), // Mock für die serialize Methode
  };
  const mSqlite3 = {
    Database: jest.fn((_, callback) => {
      callback(null); // Simuliere erfolgreiche Verbindung zur Datenbank
      return mDatabase;
    }),
  };
  return mSqlite3;
});

// Testsuite für die GET /random-activity Route
describe('GET /random-activity', () => {
   // Test: Überprüft, ob eine zufällige Aktivität zurückgegeben wird
  it('should return a random activity', async () => {
    // Simulierte Antwort von der Datenbank
    const mResponse = { category: 'Sport', description: 'Tennis spielen' };
    db.get.mockImplementation((_, __, callback) => {
      callback(null, mResponse); // Simuliert eine erfolgreiche Antwort von db.get
    });

    // Sende eine GET-Anfrage an die /random-activity Route
    const res = await request(app).get('/random-activity?participants=1&category=Sport');
    // Überprüfe den HTTP-Statuscode
    expect(res.status).toBe(200);
    // Überprüfe den Antwortinhalt
    expect(res.body).toEqual(mResponse);
  });

  // Test: Überprüft, ob 404 zurückgegeben wird, wenn keine Aktivität gefunden wird
  it('should return 404 if no activity found', async () => {
    db.get.mockImplementation((_, __, callback) => {
      callback(null, null); // Simuliert, dass keine Aktivität gefunden wurde
    });

    // Sende eine GET-Anfrage an die /random-activity Route
    const res = await request(app).get('/random-activity?participants=1&category=Sport');
     // Überprüfe den HTTP-Statuscode
    expect(res.status).toBe(404);
    // Überprüfe den Antworttext
    expect(res.text).toBe('Keine Aktivitäten gefunden');
  });
});