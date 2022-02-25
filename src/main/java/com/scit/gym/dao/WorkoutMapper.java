package com.scit.gym.dao;

import java.util.ArrayList;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;

import com.scit.gym.vo.WorkoutVO;

public interface WorkoutMapper {

	
	// 운동 기록 INSERT INTO 요청
	public int inputWorkouts(WorkoutVO workout);

	// user_id와 workout_type을 기반으로 오늘의 운동 기록을 요청
	public ArrayList<WorkoutVO> showWorkouts(WorkoutVO workout);

	//　workout_num을 기반으로 오늘의 운동 기록 삭제 요청
	public int deleteWorkouts(WorkoutVO workout);

	//　user_id를 기반으로, 모든 운동 기록을 가져오는 요청
	public ArrayList<WorkoutVO> getAllWorkouts(Map<String, Object> search, RowBounds rb);

	// paging 처리를 하기 위해 한 유저의 전체 운동기록 수를 DB에서 조회해오기
	public int selectTotalWorkoutCount(Map<String, Object> search);
	


}
