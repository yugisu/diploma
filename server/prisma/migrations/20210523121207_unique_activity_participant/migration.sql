/*
  Warnings:

  - A unique constraint covering the columns `[activityId,profileId]` on the table `ActivityParticipant` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ActivityParticipant.activityId_profileId_unique" ON "ActivityParticipant"("activityId", "profileId");
