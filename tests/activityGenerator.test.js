import { screen, fireEvent } from "@testing-library/dom";
import "@testing-library/jest-dom";
import {
  generateActivity,
  loadVersionedCss,
  setupEventListeners,
} from "../public/activityGenerator";

// HTML-Setup für die Tests: Simuliert die Struktur der Webseite
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
  <select id="location">
    <option value="indoor">Indoor</option>
    <option value="outdoor">Outdoor</option>
  </select>
  <link rel="stylesheet" type="text/css" href="/style.css" id="versionedCss">
`;

describe("Random Activity Generator", () => {
  beforeAll(() => {
    setupEventListeners(); // Vor allen Tests werden Event-Listener eingerichtet
  });

  // Test: Überprüft, ob eine Aktivität korrekt angezeigt wird, wenn sie generiert wird
  it("should display activity when generated", async () => {
    // Mock für die API-Antwort, die eine Aktivität zurückgibt
    const mockResponse = { description: "Tennis spielen" };
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ mockResponse }),
      })
    );

    // Simuliert einen Klick auf den "Aktivität generieren" Button
    fireEvent.click(screen.getByText("Aktivität generieren"));

    // Überprüft, ob die generierte Aktivität im Dokument angezeigt wird
    await (() => {
      const activityDisplay = screen.findByText("/Aktivität: Tennis spielen/i");
      expect(activityDisplay).toBeInTheDocument();
    });
  });

  // Test: Überprüft, ob eine Fehlermeldung angezeigt wird, wenn keine Aktivität gefunden wird
  it("should display error message when no activity found", async () => {
    // Mock für die API-Antwort, die keine Aktivität zurückgibt
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({}),
      })
    );

    // Simuliert einen Klick auf den "Aktivität generieren" Button
    fireEvent.click(screen.getByText("Aktivität generieren"));

    // Überprüft, ob die Fehlermeldung im Dokument angezeigt wird
    await (() => {
      const activityDisplay = screen.findByText(
        "/Keine Aktivität gefunden. Versuchen Sie es erneut!/i"
      );
      expect(activityDisplay).toBeInTheDocument();
    });
  });

  // Test: Überprüft, ob die versionierte CSS-Datei korrekt geladen wird
  it("should load versioned CSS", async () => {
    // Mock für die API-Antwort, die den Pfad zur versionierten CSS-Datei zurückgibt
    const mockCssPath = "/style.css?v=20230101000000";
    global.fetch = jest.fn(() =>
      Promise.resolve({
        text: () => Promise.resolve(mockCssPath),
      })
    );

    // Lädt die versionierte CSS-Datei
    loadVersionedCss();

    // Überprüft, ob der Link zur CSS-Datei im Dokument enthalten ist und den richtigen Pfad enthält
    await (() => {
      const link = screen.getByRole("link", { name: /versionedCss/i });
      expect(link).toBeInTheDocument();
      expect(link.href).toContain(mockCssPath);
    });
  });
});
