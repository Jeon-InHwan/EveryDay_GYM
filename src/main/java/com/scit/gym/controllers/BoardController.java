package com.scit.gym.controllers;

import java.util.ArrayList;
import javax.servlet.http.HttpSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import com.scit.gym.service.BoardService;
import com.scit.gym.util.PageNavigator;
import com.scit.gym.vo.FreeboardVO;


@Controller
public class BoardController {

	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	@Autowired
	private HttpSession session;
	
	@Autowired
	private BoardService service;
	
	private final int countPerPage = 10;
	private final int pagePerGroup = 5;
	
	
	// 자유게시판 jsp로 이동 요청
	@RequestMapping(value = "/board/freeBoard", method = RequestMethod.GET)
	public String joinForm(Model model, 
			@RequestParam(name = "page", defaultValue = "1") int page,
			@RequestParam(value = "searchItem", defaultValue = "freeboard_title") String searchItem,
			@RequestParam(value = "searchWord", defaultValue = "") String searchWord) {
		
		
		// paging 처리를 하기 위해 전체 request 수를 DB에서 조회해오기 (검색한 경우도 고려해야함)
		int totalCount = service.selectTotalCount(searchItem, searchWord);
		
		logger.info("select Total freeboard Count : {}", totalCount);
		logger.info("searchItem : {}", searchItem);
		logger.info("searchWord : {}", searchWord);
		
		// paging 처리를 위한 객체 생성
		PageNavigator navi = new PageNavigator(countPerPage, pagePerGroup, page, totalCount);
		
		
		// 자유게시판 목록 조회
		ArrayList<FreeboardVO> list = service.listFreeboard(searchItem, searchWord, navi.getStartRecord(), navi.getCountPerPage());
		
		logger.info("select all from freeboard : {}", list);
		logger.info("navi : {}", navi);
		
		model.addAttribute("list", list);
		model.addAttribute("navi", navi);
		model.addAttribute("searchWord", searchWord);
		model.addAttribute("searchItem", searchItem);
		
		return "/board/freeBoard";
	}
	
	
	// 자유게시판 writeForm 요청
	@RequestMapping(value = "/board/freeWriteForm", method = RequestMethod.GET)
	public String freeWriteFrom() {
		return "/board/freeWriteForm";
	}
	
	
	// DB까지 도달하는 자유게시판 글 쓰기 요청
	@RequestMapping(value="/board/writeFreeBoard", method = RequestMethod.POST)
	public String writeFreeBoard(FreeboardVO freeboard) {
		
		String user_id = (String)session.getAttribute("loginId");
		freeboard.setUser_id(user_id);
		
		return service.writeFreeBoard(freeboard);
	}
	
	
	
	// Ajax를 활용한 자유게시판 글 하나 읽기
	@ResponseBody
	@RequestMapping(value = "/board/readFreeboard", method = RequestMethod.POST)
	public FreeboardVO readFreeboard(int freeboard_num) {
		FreeboardVO oneBoard = service.readFreeboard(freeboard_num);
		return oneBoard;
	}
	
	
	// Ajax를 활용한 자유게시판 글 하나 수정
	@ResponseBody
	@RequestMapping(value = "/board/updateFreeboard", method = RequestMethod.POST)
	public int updateFreeboard(FreeboardVO freeboard) {
		
		int result = 0;
		result = service.updateFreeboard(freeboard);
		
		return result;
	}
	
	
	// Ajax를 활용한 자유게시판 글 하나 삭제
	@ResponseBody
	@RequestMapping(value = "/board/deleteFreeboard", method = RequestMethod.POST)
	public int deleteFreeboard(FreeboardVO freeboard) {
			
		int result = 0;
		result = service.deleteFreeboard(freeboard);
			
		return result;
	}
	
	
	
	
}
