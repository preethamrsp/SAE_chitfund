/*
  Warnings:

  - A unique constraint covering the columns `[userId,chitId]` on the table `ChitMember` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `position` to the `ChitMember` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ChitMember" ADD COLUMN     "position" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ChitMember_userId_chitId_key" ON "ChitMember"("userId", "chitId");
