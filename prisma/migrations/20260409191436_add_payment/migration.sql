/*
  Warnings:

  - A unique constraint covering the columns `[userId,installmentId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "status" SET DEFAULT 'PAID';

-- CreateIndex
CREATE UNIQUE INDEX "Payment_userId_installmentId_key" ON "Payment"("userId", "installmentId");
