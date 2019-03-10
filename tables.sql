CREATE TABLE COM_USER(
  USERNO 	INT(11) NOT NULL AUTO_INCREMENT COMMENT '사용자 번호',
  USERID 	VARCHAR(20)						COMMENT 'ID',
  USERNM 	VARCHAR(20)						COMMENT '사용자 이름',   -- or 가게이름
  USERPW 	VARCHAR(100)					COMMENT '비밀번호',
  USERROLE	CHAR(1)							COMMENT '권한',
  PHOTO 	VARCHAR(50)						COMMENT '사진',
  ENTRYDATE DATETIME						COMMENT '작성일자',
  DELETEFLAG CHAR(1)						COMMENT '삭제 여부',
  PRIMARY KEY (USERNO)
) ;

/*------------------------------------------*/

-- DROP TABLE TBL_BOARD;

CREATE TABLE TBL_BOARD (
  BRDNO INT(11) NOT NULL AUTO_INCREMENT		COMMENT '글 번호',
  BRDTITLE VARCHAR(255)						        COMMENT '글 제목',
  USERNO 	INT								              COMMENT '작성자',
  BRDMEMO   MEDIUMTEXT						        COMMENT '글 내용',
  BRDDATE   DATETIME						          COMMENT '작성일자',
  BRDDELETEFLAG CHAR(1)						        COMMENT '삭제 여부',
  PRIMARY KEY (BRDNO)
) ;

/*------------------------------------------*/


delete from com_user;

INSERT INTO `com_user` (`USERNO`, `USERID`, `USERNM`, `USERPW`, `USERROLE`, `PHOTO`, `ENTRYDATE`, `DELETEFLAG`) VALUES
	(1, 'admin', 'admin', SHA2('admin', 256), 'A', NULL, now(), 'N'),
	(2, 'user1', 'Lee SunSin', SHA2('user1', 256), 'U', NULL, now(), 'N'),
	(3, 'user2', 'So SiNo', SHA2('user2', 256), 'U', NULL, now(), 'N');
