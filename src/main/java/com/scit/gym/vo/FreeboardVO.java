package com.scit.gym.vo;

import lombok.Data;

@Data
public class FreeboardVO {

	private int freeboard_num;
	private String freeboard_title;
	private String freeboard_context;
	private int freeboard_hits;
	private String user_id;
	private String freeboard_savedfile;
	private String freeboard_originalfile;
	private String freeboard_indate;
	private int manager;
	
}
