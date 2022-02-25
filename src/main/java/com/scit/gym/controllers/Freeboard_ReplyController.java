package com.scit.gym.controllers;

import java.util.ArrayList;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import com.scit.gym.service.Freeboard_ReplyService;
import com.scit.gym.vo.Freeboard_ReplyVO;


@Controller
public class Freeboard_ReplyController {

	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	@Autowired
	private Freeboard_ReplyService service;
	
	
	// Ajax를 활용한 댓글 하나 작성 (INSERT INTO)
	@ResponseBody
	@RequestMapping(value = "/freeboardReply/insertReply", method = RequestMethod.POST)
	public int insertReply(Freeboard_ReplyVO reply) {
		
		logger.info("granted ReplyVO : {}", reply);
		
		int result = 0;
		result = service.insertReply(reply);
			
			return result;
	}
	
	
	// Ajax를 활용한 모든 댓글 가져오기 (SELECT)
	@ResponseBody
	@RequestMapping(value = "/freeboardReply/selectAllReply", method = RequestMethod.POST)
	public ArrayList<Freeboard_ReplyVO> selectAllReply(int freeboard_num) {
		
		logger.info("granted freeboard_num : {}", freeboard_num);
		
		ArrayList<Freeboard_ReplyVO> list = service.selectAllReply(freeboard_num);
			
		return list;
	}
	
	
	
	
	// Ajax를 활용한 댓글 수정 (UPDATE)
	@ResponseBody
	@RequestMapping(value = "/freeboardReply/updateReply", method = RequestMethod.POST)
	public int updateReply(Freeboard_ReplyVO reply) {
		
		int result = 0;
		
		logger.info("granted ReplyVO : {}", reply);
		
		result = service.updateReply(reply);
		
		return result;
	}
	
	
	// Ajax를 활용한 댓글 삭제 (DELETE)
	@ResponseBody
	@RequestMapping(value = "/freeboardReply/deleteReply", method = RequestMethod.POST)
	public int deleteReply(Freeboard_ReplyVO reply) {
		
		int result = 0;
		
		logger.info("granted reply For Delete  : {}", reply);
		
		result = service.deleteReply(reply);
		
		return result;
	}
	
	
	
	
	
	
}
