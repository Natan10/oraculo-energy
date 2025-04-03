/*
  Warnings:

  - Added the required column `filePath` to the `informations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "informations" ADD COLUMN     "filePath" TEXT NOT NULL;
