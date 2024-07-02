/*
  Warnings:

  - You are about to drop the column `cart_id` on the `CartItems` table. All the data in the column will be lost.
  - You are about to drop the `Carts` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `order_id` to the `CartItems` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[CartItems] DROP CONSTRAINT [CartItems_cart_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Carts] DROP CONSTRAINT [Carts_user_id_fkey];

-- AlterTable
ALTER TABLE [dbo].[CartItems] DROP COLUMN [cart_id];
ALTER TABLE [dbo].[CartItems] ADD [order_id] NVARCHAR(1000) NOT NULL;

-- DropTable
DROP TABLE [dbo].[Carts];

-- CreateTable
CREATE TABLE [dbo].[Orders] (
    [id] NVARCHAR(1000) NOT NULL,
    [user_id] NVARCHAR(1000) NOT NULL,
    [status] NVARCHAR(1000) NOT NULL CONSTRAINT [Orders_status_df] DEFAULT 'PENDING',
    [is_deleted] BIT NOT NULL CONSTRAINT [Orders_is_deleted_df] DEFAULT 0,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [Orders_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    CONSTRAINT [Orders_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Orders] ADD CONSTRAINT [Orders_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[Users]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[CartItems] ADD CONSTRAINT [CartItems_order_id_fkey] FOREIGN KEY ([order_id]) REFERENCES [dbo].[Orders]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
