CREATE TABLE COM_USER(
  USERNO 	INT(11) NOT NULL AUTO_INCREMENT,	-- 사용자 번호
  USERID 	VARCHAR(20),                    	-- ID
  USERNM 	VARCHAR(20),                    	-- 이름
  USERPW 	VARCHAR(100),                    	-- 비밀번호
  USERROLE	CHAR(1),                    		-- 권한
  PHOTO 	VARCHAR(50),                   		-- 사진
  DELETEFLAG CHAR(1),    	                 	-- 삭제 여부
  PRIMARY KEY (USERNO)
) ;

/*------------------------------------------*/

-- DROP TABLE TBL_BOARD;

CREATE TABLE TBL_BOARD (
  BRDNO INT(11) NOT NULL AUTO_INCREMENT,    -- 글 번호
  BRDTITLE VARCHAR(255),                    -- 글 제목
  USERNO 	INT,                    		-- 작성자
  BRDMEMO   MEDIUMTEXT,		                -- 글 내용
  BRDDATE   DATETIME,                       -- 작성일자
  BRDDELETEFLAG CHAR(1),                    -- 삭제 여부
  PRIMARY KEY (BRDNO)
) ;

/*------------------------------------------*/



INSERT INTO `com_user` (`USERNO`, `USERID`, `USERNM`, `USERPW`, `USERROLE`, `PHOTO`, `DELETEFLAG`) VALUES
	(1, 'admin', 'admin', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', 'A', NULL, 'N'),
	(2, 'user1', 'Lee SunSin', '0a041b9462caa4a31bac3567e0b6e6fd9100787db2ab433d96f6d178cabfce90', 'U', NULL, 'N'),
	(3, 'user2', 'So SiNo', '6025d18fe48abd45168528f18a82e265dd98d421a7084aa09f61b341703901a3', 'U', NULL, 'N');
