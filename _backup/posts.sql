-- dimigo_board.members definition

CREATE TABLE `members` (
  `memberId` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nickname` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`memberId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- dimigo_board.posts definition

CREATE TABLE `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `writeDate` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `authorId` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `viewCount` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `posts_FK` (`authorId`),
  CONSTRAINT `posts_FK` FOREIGN KEY (`authorId`) REFERENCES `members` (`memberId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 사용자 추가
INSERT INTO dimigo_board.members (memberId,password,name,nickname) VALUES
	 ('hyunmui@outlook.kr','qwe12#','선현민','hyunmui'),
	 ('john@dimigo.com','qwe12#','존','john'),
	 ('kevin@dimigo.com','qwe12#','케빈','kevin');

-- 게시글 추가
INSERT INTO dimigo_board.posts (title,content,writeDate,authorId,viewCount) VALUES
	 ('Hello #1','안녕하세요, 제 이름은 Martin 입니다
만나서 반갑습니다 :-)','2022-11-20 19:33:54.000','hyunmui@outlook.kr',1234),
	 ('Hello #2','안녕하세요, 제 이름은 John 입니다
만나서 반갑습니다 :-)','2022-11-20 19:34:08.000','john@dimigo.com',4412),
	 ('Hello #3','안녕하세요, 제 이름은 Kevin 입니다
만나서 반갑습니다 :-)','2022-11-20 19:34:20.000','kevin@dimigo.com',1123);


-- CRUD (Create, Read, Update, Delete)
