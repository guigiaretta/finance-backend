/*
  Warnings:

  - Made the column `icon` on table `categories` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_categories" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "icon" TEXT NOT NULL
);
INSERT INTO "new_categories" ("createdAt", "icon", "id", "name", "updatedAt") SELECT "createdAt", "icon", "id", "name", "updatedAt" FROM "categories";
DROP TABLE "categories";
ALTER TABLE "new_categories" RENAME TO "categories";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
