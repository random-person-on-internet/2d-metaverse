/*
  Warnings:

  - Added the required column `x` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `xlen` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `y` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ylen` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "x" INTEGER NOT NULL,
ADD COLUMN     "xlen" INTEGER NOT NULL,
ADD COLUMN     "y" INTEGER NOT NULL,
ADD COLUMN     "ylen" INTEGER NOT NULL;
