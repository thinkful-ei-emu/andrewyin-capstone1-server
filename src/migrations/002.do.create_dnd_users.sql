CREATE TABLE dnd_users (
  "userId" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "userName" TEXT NOT NULL UNIQUE,
  "fullName" TEXT NOT NULL,
  "password" TEXT NOT NULL,
  "nickname" TEXT,
  "dateCreated" TIMESTAMP NOT NULL DEFAULT now()
);

ALTER TABLE characters
  ADD COLUMN
    "userId" uuid REFERENCES dnd_users("userId")
    ON DELETE SET NULL;