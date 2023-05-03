-- CreateTable
CREATE TABLE "PrivateChatList" (
    "id" UUID NOT NULL,
    "user1" TEXT NOT NULL,
    "user2" TEXT NOT NULL,
    "starter" TEXT NOT NULL,

    CONSTRAINT "PrivateChatList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrivateChatMessages" (
    "id" UUID NOT NULL,
    "chatid" UUID NOT NULL,
    "sender" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "recipient" TEXT NOT NULL,
    "sendTime" TIMESTAMP NOT NULL,

    CONSTRAINT "PrivateChatMessages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PrivateChatMessages" ADD CONSTRAINT "PrivateChatMessages_chatid_fkey" FOREIGN KEY ("chatid") REFERENCES "PrivateChatList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
