/*
  Warnings:

  - You are about to drop the column `summery` on the `Article` table. All the data in the column will be lost.
  - Added the required column `summary` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Article" DROP COLUMN "summery",
ADD COLUMN     "summary" TEXT NOT NULL;
