/*
  Warnings:

  - The values [INFO] on the enum `TaskStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TaskStatus_new" AS ENUM ('TODO', 'IN_PROGRESS', 'REVIEW', 'QA', 'DONE');
ALTER TABLE "Task" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Task" ALTER COLUMN "status" TYPE "TaskStatus_new" USING ("status"::text::"TaskStatus_new");
ALTER TABLE "Task" ALTER COLUMN "status" SET  DEFAULT E'TODO';
ALTER TYPE "TaskStatus" RENAME TO "TaskStatus_old";
ALTER TYPE "TaskStatus_new" RENAME TO "TaskStatus";
DROP TYPE "TaskStatus_old";
COMMIT;
