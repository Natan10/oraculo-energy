-- CreateTable
CREATE TABLE "informations" (
    "id" TEXT NOT NULL,
    "clientNumber" TEXT,
    "installNumber" TEXT,
    "month" TEXT,
    "year" TEXT,
    "electricityConsumption" INTEGER NOT NULL,
    "totalValueWithoutGD" INTEGER NOT NULL,
    "economyGD" INTEGER NOT NULL,
    "compensatedEnergy" INTEGER NOT NULL,
    "electricityValue" INTEGER,
    "electricityQuantity" INTEGER,
    "electricityICMSValue" INTEGER,
    "electricityICMSQuantity" INTEGER,
    "publicContrib" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "informations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "informations_clientNumber_key" ON "informations"("clientNumber");
