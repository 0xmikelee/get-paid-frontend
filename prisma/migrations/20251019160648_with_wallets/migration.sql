-- AlterTable
ALTER TABLE "Client" ALTER COLUMN "walletAddress" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "walletAddress" DROP NOT NULL;
