/*
  Warnings:

  - You are about to drop the column `cloudinary_id` on the `File` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[filepath]` on the table `File` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "File" DROP COLUMN "cloudinary_id";

-- CreateIndex
CREATE UNIQUE INDEX "File_filepath_key" ON "File"("filepath");
