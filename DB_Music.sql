USE [DB_Music]
GO
/****** Object:  Table [dbo].[Acount]    Script Date: 5/27/2024 7:40:36 PM ******/
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
	[vip] [bit] NULL,
	[date_vip_start] [datetime] NULL,
	[date_vip_end] [datetime] NULL,
 CONSTRAINT [PK_Acount] PRIMARY KEY CLUSTERED 
(
	[account_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Like_Song]    Script Date: 5/27/2024 7:40:36 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Like_Song](
	[id_song] [int] NULL,
	[acount_id] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Playlist]    Script Date: 5/27/2024 7:40:36 PM ******/
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
/****** Object:  Table [dbo].[PlayList_Song]    Script Date: 5/27/2024 7:40:36 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PlayList_Song](
	[id_song] [int] NULL,
	[created_date] [datetime] NULL,
	[id_playlist] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Radio]    Script Date: 5/27/2024 7:40:36 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Radio](
	[id_radio] [int] IDENTITY(1,1) NOT NULL,
	[cast_name] [nvarchar](max) NULL,
	[created_date] [datetime] NULL,
	[updated_date] [datetime] NULL,
	[radio_name] [nvarchar](max) NULL,
 CONSTRAINT [PK_Radio] PRIMARY KEY CLUSTERED 
(
	[id_radio] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Song]    Script Date: 5/27/2024 7:40:36 PM ******/
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
	[count_play] [bigint] NULL,
	[lyrics] [nvarchar](max) NULL,
 CONSTRAINT [PK_Tbl_Song] PRIMARY KEY CLUSTERED 
(
	[id_song] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TypeSong]    Script Date: 5/27/2024 7:40:36 PM ******/
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
	[img] [nvarchar](max) NULL,
 CONSTRAINT [PK_TypeSong] PRIMARY KEY CLUSTERED 
