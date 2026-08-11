-- AlterTable
ALTER TABLE "AttemptAnswer" ADD COLUMN     "wrongAttempts" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Problem" ADD COLUMN     "showCalculator" BOOLEAN NOT NULL DEFAULT false;
