-- CreateTable
CREATE TABLE "Ledger" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "chitId" INTEGER NOT NULL,
    "installmentId" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ledger_pkey" PRIMARY KEY ("id")
);
