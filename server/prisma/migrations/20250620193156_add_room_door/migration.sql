-- CreateTable
CREATE TABLE "RoomDoor" (
    "id" SERIAL NOT NULL,
    "fromRoomId" INTEGER NOT NULL,
    "toRoomId" INTEGER NOT NULL,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,

    CONSTRAINT "RoomDoor_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RoomDoor" ADD CONSTRAINT "RoomDoor_fromRoomId_fkey" FOREIGN KEY ("fromRoomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomDoor" ADD CONSTRAINT "RoomDoor_toRoomId_fkey" FOREIGN KEY ("toRoomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
