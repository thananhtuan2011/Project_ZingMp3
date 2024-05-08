USE [DB_Music]
GO
/****** Object:  Table [dbo].[Acount]    Script Date: 5/8/2024 3:50:51 PM ******/
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
	[role_code] [int] NULL,
	[user_name] [nvarchar](max) NULL,
	[email] [nvarchar](max) NULL,
	[created_at] [datetime] NULL,
	[updated_at] [datetime] NULL,
	[isGoogle] [bit] NULL,
 CONSTRAINT [PK_Acount] PRIMARY KEY CLUSTERED 
(
	[account_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Playlist]    Script Date: 5/8/2024 3:50:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Playlist](
	[account_id] [int] NULL,
	[id_playlist] [int] IDENTITY(1,1) NOT NULL,
	[playlist_name] [nvarchar](500) NOT NULL,
	[created_date] [datetime] NULL,
 CONSTRAINT [PK_Playlist] PRIMARY KEY CLUSTERED 
(
	[id_playlist] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Song]    Script Date: 5/8/2024 3:50:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Song](
	[id_song] [int] IDENTITY(1,1) NOT NULL,
	[singer_name] [nvarchar](max) NULL,
	[song_name] [nvarchar](max) NULL,
	[image] [nvarchar](max) NULL,
	[type_id] [int] NULL,
	[created_at] [datetime] NULL,
	[updated_at] [datetime] NULL,
	[vip] [bit] NULL,
 CONSTRAINT [PK_Tbl_Song] PRIMARY KEY CLUSTERED 
(
	[id_song] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TypeSong]    Script Date: 5/8/2024 3:50:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TypeSong](
	[type_id] [int] IDENTITY(1,1) NOT NULL,
	[typename] [nvarchar](max) NOT NULL,
	[type_description] [nvarchar](max) NULL,
	[created_at] [datetime] NULL,
	[updated_at] [datetime] NULL,
 CONSTRAINT [PK_TypeSong] PRIMARY KEY CLUSTERED 
(
	[type_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Acount] ON 

INSERT [dbo].[Acount] ([account_id], [active], [address], [admin], [avatar], [full_name], [password], [phone], [role_code], [user_name], [email], [created_at], [updated_at], [isGoogle]) VALUES (1, NULL, N'HCM', 1, NULL, N'Thân Anh Tuấn', N'123', N'0962934127', 1, N'tuanta', N'thananhtuan2011@gmail.com', CAST(N'2024-04-24T16:58:24.617' AS DateTime), NULL, NULL)
INSERT [dbo].[Acount] ([account_id], [active], [address], [admin], [avatar], [full_name], [password], [phone], [role_code], [user_name], [email], [created_at], [updated_at], [isGoogle]) VALUES (2, NULL, NULL, NULL, NULL, N'Thân Anh Tuấn', NULL, NULL, NULL, NULL, N'thananhtuan2011@gmail.com', CAST(N'2024-04-24T16:58:24.617' AS DateTime), NULL, 1)
INSERT [dbo].[Acount] ([account_id], [active], [address], [admin], [avatar], [full_name], [password], [phone], [role_code], [user_name], [email], [created_at], [updated_at], [isGoogle]) VALUES (4, NULL, NULL, NULL, NULL, N'an', N'123', NULL, 2, N'an123', NULL, CAST(N'2024-04-24T16:58:24.617' AS DateTime), NULL, 0)
INSERT [dbo].[Acount] ([account_id], [active], [address], [admin], [avatar], [full_name], [password], [phone], [role_code], [user_name], [email], [created_at], [updated_at], [isGoogle]) VALUES (5, NULL, NULL, NULL, NULL, N'test', N'123', NULL, 2, N'test123', NULL, NULL, NULL, 0)
SET IDENTITY_INSERT [dbo].[Acount] OFF
GO
SET IDENTITY_INSERT [dbo].[Playlist] ON 

INSERT [dbo].[Playlist] ([account_id], [id_playlist], [playlist_name], [created_date]) VALUES (2, 1, N'Nhạc buồn', CAST(N'2024-05-08T15:29:01.263' AS DateTime))
SET IDENTITY_INSERT [dbo].[Playlist] OFF
GO
SET IDENTITY_INSERT [dbo].[Song] ON 

INSERT [dbo].[Song] ([id_song], [singer_name], [song_name], [image], [type_id], [created_at], [updated_at], [vip]) VALUES (1, N'Phương Anh', N'Yêu Người  Lạ.mp3', N'hihi.jpg', 16, CAST(N'2024-05-07T15:30:30.523' AS DateTime), NULL, NULL)
INSERT [dbo].[Song] ([id_song], [singer_name], [song_name], [image], [type_id], [created_at], [updated_at], [vip]) VALUES (2, N'Hoài Ân', N'Về nơi đâu.mp3', N'avatar.jpg', 16, CAST(N'2024-05-07T16:09:37.100' AS DateTime), NULL, NULL)
INSERT [dbo].[Song] ([id_song], [singer_name], [song_name], [image], [type_id], [created_at], [updated_at], [vip]) VALUES (1002, N'Hạ', N'Hạ.mp3', N'avatar.jpg', 16, CAST(N'2024-05-08T10:39:08.950' AS DateTime), NULL, 1)
INSERT [dbo].[Song] ([id_song], [singer_name], [song_name], [image], [type_id], [created_at], [updated_at], [vip]) VALUES (1003, N'Minh Hà', N'Vì ai.mp3', N'iconnhac.png', 17, CAST(N'2024-05-08T10:52:19.327' AS DateTime), NULL, 1)
SET IDENTITY_INSERT [dbo].[Song] OFF
GO
SET IDENTITY_INSERT [dbo].[TypeSong] ON 

INSERT [dbo].[TypeSong] ([type_id], [typename], [type_description], [created_at], [updated_at]) VALUES (16, N'Nhạc trẻ', N'dành cho giới trẻ', CAST(N'2024-05-04T15:05:53.007' AS DateTime), NULL)
INSERT [dbo].[TypeSong] ([type_id], [typename], [type_description], [created_at], [updated_at]) VALUES (17, N'Nhạc Âu Mỹ', N'Nhạc phương tây', CAST(N'2024-05-08T10:40:42.727' AS DateTime), NULL)
INSERT [dbo].[TypeSong] ([type_id], [typename], [type_description], [created_at], [updated_at]) VALUES (18, N'Nhạc Hòa Tấu', N'Nhạc không lời ', CAST(N'2024-05-08T10:41:18.530' AS DateTime), NULL)
INSERT [dbo].[TypeSong] ([type_id], [typename], [type_description], [created_at], [updated_at]) VALUES (20, N'test', N'ttt', CAST(N'2024-05-08T10:49:48.920' AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[TypeSong] OFF
GO
