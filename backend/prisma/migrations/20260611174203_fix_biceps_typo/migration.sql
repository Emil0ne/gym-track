/*
  Warnings:

  - You are about to drop the column `bicep` on the `BodyMetricLog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BodyMetricLog" DROP COLUMN "bicep",
ADD COLUMN     "biceps" DOUBLE PRECISION;
