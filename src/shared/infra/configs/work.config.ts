import Database from "better-sqlite3";

export const db = new Database("database.sqlite");

export function initializeDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS work (
      codigo INTEGER PRIMARY KEY AUTOINCREMENT,
      id integer NOT NULL UNIQUE,
      position integer NOT NULL,
      status integer NOT NULL,
      rangeStart TEXT NOT NULL,
      rangeEnd TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS key (
      codigo integer PRIMARY KEY AUTOINCREMENT,
      codigoWork integer NOT NULL,
      keyPublic TEXT NOT NULL,
      privateKey TEXT NOT NULL,
      status integer NOT NULL,
      FOREIGN KEY (codigoWork) REFERENCES work (codigo)
    )
  `);
}
