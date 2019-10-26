CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE characters (
  "charId" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "charName" TEXT NOT NULL,
  "charRace" TEXT NOT NULL,
  "charClass" TEXT NOT NULL,
  "charDesc" TEXT,
  "dateCreated" TIMESTAMP DEFAULT now() NOT NULL
);