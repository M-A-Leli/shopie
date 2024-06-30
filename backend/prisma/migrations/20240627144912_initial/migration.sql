BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Users] (
    [id] NVARCHAR(1000) NOT NULL,
    [username] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [phone_number] NVARCHAR(1000),
    [is_deleted] BIT NOT NULL CONSTRAINT [Users_is_deleted_df] DEFAULT 0,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [Users_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    CONSTRAINT [Users_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Users_username_key] UNIQUE NONCLUSTERED ([username]),
    CONSTRAINT [Users_email_key] UNIQUE NONCLUSTERED ([email]),
    CONSTRAINT [Users_phone_number_key] UNIQUE NONCLUSTERED ([phone_number])
);

-- CreateTable
CREATE TABLE [dbo].[Admins] (
    [id] NVARCHAR(1000) NOT NULL,
    [user_id] NVARCHAR(1000) NOT NULL,
    [is_deleted] BIT NOT NULL CONSTRAINT [Admins_is_deleted_df] DEFAULT 0,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [Admins_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    CONSTRAINT [Admins_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Admins_user_id_key] UNIQUE NONCLUSTERED ([user_id])
);

-- CreateTable
CREATE TABLE [dbo].[Products] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000) NOT NULL,
    [price] DECIMAL(32,16) NOT NULL,
    [stock_quantity] INT NOT NULL,
    [category_id] NVARCHAR(1000) NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [Products_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    [is_deleted] BIT NOT NULL CONSTRAINT [Products_is_deleted_df] DEFAULT 0,
    CONSTRAINT [Products_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[ProductImages] (
    [id] NVARCHAR(1000) NOT NULL,
    [url] NVARCHAR(1000) NOT NULL,
    [product_id] NVARCHAR(1000) NOT NULL,
    [is_deleted] BIT NOT NULL CONSTRAINT [ProductImages_is_deleted_df] DEFAULT 0,
    CONSTRAINT [ProductImages_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Categories] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [image_url] NVARCHAR(1000) NOT NULL,
    [is_deleted] BIT NOT NULL CONSTRAINT [Categories_is_deleted_df] DEFAULT 0,
    CONSTRAINT [Categories_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Carts] (
    [id] NVARCHAR(1000) NOT NULL,
    [user_id] NVARCHAR(1000) NOT NULL,
    [is_deleted] BIT NOT NULL CONSTRAINT [Carts_is_deleted_df] DEFAULT 0,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [Carts_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    CONSTRAINT [Carts_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[CartItems] (
    [id] NVARCHAR(1000) NOT NULL,
    [quantity] INT NOT NULL,
    [product_id] NVARCHAR(1000) NOT NULL,
    [cart_id] NVARCHAR(1000) NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [CartItems_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    CONSTRAINT [CartItems_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Reviews] (
    [id] NVARCHAR(1000) NOT NULL,
    [rating] FLOAT(53) NOT NULL,
    [comment] NVARCHAR(1000) NOT NULL,
    [user_id] NVARCHAR(1000) NOT NULL,
    [product_id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Reviews_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Reviews_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[PasswordResetToken] (
    [id] NVARCHAR(1000) NOT NULL,
    [token] NVARCHAR(1000) NOT NULL,
    [user_id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [PasswordResetToken_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [expiresAt] DATETIME2 NOT NULL,
    CONSTRAINT [PasswordResetToken_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [PasswordResetToken_token_key] UNIQUE NONCLUSTERED ([token])
);

-- AddForeignKey
ALTER TABLE [dbo].[Admins] ADD CONSTRAINT [Admins_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[Users]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Products] ADD CONSTRAINT [Products_category_id_fkey] FOREIGN KEY ([category_id]) REFERENCES [dbo].[Categories]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ProductImages] ADD CONSTRAINT [ProductImages_product_id_fkey] FOREIGN KEY ([product_id]) REFERENCES [dbo].[Products]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Carts] ADD CONSTRAINT [Carts_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[Users]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[CartItems] ADD CONSTRAINT [CartItems_product_id_fkey] FOREIGN KEY ([product_id]) REFERENCES [dbo].[Products]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[CartItems] ADD CONSTRAINT [CartItems_cart_id_fkey] FOREIGN KEY ([cart_id]) REFERENCES [dbo].[Carts]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Reviews] ADD CONSTRAINT [Reviews_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[Users]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Reviews] ADD CONSTRAINT [Reviews_product_id_fkey] FOREIGN KEY ([product_id]) REFERENCES [dbo].[Products]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PasswordResetToken] ADD CONSTRAINT [PasswordResetToken_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[Users]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
