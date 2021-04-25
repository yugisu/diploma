-- CreateTable
CREATE TABLE "UserSession" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "endedAt" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserSession" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
