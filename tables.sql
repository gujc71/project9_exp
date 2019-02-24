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


delete from com_user;

INSERT INTO `com_user` (`USERNO`, `USERID`, `USERNM`, `USERPW`, `USERROLE`, `PHOTO`, `DELETEFLAG`) VALUES
	(1, 'admin', 'admin', SHA2('admin', 256), 'A', NULL, 'N'),
	(2, 'user1', 'Lee SunSin', SHA2('user1', 256), 'U', NULL, 'N'),
	(3, 'user2', 'So SiNo', SHA2('user2', 256), 'U', NULL, 'N');
