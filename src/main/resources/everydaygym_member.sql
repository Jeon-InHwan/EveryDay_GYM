-- 회원 테이블
CREATE TABLE everydaygym_member(
	user_id VARCHAR2(50) PRIMARY KEY
	, user_pwd VARCHAR2(50) NOT NULL
	, user_nm VARCHAR2(50) NOT NULL
	, user_phone VARCHAR2(50) NOT NULL
	, regdate DATE DEFAULT SYSDATE
	, expiredate DATE
	, gender NUMBER DEFAULT 0
	, manager NUMBER DEFAULT 0
);