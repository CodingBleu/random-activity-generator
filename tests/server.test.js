import request from 'supertest';
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import { jest } from '@jest/globals';
import db from '../database';
import app from '../server'; // make sure your server.js exports the app

jest.mock('sqlite3', () => {
  const mDatabase = {
    get: jest.fn(),
    all: jest.fn(),
  };
  const mSqlite3 = {
    Database: jest.fn((_, callback) => {
      callback(null);
      return mDatabase;
    }),
  };
  return mSqlite3;
});

describe('GET /random-activity', () => {
  it('should return a random activity', async () => {
    const mResponse = { category: 'Sport', description: 'Tennis spielen' };
    db.get.mockImplementation((_, __, callback) => {
      callback(null, mResponse);
    });

    const res = await request(app).get('/random-activity?participants=1&category=Sport');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mResponse);
  });

  it('should return 404 if no activity found', async () => {
    db.get.mockImplementation((_, __, callback) => {
      callback(null, null);
    });

    const res = await request(app).get('/random-activity?participants=1&category=Sport');
    expect(res.status).toBe(404);
    expect(res.text).toBe('Keine Aktivitäten gefunden');
  });
});

describe('GET /versioned-content', () => {
  it('should return versioned content path', async () => {
    const mockStat = {
      mtime: new Date('2023-01-01T00:00:00Z')
    };
    jest.spyOn(fs, 'statSync').mockReturnValue(mockStat);

    const res = await request(app).get('/versioned-content?path=/style.css');
    expect(res.status).toBe(200);
    expect(res.text).toBe('/style.css?v=20230101000000');
  });

  it('should return 500 if an error occurs', async () => {
    jest.spyOn(fs, 'statSync').mockImplementation(() => {
      throw new Error('Test error');
    });

    const res = await request(app).get('/versioned-content?path=/style.css');
    expect(res.status).toBe(500);
    expect(res.text).toBe('Internal Server Error');
  });
});