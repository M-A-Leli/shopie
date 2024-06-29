/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Reviews` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[CartItems] ADD [is_deleted] BIT NOT NULL CONSTRAINT [CartItems_is_deleted_df] DEFAULT 0;

-- AlterTable
ALTER TABLE [dbo].[Reviews] DROP COLUMN [updatedAt];
ALTER TABLE [dbo].[Reviews] ADD [is_deleted] BIT NOT NULL CONSTRAINT [Reviews_is_deleted_df] DEFAULT 0;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
