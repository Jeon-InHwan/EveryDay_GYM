package com.scit.gym.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.scit.gym.dao.BoardDAO;
import com.scit.gym.vo.FreeboardVO;



@Service
public class BoardService {
	
	@Autowired
	private BoardDAO dao;
	
	@Autowired
	private HttpSession session;
	
	
	// 자유게시판 글 작성 요청 (INSERT INTO)
	public String writeFreeBoard(FreeboardVO freeboard) {
		
		String path = "";
		
		int result = dao.writeFreeBoard(freeboard);
		
		if(result < 0) {
			path = "redirect:/board/freeWriteForm";
		} else {
			path = "redirect:/board/freeBoard"; 
			}
		
		return path;
	}


	// 자유게시판 글 목록 전부 가져오기
	public ArrayList<FreeboardVO> listFreeboard(String searchItem, String searchWord, int startRecord, int countPerPage) {
		Map<String, Object> search = new HashMap<String, Object>();
		search.put("searchItem", searchItem);
		search.put("searchWord", searchWord);
		return dao.listFreeboard(search, startRecord, countPerPage);
	}




	// Ajax를 활용하여 글 번호를 토대로 자유게시판 글 하나 가져오기 + 조회수 1 업데이트
	public FreeboardVO readFreeboard(int freeboard_num) {
	
		FreeboardVO oneBoard = null;
		
		dao.updateHits(freeboard_num);
		oneBoard = dao.readFreeboard(freeboard_num);
		
		return oneBoard;
	}


	// Update one freeboard post using Ajax 
	public int updateFreeboard(FreeboardVO freeboard) {
		
		String user_id = (String)session.getAttribute("loginId");
		int manager = (int)session.getAttribute("manager");
		freeboard.setUser_id(user_id);
		freeboard.setManager(manager);
		
		int result = 0;
		result = dao.updateFreeboard(freeboard);
		
		return result;
	}


	// Delete one freeboard post using Ajax 
	public int deleteFreeboard(FreeboardVO freeboard) {
		
		String user_id = (String)session.getAttribute("loginId");
		int manager = (int)session.getAttribute("manager");
		freeboard.setUser_id(user_id);
		freeboard.setManager(manager);

		int result = 0;
		result = dao.deleteFreeboard(freeboard);
		
		return result;
	}

	
	// paging 처리를 하기 위해 전체 글 수를 DB에서 조회해오기
	public int selectTotalCount(String searchItem, String searchWord) {
		
		Map<String, String> search = new HashMap<String, String>();
		search.put("searchItem", searchItem);
		search.put("searchWord", searchWord);
		
		int result = 0;
		result = dao.selectTotalCount(search);
		
		return result;
	}


	
}
