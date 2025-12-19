-- CreateTable
CREATE TABLE "UserResume" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "resumeId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "userEmail" TEXT,
    "userName" TEXT,
    "themeColor" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "jobTitle" TEXT,
    "address" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "summary" TEXT,
    "experience" TEXT,
    "education" TEXT,
    "skills" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UserResume_resumeId_key" ON "UserResume"("resumeId");
