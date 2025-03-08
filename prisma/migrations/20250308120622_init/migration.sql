-- CreateTable
CREATE TABLE "Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "tipo" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Plantao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "medicoId" INTEGER NOT NULL,
    "data" DATETIME NOT NULL,
    "duracao" INTEGER NOT NULL,
    "setor" TEXT NOT NULL,
    CONSTRAINT "Plantao_medicoId_fkey" FOREIGN KEY ("medicoId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
