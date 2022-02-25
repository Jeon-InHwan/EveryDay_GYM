package com.scit.gym.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.scit.gym.dao.WorkoutDAO;
import com.scit.gym.vo.WorkoutVO;

@Service
public class WorkoutService {

	
	
	@Autowired
	private WorkoutDAO dao;
	
	@Autowired
	private HttpSession session;
	
	
	// 운동 기록 INSERT INTO 요청
	public int inputWorkouts(WorkoutVO workout) {
		
		int result = 0;
		
		result = dao.inputWorkouts(workout);
		
		return result;
	}


	// user_id와 workout_type을 기반으로 오늘의 운동 기록을 요청
	public ArrayList<WorkoutVO> showWorkouts(WorkoutVO workout) {
		
		ArrayList<WorkoutVO> list = null;
		
		list = dao.showWorkouts(workout);
		
		return list;
	}


	
	//　workout_num을 기반으로 오늘의 운동 기록 삭제 요청
	public int deleteWorkouts(WorkoutVO workout) {
	
		String user_id = (String)session.getAttribute("loginId");
		workout.setUser_id(user_id);
			
		int result = 0;
		
		result = dao.deleteWorkouts(workout);
		
		return result;
	}


	//　user_id를 기반으로, 모든 운동 기록을 가져오는 요청
	public ArrayList<WorkoutVO> getAllWorkouts(String user_id, String workout_type, String workout_indate, int startRecord, int countPerPage) {

		ArrayList<WorkoutVO> list = null;
		
		Map<String, Object> search = new HashMap<String, Object>();
		search.put("user_id", user_id);
		search.put("workout_type", workout_type);
		search.put("workout_indate", workout_indate);
		
		list = dao.getAllWorkouts(search, startRecord, countPerPage);
		
		return list;
	}


	// paging 처리를 하기 위해 한 유저의 전체 운동기록 수를 DB에서 조회해오기
	public int selectTotalWorkoutCount(String user_id, String workout_type, String workout_indate) {
		
		Map<String, Object> search = new HashMap<String, Object>();
		search.put("user_id", user_id);
		search.put("workout_type", workout_type);
		search.put("workout_indate", workout_indate);
		
		int result = 0;
		result = dao.selectTotalWorkoutCount(search);
		
		return result;
	}


	
	
	

}
