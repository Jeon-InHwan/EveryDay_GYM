package com.scit.gym.vo;

import lombok.Data;

@Data
public class WorkoutVO {

	private int workout_num;
	private String workout_type;
	private int workout_kg;
	private int workout_counts;
	private int workout_setvolume;
	private String user_id;
	private String workout_indate;	

}

