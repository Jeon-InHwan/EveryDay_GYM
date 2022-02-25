package com.scit.gym.service;

import java.util.ArrayList;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.scit.gym.dao.Freeboard_ReplyDAO;
import com.scit.gym.vo.Freeboard_ReplyVO;



@Service
public class Freeboard_ReplyService {
	
	@Autowired
	private Freeboard_ReplyDAO dao;
	
	@Autowired
	private HttpSession session;
	

	// Ajax를 활용한 댓글 하나 작성 (INSERT INTO)
	public int insertReply(Freeboard_ReplyVO reply) {
		
		int result = 0;
		
		result = dao.insertReply(reply);
		
		return result;
	}

	
	// Ajax를 활용한 모든 댓글 가져오기 (SELECT)
	public ArrayList<Freeboard_ReplyVO> selectAllReply(int freeboard_num) {
		
		ArrayList<Freeboard_ReplyVO> list = dao.selectAllReply(freeboard_num);
		
		return list;
	}


	// Ajax를 활용한 댓글 수정 (UPDATE)
	public int updateReply(Freeboard_ReplyVO reply) {
		
		String user_id = (String)session.getAttribute("loginId");
		int manager = (int)session.getAttribute("manager");
		reply.setUser_id(user_id);
		reply.setManager(manager);
		
		int result = 0;
		
		result = dao.updateReply(reply);
		
		return result;
	}


	// Ajax를 활용한 댓글 삭제 (DELETE)
	public int deleteReply(Freeboard_ReplyVO reply) {
		
		String user_id = (String)session.getAttribute("loginId");
		int manager = (int)session.getAttribute("manager");
		reply.setUser_id(user_id);
		reply.setManager(manager);
		
		int result = 0;
		
		result = dao.deleteReply(reply);
		
		return result;
	}


	
}
