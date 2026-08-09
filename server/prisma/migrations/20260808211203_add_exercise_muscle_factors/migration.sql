/*
  Warnings:

  - You are about to drop the column `factor` on the `exercises` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "exercises" DROP COLUMN "factor",
ADD COLUMN     "bodyweight_load_factor" DOUBLE PRECISION NOT NULL DEFAULT 0.0;

-- CreateTable
CREATE TABLE "exercise_muscle_factors" (
    "exercise_id" INTEGER NOT NULL,
    "exercise_group_id" INTEGER NOT NULL,
    "factor" DOUBLE PRECISION NOT NULL DEFAULT 0.0,

    CONSTRAINT "exercise_muscle_factors_pkey" PRIMARY KEY ("exercise_id","exercise_group_id")
);

-- CreateIndex
CREATE INDEX "exercise_muscle_factors_exercise_group_id_idx" ON "exercise_muscle_factors"("exercise_group_id");

-- AddForeignKey
ALTER TABLE "exercise_muscle_factors" ADD CONSTRAINT "exercise_muscle_factors_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercise_muscle_factors" ADD CONSTRAINT "exercise_muscle_factors_exercise_group_id_fkey" FOREIGN KEY ("exercise_group_id") REFERENCES "exercise_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
