-- CreateTable
CREATE TABLE "Schedule" (
    "id" TEXT NOT NULL,
    "professionalId" TEXT NOT NULL,
    "dayOfWeek" INTEGER NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Schedule_professionalId_dayOfWeek_startTime_endTime_key" ON "Schedule"("professionalId", "dayOfWeek", "startTime", "endTime");

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
