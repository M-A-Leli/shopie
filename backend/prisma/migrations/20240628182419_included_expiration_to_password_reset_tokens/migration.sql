/*
  Warnings:

  - You are about to drop the column `token` on the `PasswordResetToken` table. All the data in the column will be lost.
  - Added the required column `expires_at` to the `PasswordResetToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reset_code` to the `PasswordResetToken` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropIndex
ALTER TABLE [dbo].[PasswordResetToken] DROP CONSTRAINT [PasswordResetToken_token_key];

-- AlterTable
ALTER TABLE [dbo].[PasswordResetToken] DROP COLUMN [token];
ALTER TABLE [dbo].[PasswordResetToken] ADD [expires_at] DATETIME2 NOT NULL,
[is_valid] BIT NOT NULL CONSTRAINT [PasswordResetToken_is_valid_df] DEFAULT 1,
[reset_code] NVARCHAR(1000) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
