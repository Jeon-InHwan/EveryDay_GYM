package com.scit.gym.dao;

import java.util.ArrayList;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.scit.gym.vo.WorkoutVO;


@Repository
public class WorkoutDAO {

	@Autowired
	private SqlSession session;

	
	// 운동 기록 INSERT INTO 요청
	public int inputWorkouts(WorkoutVO workout) {
		
		int result = 0;
		 
		try {
			 WorkoutMapper mapper = session.getMapper(WorkoutMapper.class);
			 result = mapper.inputWorkouts(workout);
			} catch(Exception e) {
			 e.printStackTrace();
			}
			return result;
	}
	

	
	// user_id와 workout_type을 기반으로 오늘의 운동 기록을 요청
	public ArrayList<WorkoutVO> showWorkouts(WorkoutVO workout) {
		
		ArrayList<WorkoutVO> list = null;
		
		try {
			 WorkoutMapper mapper = session.getMapper(WorkoutMapper.class);
			 list = mapper.showWorkouts(workout);
			} catch(Exception e) {
			 e.printStackTrace();
			}
			return list;
	}



	//　workout_num을 기반으로 오늘의 운동 기록 삭제 요청
	public int deleteWorkouts(WorkoutVO workout) {

		int result = 0;
		 
		try {
			 WorkoutMapper mapper = session.getMapper(WorkoutMapper.class);
			 result = mapper.deleteWorkouts(workout);
			} catch(Exception e) {
			 e.printStackTrace();
			}
			return result;
	}



	//　user_id를 기반으로, 모든 운동 기록을 가져오는 요청
	public ArrayList<WorkoutVO> getAllWorkouts(Map<String, Object> search, int startRecord, int countPerPage) {

		ArrayList<WorkoutVO> list = null;
		
		try {
			 WorkoutMapper mapper = session.getMapper(WorkoutMapper.class);
			 RowBounds rb = new RowBounds(startRecord, countPerPage);
			 list = mapper.getAllWorkouts(search, rb);
			} catch(Exception e) {
			 e.printStackTrace();
			}
			return list;
	}


	
	// paging 처리를 하기 위해 한 유저의 전체 운동기록 수를 DB에서 조회해오기
	public int selectTotalWorkoutCount(Map<String, Object> search) {
		int result = 0;
		 
		try {
			WorkoutMapper mapper = session.getMapper(WorkoutMapper.class);
			 result = mapper.selectTotalWorkoutCount(search);
			} catch(Exception e) {
			 e.printStackTrace();
		}
			return result;
	}


	

	
	
}
