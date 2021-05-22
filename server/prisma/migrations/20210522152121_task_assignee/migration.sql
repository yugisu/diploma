/*
  Warnings:

  - You are about to drop the `_TaskAssigneesProfiles` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `workspaceId` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_TaskAssigneesProfiles" DROP CONSTRAINT "_TaskAssigneesProfiles_A_fkey";

-- DropForeignKey
ALTER TABLE "_TaskAssigneesProfiles" DROP CONSTRAINT "_TaskAssigneesProfiles_B_fkey";

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "workspaceId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_TaskAssigneesProfiles";

-- CreateTable
CREATE TABLE "TaskAssignee" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "profileId" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,

    PRIMARY KEY ("profileId","taskId")
);

-- AddForeignKey
ALTER TABLE "TaskAssignee" ADD FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskAssignee" ADD FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;
