/*
  Warnings:

  - You are about to drop the `PrivateChatList` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PrivateChatMessages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PrivateChatMessages" DROP CONSTRAINT "PrivateChatMessages_chatid_fkey";

-- DropTable
DROP TABLE "PrivateChatList";

-- DropTable
DROP TABLE "PrivateChatMessages";

-- CreateTable
CREATE TABLE "Rooms" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "isPrivate" BOOLEAN NOT NULL,
    "starter" UUID NOT NULL,
    "isStartedChat" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Participants" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userid" UUID NOT NULL,
    "roomid" UUID NOT NULL,

    CONSTRAINT "Participants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Messages" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "roomid" UUID NOT NULL,
    "sender" UUID NOT NULL,
    "message" TEXT NOT NULL,
    "sendTime" TIMESTAMP NOT NULL,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Rooms" ADD CONSTRAINT "Rooms_starter_fkey" FOREIGN KEY ("starter") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participants" ADD CONSTRAINT "Participants_userid_fkey" FOREIGN KEY ("userid") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participants" ADD CONSTRAINT "Participants_roomid_fkey" FOREIGN KEY ("roomid") REFERENCES "Rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_sender_fkey" FOREIGN KEY ("sender") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_roomid_fkey" FOREIGN KEY ("roomid") REFERENCES "Rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
