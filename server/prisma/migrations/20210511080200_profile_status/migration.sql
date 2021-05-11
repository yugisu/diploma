-- CreateEnum
CREATE TYPE "ProfileStatus" AS ENUM ('CREATED', 'ACTIVE', 'SUSPENDED');

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "status" "ProfileStatus" NOT NULL DEFAULT E'CREATED';
