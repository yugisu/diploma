/*
  Warnings:

  - You are about to drop the `_ConversationParticipant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ConversationParticipant" DROP CONSTRAINT "_ConversationParticipant_A_fkey";

-- DropForeignKey
ALTER TABLE "_ConversationParticipant" DROP CONSTRAINT "_ConversationParticipant_B_fkey";

-- DropTable
DROP TABLE "_ConversationParticipant";

-- CreateTable
CREATE TABLE "ConversationParticipant" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "profileId" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,

    PRIMARY KEY ("profileId","conversationId")
);

-- AddForeignKey
ALTER TABLE "ConversationParticipant" ADD FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConversationParticipant" ADD FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
