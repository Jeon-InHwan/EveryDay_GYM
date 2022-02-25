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

import com.scit.gym.service.ManagerService;
import com.scit.gym.util.PageNavigator;
import com.scit.gym.vo.MemberVO;
import com.scit.gym.vo.MembershipVO;

@Controller
public class ManagerController {
	
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	@Autowired
	private ManagerService service;
	
	private final int countPerPage = 10;
	private final int pagePerGroup = 5;
	
	
	// 회원권 신청 처리 페이지로 이동하면서, 모든 회원권 신청을 가져오기
	@RequestMapping(value = "/manager/processRequest", method = RequestMethod.GET)
	public String processRequest(Model model, 
			@RequestParam(name = "page", defaultValue = "1") int page,
			@RequestParam(value = "searchItem", defaultValue = "3") String searchItem,
			@RequestParam(value = "searchWord", defaultValue = "") String searchWord) {
		
		// paging 처리를 하기 위해 전체 request 수를 DB에서 조회해오기 (검색한 경우도 고려해야함)
		int totalCount = service.selectTotalCount(searchItem, searchWord);
		
		logger.info("select Total Request Count : {}", totalCount);
		
		
		// paging 처리를 위한 객체 생성
		PageNavigator navi = new PageNavigator(countPerPage, pagePerGroup, page, totalCount);
		
		ArrayList<MembershipVO> list = service.listAllRequests(searchItem, searchWord, navi.getStartRecord(), navi.getCountPerPage());
		
		model.addAttribute("list", list);
		model.addAttribute("navi", navi);
		model.addAttribute("searchWord", searchWord);
		model.addAttribute("searchItem", searchItem);
		
		return "manager/processRequest";
	}
	
	
	
	// 회원권 신청 내용을 바탕으로, Member 테이블의 만료일 갱신 (Ajax)
	@ResponseBody
	@RequestMapping(value = "/manager/updateExpiredate", method = RequestMethod.POST)
	public int updateExpiredate(MemberVO member) {
		
		return service.updateExpiredate(member);
		
	}
	
	
	// Member 테이블의 만료일이 갱신되면, Membership 테이블의 membership_processed 1로 업데이트 (Ajax)
	@ResponseBody
	@RequestMapping(value = "/manager/updateProcessed", method = RequestMethod.POST)
	public int updateProcessed(int membership_num) {
		
		return service.updateProcessed(membership_num);
		
	}
	
	
	// 회원 리스트 페이지로 이동하며, 조건에 맞는 모든 회원 정보를 가지고 오기
	@RequestMapping(value = "/manager/listMember", method = RequestMethod.GET)
	public String listMember(Model model,
			@RequestParam(name = "page", defaultValue = "1") int page,
			@RequestParam(value = "searchItem", defaultValue = "user_id") String searchItem,
			@RequestParam(value = "searchWord", defaultValue = "") String searchWord) {
		
		
		// paging 처리를 하기 위해 전체 Member 수를 DB에서 조회해오기 (검색한 경우도 고려해야함)
		int totalCount = service.totalMemberCount(searchItem, searchWord);
		
		logger.info("select Total Member Count : {}", totalCount);
		
		
		// paging 처리를 위한 객체 생성
		PageNavigator navi = new PageNavigator(countPerPage, pagePerGroup, page, totalCount);

		ArrayList<MemberVO> list = service.listMember(searchItem, searchWord, navi.getStartRecord(), navi.getCountPerPage());
	
		model.addAttribute("list", list);
		model.addAttribute("navi", navi);
		model.addAttribute("searchWord", searchWord);
		model.addAttribute("searchItem", searchItem);
		
		return "manager/listMember";
	}
	
	
	
	// 회원 삭제 요청 (Ajax 요청)
	@ResponseBody
	@RequestMapping(value = "/manager/deleteMember", method = RequestMethod.POST)
	public int deleteMember(String user_id) {
		
		int result = service.deleteMember(user_id);
		
		return result;
		
	}
	
	

}
