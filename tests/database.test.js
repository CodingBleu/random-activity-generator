import sqlite3 from 'sqlite3';
import db from '../database';

jest.mock('sqlite3', () => {
  const mDatabase = {
    run: jest.fn(),
    serialize: jest.fn((callback) => callback()),
  };
  const mSqlite3 = {
    Database: jest.fn((_, callback) => {
      callback(null);
      return mDatabase;
    }),
  };
  return mSqlite3;
});

describe('Database setup', () => {
    it('should create activities table', () => {
      const mockDbInstance = new sqlite3.Database();
      mockDbInstance.serialize(() => {
        expect(mockDbInstance.run).toHaveBeenCalledWith(expect.stringContaining('CREATE TABLE activities'));
      });
    });
  
    it('should insert activities into table', () => {
      const mockDbInstance = new sqlite3.Database();
      mockDbInstance.serialize(() => {
        expect(mockDbInstance.run).toHaveBeenCalledWith(expect.stringContaining('INSERT INTO activities'), expect.any(Array), expect.any(Function));
      });
    });
  });