(
	[type_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Acount] ON 

INSERT [dbo].[Acount] ([account_id], [active], [address], [admin], [avatar], [full_name], [password], [phone], [role_code], [user_name], [email], [created_at], [updated_at], [isGoogle], [vip], [date_vip_start], [date_vip_end]) VALUES (1, NULL, N'HCM', 1, NULL, N'Thân Anh Tuấn', N'123', N'0962934127', 1, N'tuanta', N'thananhtuan2011@gmail.com', CAST(N'2024-04-24T16:58:24.617' AS DateTime), NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Acount] ([account_id], [active], [address], [admin], [avatar], [full_name], [password], [phone], [role_code], [user_name], [email], [created_at], [updated_at], [isGoogle], [vip], [date_vip_start], [date_vip_end]) VALUES (2, NULL, NULL, NULL, NULL, N'Thân Anh Tuấn', NULL, NULL, NULL, NULL, N'thananhtuan2011@gmail.com', CAST(N'2024-04-24T16:58:24.617' AS DateTime), NULL, 1, 1, NULL, NULL)
INSERT [dbo].[Acount] ([account_id], [active], [address], [admin], [avatar], [full_name], [password], [phone], [role_code], [user_name], [email], [created_at], [updated_at], [isGoogle], [vip], [date_vip_start], [date_vip_end]) VALUES (4, NULL, NULL, NULL, NULL, N'an', N'123', NULL, 2, N'an123', NULL, CAST(N'2024-04-24T16:58:24.617' AS DateTime), NULL, 0, NULL, NULL, NULL)
INSERT [dbo].[Acount] ([account_id], [active], [address], [admin], [avatar], [full_name], [password], [phone], [role_code], [user_name], [email], [created_at], [updated_at], [isGoogle], [vip], [date_vip_start], [date_vip_end]) VALUES (5, NULL, NULL, NULL, NULL, N'test', N'123', NULL, 2, N'test123', NULL, NULL, NULL, 0, NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[Acount] OFF
GO
INSERT [dbo].[Like_Song] ([id_song], [acount_id]) VALUES (2, 4)
INSERT [dbo].[Like_Song] ([id_song], [acount_id]) VALUES (1003, 2)
GO
SET IDENTITY_INSERT [dbo].[Playlist] ON 

INSERT [dbo].[Playlist] ([account_id], [id_playlist], [playlist_name], [created_date]) VALUES (2, 1, N'Nhạc buồn', CAST(N'2024-05-08T15:29:01.263' AS DateTime))
SET IDENTITY_INSERT [dbo].[Playlist] OFF
GO
INSERT [dbo].[PlayList_Song] ([id_song], [created_date], [id_playlist]) VALUES (1003, NULL, 1)
GO
SET IDENTITY_INSERT [dbo].[Radio] ON 

INSERT [dbo].[Radio] ([id_radio], [cast_name], [created_date], [updated_date], [radio_name]) VALUES (1, N'Đi về đâu', CAST(N'2024-05-26T17:31:35.023' AS DateTime), NULL, N'hh.mp4')
SET IDENTITY_INSERT [dbo].[Radio] OFF
GO
SET IDENTITY_INSERT [dbo].[Song] ON 

INSERT [dbo].[Song] ([id_song], [singer_name], [song_name], [image], [type_id], [created_at], [updated_at], [vip], [count_play], [lyrics]) VALUES (1, N'Phương Anh', N'Yêu Người  Lạ.mp3', N'hihi.jpg', 16, CAST(N'2024-05-07T15:30:30.523' AS DateTime), NULL, NULL, 3, NULL)
INSERT [dbo].[Song] ([id_song], [singer_name], [song_name], [image], [type_id], [created_at], [updated_at], [vip], [count_play], [lyrics]) VALUES (2, N'Hoài Ân', N'Về nơi đâu.mp3', N'avatar.jpg', 16, CAST(N'2024-05-07T16:09:37.100' AS DateTime), NULL, NULL, 1, NULL)
INSERT [dbo].[Song] ([id_song], [singer_name], [song_name], [image], [type_id], [created_at], [updated_at], [vip], [count_play], [lyrics]) VALUES (1002, N'Hạ', N'Hạ.mp3', N'avatar.jpg', 16, CAST(N'2024-05-08T10:39:08.950' AS DateTime), NULL, 1, NULL, NULL)
INSERT [dbo].[Song] ([id_song], [singer_name], [song_name], [image], [type_id], [created_at], [updated_at], [vip], [count_play], [lyrics]) VALUES (1003, N'Minh Hà ', N'Vì ai.mp3', N'playlist3.jpg', 17, CAST(N'2024-05-17T16:31:48.820' AS DateTime), CAST(N'2024-05-17T16:31:48.820' AS DateTime), 1, 3, N'Vì đời còn lắm sóng gió
Sao em không ngồi lại cùng chút bình minh
Tạm bỏ lại gánh trên vai
Theo anh đi tìm lại một phút yên bình

Ngày rồi ngày vẫn những khó khăn
Em vẫn xoay vần cùng những nốt thăng trầm
Nhưng cứ vui lên em
Vì ngày mai lại một cơ hội để ôm trọn thế giới

Chorus
Và…
Cứ tan vào những êm đềm tối nay
Cứ tan trong màn đêm này đắm say
Cứ chôn vùi lắng lo vào sáng mai
Chút yên bình chắc đâu cần đúng sai

Verse 2
Chẳng cần bận tâm hay nghĩ suy
Bao âu lo em bỏ lại hết đằng sau
Đời là cuộc vui đôi khi
Cho em quên điều gì còn giữ trong đầu

Vài lần người ta cho em cười
Cho em say cũng cho em khóc vì đau
Nhưng cứ vui lên đi
Vì ngày mai lại một cơ hội và ta ngại ngần chi

Chorus
Này...
Cứ tan vào những êm đềm tối nay
Cứ tan trong màn đêm này đắm say
Cứ chôn vùi lắng lo vào sáng mai
Chút yên bình chắc đâu cần đúng sai

Yeah…
Người ta bỏ chạy khi thấy đám mây đen
Em giang tay ra chờ gió bay đến
Người sợ hãi khi niềm tin lay chuyển
Em gọi đấy là cơ hội để thái độ được thay tên

Biết đâu mai đến ánh nắng sẽ vỡ òa
Và những ấm áp quanh ta mới bắt đầu lan tỏa
Những bài hát tình yêu mở đường cho tiếng cười giòn giã
Những ánh nhìn mà trước giờ mình lơ đễnh lướt qua

Rồi sẽ nhận ra quanh ta những thầm thì
Những niềm vui âm ỉ, mắt nhắm và nhâm nhi
Những khoảnh khắc thần kỳ, khi mình sống chậm đi
Tìm ra con người mới khiến cho đời mình đậm vị

Chill như ta và Chillies chill bên Linh nâng ly cụng ly (cheers cheers)
Cứ chi li làm chi vì đôi khi đến lý trí cũng cần thi vị
Vậy nên...

Chorus
Cứ tan vào những êm đềm tối nay (Cho tình yêu được truyền từ tay qua tay)
Cứ tan trong màn đêm này đắm say (Cho tiếng cười được ngập tràn nơi đây)
Cứ chôn vùi lắng lo vào sáng mai (It’s gonna be alright)
Chút yên bình chắc đâu cần đúng sai (Let’s chill everybody!)

Cứ tan vào những êm đềm tối nay (It’s gonna be alright)
Cứ tan trong màn đêm này đắm say (It’s gonna be alright)
Cứ chôn vùi lắng lo vào sáng mai (It’s gonna be alright)
Chút yên bình chắc đâu cần đúng sai')
SET IDENTITY_INSERT [dbo].[Song] OFF
GO
SET IDENTITY_INSERT [dbo].[TypeSong] ON 

INSERT [dbo].[TypeSong] ([type_id], [typename], [type_description], [created_at], [updated_at], [img]) VALUES (16, N'Nhạc trẻ', N'Hương Tràm,Jack', CAST(N'2024-05-04T15:05:53.007' AS DateTime), CAST(N'2024-05-15T14:06:09.870' AS DateTime), N'playlist4.jpg')
INSERT [dbo].[TypeSong] ([type_id], [typename], [type_description], [created_at], [updated_at], [img]) VALUES (17, N'HIT-MAKER: Nổi Bật', N'LyLy, RIN9, Vương Anh Tú', CAST(N'2024-05-08T10:40:42.727' AS DateTime), CAST(N'2024-05-15T14:21:41.990' AS DateTime), N'playlist5.jpg')
INSERT [dbo].[TypeSong] ([type_id], [typename], [type_description], [created_at], [updated_at], [img]) VALUES (20, N'Mở Đầu Hoàn Hảo', N'AMEE, ERIK, Hoàng Duyên', CAST(N'2024-05-08T10:49:48.920' AS DateTime), CAST(N'2024-05-15T14:21:21.657' AS DateTime), N'playlist1.jpg')
INSERT [dbo].[TypeSong] ([type_id], [typename], [type_description], [created_at], [updated_at], [img]) VALUES (21, N'Tỏ Tình Nhẹ Nhàng Thôi ', N'Quân A.P, Changg, Hoàng Duyên', CAST(N'2024-05-11T10:04:24.143' AS DateTime), CAST(N'2024-05-15T14:33:15.033' AS DateTime), N'playlist3.jpg')
INSERT [dbo].[TypeSong] ([type_id], [typename], [type_description], [created_at], [updated_at], [img]) VALUES (1022, N'V-Pop: The A-List', N'Bích Phương, Hoàng Thùy Linh', CAST(N'2024-05-15T14:20:02.087' AS DateTime), CAST(N'2024-05-15T14:33:24.763' AS DateTime), N'playlist2.jpg')
SET IDENTITY_INSERT [dbo].[TypeSong] OFF
GO
