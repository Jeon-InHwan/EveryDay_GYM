package com.scit.gym.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.scit.gym.service.MembershipService;
import com.scit.gym.vo.MemberVO;
import com.scit.gym.vo.MembershipVO;

@Controller
public class MembershipController {

	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	@Autowired
	private MembershipService service;
	
	// Membership 가입 Form으로 이동
	@RequestMapping(value = "/membership/joinForm", method = RequestMethod.GET)
	public String joinForm() {
		return "membership/membership_joinForm";
	}
	
	
	// Ajax로 expiredate 값 가져오기
	@ResponseBody
	@RequestMapping(value = "/membership/confirmMembership", method = RequestMethod.POST)
	public MemberVO confirmMembership(String user_id) {
		
		return service.confirmMembership(user_id);
		
	}
	
	
	// Ajax로 Membership 테이블에 신청 INSERT 하기
	@ResponseBody
	@RequestMapping(value = "/membership/insertMembershipRequest", method = RequestMethod.POST)
	public int insertMembershipRequest(MembershipVO membership) {
		
		return service.insertMembershipRequest(membership);
		
	}
	
	
	// Ajax로 신청 프로세스 중인지 확인하기
	@ResponseBody
	@RequestMapping(value = "/membership/confirmRequest", method = RequestMethod.POST)
	public MembershipVO confirmRequest(String user_id) {
		
		MembershipVO member = service.confirmRequest(user_id);
		
		logger.info("confirmRequest : {}", member);
		
		return member;
		
	}
	
	
	
}
