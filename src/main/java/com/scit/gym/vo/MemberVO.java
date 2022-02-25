package com.scit.gym.vo;

import lombok.Data;

@Data
public class MemberVO {

	
	private String user_id;
	private String user_pwd;
	private String user_nm;
	private String user_phone;
	private String regdate;
	private String expiredate;
	private int gender;
	private int manager;
	
	
}
