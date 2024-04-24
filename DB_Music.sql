USE [DB_Music]
GO
/****** Object:  Table [dbo].[Acount]    Script Date: 4/19/2024 2:01:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Acount](
	[account_id] [int] IDENTITY(1,1) NOT NULL,
	[active] [bit] NULL,
	[address] [nvarchar](max) NULL,
	[admin] [bit] NULL,
	[avatar] [nvarchar](max) NULL,
	[full_name] [nvarchar](max) NULL,
	[password] [nvarchar](max) NULL,
	[phone] [nvarchar](max) NULL,
	[role_code] [nvarchar](max) NULL,
	[user_name] [nvarchar](max) NULL,
	[email] [nvarchar](max) NULL,
	[created_at] [datetime] NULL,
	[updated_at] [datetime] NULL,
	[deleted_at] [datetime] NULL,
	[isGoogle] [bit] NULL,
 CONSTRAINT [PK_Acount] PRIMARY KEY CLUSTERED 
(
	[account_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Acount] ON 

INSERT [dbo].[Acount] ([account_id], [active], [address], [admin], [avatar], [full_name], [password], [phone], [role_code], [user_name], [email], [created_at], [updated_at], [deleted_at], [isGoogle]) VALUES (1, NULL, N'HCM', 1, NULL, N'Thân Anh Tuấn', N'123', N'0962934127', N'1', N'tuanta', N'thananhtuan2011@gmail.com', NULL, NULL, NULL, NULL)
INSERT [dbo].[Acount] ([account_id], [active], [address], [admin], [avatar], [full_name], [password], [phone], [role_code], [user_name], [email], [created_at], [updated_at], [deleted_at], [isGoogle]) VALUES (2, NULL, NULL, NULL, NULL, N'Thân Anh Tuấn', NULL, NULL, NULL, NULL, N'thananhtuan2011@gmail.com', NULL, NULL, NULL, 1)
INSERT [dbo].[Acount] ([account_id], [active], [address], [admin], [avatar], [full_name], [password], [phone], [role_code], [user_name], [email], [created_at], [updated_at], [deleted_at], [isGoogle]) VALUES (4, NULL, NULL, NULL, NULL, N'an', N'123', NULL, N'2', N'an123', NULL, NULL, NULL, NULL, 0)
INSERT [dbo].[Acount] ([account_id], [active], [address], [admin], [avatar], [full_name], [password], [phone], [role_code], [user_name], [email], [created_at], [updated_at], [deleted_at], [isGoogle]) VALUES (5, NULL, NULL, NULL, NULL, N'test', N'123', NULL, N'2', N'test123', NULL, NULL, NULL, NULL, 0)
SET IDENTITY_INSERT [dbo].[Acount] OFF
GO


CREATE TABLE [dbo].[TypeSong] (
    [type_id] [int] IDENTITY(1,1) NOT NULL,
    typename VARCHAR(255) NOT NULL,
    type_description TEXT,
	[created_at] [datetime] NULL,
	[updated_at] [datetime] NULL,
	[deleted_at] [datetime] NULL,
 CONSTRAINT [PK_TypeSong] PRIMARY KEY CLUSTERED 
(
	[type_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[TypeSong] ON 

INSERT INTO TypeSong (type_id, typename, type_description, created_at, updated_at, deleted_at) VALUES 
(1, 'Pop', 'Thể loại âm nhạc phổ biến với âm nhạc nổi tiếng trên toàn thế giới.', GETDATE(), GETDATE(), NULL),
(2, 'Rock', 'Thể loại âm nhạc nổi tiếng với nhịp điệu mạnh mẽ và giai điệu sôi động.', GETDATE(), GETDATE(), NULL),
(3, 'Hip hop', 'Thể loại âm nhạc phát triển từ cộng đồng người Mỹ gốc Phi và nổi tiếng với phong cách rap và beatbox.', GETDATE(), GETDATE(), NULL);

SET IDENTITY_INSERT [dbo].[TypeSong] OFF
