package com.scit.gym.controllers;

import java.util.ArrayList;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.scit.gym.service.WorkoutService;
import com.scit.gym.util.PageNavigator;
import com.scit.gym.vo.WorkoutVO;

@Controller
public class WorkoutController {
	
	
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	
	@Autowired
	private WorkoutService service;
	
	private final int countPerPage = 10;
	private final int pagePerGroup = 5;
	
	
	// workoutHome.jsp로 이동
	@RequestMapping(value = "/workout/workoutRecordingHome", method = RequestMethod.GET)
	public String workoutHome() {

		return "workout/workoutRecordingHome";
		
	}
	
	
	// workoutHome.jsp로 이동 + user_id를 기반으로, 모든 운동 기록을 가져오는 요청
	@RequestMapping(value = "/workout/showWorkoutRecording", method = RequestMethod.GET)
	public String showWorkoutRecording(Model model, String user_id,
			@RequestParam(name = "page", defaultValue = "1") int page,
			@RequestParam(value = "workout_type", defaultValue = "") String workout_type,
			@RequestParam(value = "workout_indate", defaultValue = "") String workout_indate) {
		
		ArrayList<WorkoutVO> list = null;
		
		// paging 처리를 하기 위해 한 유저의 전체 운동기록 수를 DB에서 조회해오기 (검색한 경우도 고려해야함)
		int totalCount = service.selectTotalWorkoutCount(user_id, workout_type, workout_indate);
		
		
		// paging 처리를 위한 객체 생성
		PageNavigator navi = new PageNavigator(countPerPage, pagePerGroup, page, totalCount);
		
		list = service.getAllWorkouts(user_id, workout_type, workout_indate, navi.getStartRecord(), navi.getCountPerPage());
		
		model.addAttribute("list", list);
		model.addAttribute("navi", navi);
		model.addAttribute("workout_type", workout_type);
		model.addAttribute("workout_indate", workout_indate);	
		
		return "/workout/showWorkoutRecording";
		
	}
	
	
	// 운동 기록 INSERT INTO 요청
	@ResponseBody
	@RequestMapping(value = "/workout/inputWorkouts", method = RequestMethod.POST)
	public int inputWorkouts(WorkoutVO workout) {
		
		return service.inputWorkouts(workout);
	}
	
	
	// user_id와 workout_type을 기반으로 오늘의 운동 기록을 요청
	@ResponseBody
	@RequestMapping(value = "/workout/showWorkouts", method = RequestMethod.POST)
	public ArrayList<WorkoutVO> showWorkouts(WorkoutVO workout) {
		
		return service.showWorkouts(workout);
		
	}
	
	
	//　workout_num을 기반으로 오늘의 운동 기록 삭제 요청
	@ResponseBody
	@RequestMapping(value = "/workout/deleteWorkouts", method = RequestMethod.POST)
	public int deleteWorkouts(WorkoutVO workout) {
		
		logger.info("granted workout for deleteWorkouts : {}" , workout);
		
		return service.deleteWorkouts(workout);
		
	}
	
	

	
	
}
