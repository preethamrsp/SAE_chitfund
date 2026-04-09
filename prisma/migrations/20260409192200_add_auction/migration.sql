/*
  Warnings:

  - A unique constraint covering the columns `[userId,installmentId]` on the table `Bid` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Winner" (
    "id" SERIAL NOT NULL,
    "chitId" INTEGER NOT NULL,
    "installmentId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "winningBid" DOUBLE PRECISION NOT NULL,
    "payoutAmount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Winner_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bid_userId_installmentId_key" ON "Bid"("userId", "installmentId");
