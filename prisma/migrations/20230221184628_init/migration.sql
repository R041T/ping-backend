-- AlterTable
ALTER TABLE "PrivateChatList" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "PrivateChatMessages" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
