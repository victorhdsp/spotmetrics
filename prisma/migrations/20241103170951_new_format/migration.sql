/*
  Warnings:

  - A unique constraint covering the columns `[skillId]` on the table `Player` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `skillId` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Skill" DROP CONSTRAINT "Skill_playerId_fkey";

-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "skillId" TEXT NOT NULL,
ALTER COLUMN "username" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Skill" ALTER COLUMN "dribble" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Player_skillId_key" ON "Player"("skillId");

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
