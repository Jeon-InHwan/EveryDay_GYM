package com.scit.gym.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.scit.gym.service.MemberService;
import com.scit.gym.vo.MemberVO;

@Controller
public class MemberController {

	
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	@Autowired
	private MemberService service;
	
	
	// 회원가입 양식 요청
	@RequestMapping(value = "/member/joinForm", method = RequestMethod.GET)
	public String joinForm() {
		return "/member/joinForm";
	}
	
	
	@RequestMapping(value = "/afterLogin", method = RequestMethod.GET)
	public String afterJoin() {
		return "/afterLogin";
	}
	
	
	// 회원가입 시 ID 중복 검사
	@ResponseBody
	@RequestMapping(value = "/member/idCheck", method = RequestMethod.POST)
	public String idCheck(String user_id) {
		MemberVO searchedMember = service.idCheck(user_id);
		if(searchedMember == null) {
			return "success";
		} else {
			return "fail";
		}
	}
	
	
	// DB까지 도달하는 회원가입 요청
	@RequestMapping(value = "/member/join", method = RequestMethod.POST)
	public String join(MemberVO member) {
		
		logger.info("granted VO for join : {}", member);
		 return service.join(member);
	}
	
	
	// DB까지 도달하는 로그인 요청
	@RequestMapping(value = "/member/login", method = RequestMethod.POST)
	public String login(MemberVO member) {
		
		logger.info("granted VO for login : {}", member);
		return service.login(member);
	}
	
	
	// 로그아웃 요청
	@RequestMapping(value = "/member/logout", method = RequestMethod.GET)
	public String logout() {
			
		service.logout();
		
		return "redirect:/";
	}
	
	
	// 회원정보 업데이트 Form 요청
	@RequestMapping(value = "/member/updateMemberForm", method = RequestMethod.GET)
	public String updateMemberForm(String user_id, Model model) {
		
		MemberVO member = service.getMember(user_id);
		
		model.addAttribute("MemberVO", member);
		
		return "/member/updateMemberForm";
	}
	
	
	// 실제 회원정보 업데이트 요청
	@RequestMapping(value = "/member/updateMember", method = RequestMethod.POST)
	public String updateMember(MemberVO member) {
		
		logger.info("granted VO for update : {}", member);
		
		return service.updateMember(member);
		
	}
	
	
	// 회원탈퇴를 위한 페이지로 이동
	@RequestMapping(value = "/member/withdrawal", method = RequestMethod.GET)
	public String withdrawal() {
		return "member/withdrawal";
	}
	
	
	// 회원탈퇴를 위한 회원정보 확인 (Ajax)
	@ResponseBody
	@RequestMapping(value = "/member/checkPwd", method = RequestMethod.POST)
	public MemberVO checkPwd(MemberVO member) {
		return service.checkPwd(member);
	}
	
	
	// 실제 회원탈퇴 요청 (Ajax)
	@ResponseBody
	@RequestMapping(value = "/member/deleteMember", method = RequestMethod.POST)
	public int deleteMember(String user_id) {
		return service.deleteMember(user_id);
	}
		
	
}
