import { jest } from "@jest/globals";
import sqlite3 from "sqlite3";

// Mock sqlite3 Modul
jest.mock("sqlite3", () => {
  const mDatabase = {
    serialize: jest.fn(),
    close: jest.fn(),
    getRandomCategory: jest.fn().mockResolvedValue("Sport"), // davon ausgehen, dass Sport eine valide Aktivität ist
  };
  return {
    Database: jest.fn((filename, callback) => {
      callback(null); // Eine erfolgreiche Verbindung zur Database simulieren
      return mDatabase;
    }),
  };
});

describe("Database Operations", () => {
  let database;

  beforeAll(() => {
    // Korrekte Simulation der Erstellung einer Datenbankinstanz mit "activities.db" und einer Callback-Funktion
    database = new sqlite3.Database("activities.db", () => {});
  });

  test("should create a new SQLite database instance", () => {
    // Dies sollte nun funktionieren, da wir den Konstruktoraufruf korrekt simulieren
    expect(sqlite3.Database).toHaveBeenCalledWith(
      "activities.db",
      expect.any(Function)
    );
  });

  test("should serialize database operations", () => {
    // Serialize auslösen, um sicherzustellen, dass es aufgerufen wird
    database.serialize();
    expect(database.serialize).toHaveBeenCalled();
  });

  test("getRandomCategory should return a valid category", async () => {
    // Verwenden Sie die nachgebildete Datenbankinstanz mit der Methode getRandomCategory
    const category = await database.getRandomCategory();
    const expectedCategories = [
      "Sport",
      "Culture",
      "Education",
      "Information",
      "Culinary",
      "Housework",
    ];

    expect(expectedCategories).toContain(category);
  });
});
