package com.scit.gym.service;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.scit.gym.dao.MemberDAO;
import com.scit.gym.vo.MemberVO;


@Service
public class MemberService {
	
	@Autowired
	private MemberDAO dao;
	
	@Autowired
	private HttpSession session;

	
	// 회원가입
	public String join(MemberVO member) {
			
		String path = "";
			
		int result = dao.join(member);
			
		if(result < 0) {
			path = "redirect:/member/joinForm";
		} else {
			
			if(session.getAttribute("loginId") != null) {
				// 세션 스코프에 저장되어 있는 로그인 정보 삭제
				session.removeAttribute("loginId");
				session.removeAttribute("loginNm");
				session.removeAttribute("manager");
			}
			
			path = "redirect:/"; 
			}
		
		return path;
	}

	
	// DB까지 전달되는 로그인 요청 
	public String login(MemberVO member) {
		
		String path = "";
		
		MemberVO searchedMember = dao.selectMember(member.getUser_id());
		
		// 사용자가 입력한 id를 토대로, 데이터베이스에서 일치하는 데이터를 가져오지 못한 경우
		if(searchedMember == null) {
			System.out.println("ID가 틀린 상황");
			path = "redirect:/";
			
		} else {
			// 사용자가 입력한 비밀번호와 조회한 데이터의 비밀번호가 같은지 확인
			if(member.getUser_pwd().equals(searchedMember.getUser_pwd())){
				// 일치하는 경우이므로, 로그인 처리를 해주어야 함 => 세션 스코프에 로그인 정보 저장
				session.setAttribute("loginId", searchedMember.getUser_id());
				session.setAttribute("loginNm", searchedMember.getUser_nm());
				session.setAttribute("manager", searchedMember.getManager());
				path = "redirect:/afterLogin";
			} else {
				// 비밀번호만 틀린 상황 (ID는 바르게 입력한 상황)
				System.out.println("PW가 틀린 상황");
				path = "redirect:/";
			}
		}
		return path;
	}


	// 로그아웃 요청
	public void logout() {
		
		// 세션 스코프에 저장되어 있는 로그인 정보 삭제
		session.removeAttribute("loginId");
		session.removeAttribute("loginNm");
		session.removeAttribute("manager");
	}


	// user_id를 기반으로 회원 한 명의 정보 가져오기
	public MemberVO getMember(String user_id) {
		
		MemberVO temp = new MemberVO();
		
		temp.setUser_id(user_id);
		
		MemberVO searchedMember = dao.selectMember(temp.getUser_id());
		
		System.out.println(searchedMember);
		
		return searchedMember;
	}


	// 실제 회원정보 업데이트 요청
	public String updateMember(MemberVO member) {
		
		String path = "";
		
		int result = dao.updateMember(member);
			
		if(result < 0) {
			path = "redirect:/member/updateMemberForm?user_id=" + member.getUser_id();
		} else {
			// 세션 스코프에 저장되어 있는 로그인 정보 삭제
			session.removeAttribute("loginId");
			session.removeAttribute("loginNm");
			path = "redirect:/"; 
			}
		
		return path;
	}


	// 회원탈퇴를 위한 회원정보 확인 (Ajax)
	public MemberVO checkPwd(MemberVO member) {
		MemberVO searchedMember = dao.checkPwd(member);
		return searchedMember;
	}


	// 실제 회원탈퇴 요청 (Ajax)
	public int deleteMember(String user_id) {
		
		int result = dao.deleteMember(user_id);
		
		return result;
		
	}

	
	// 회원가입 시 ID 중복 검사
	public MemberVO idCheck(String user_id) {
		
		MemberVO searchedMember = dao.selectMember(user_id);
		
		return searchedMember;
		
	}


	
}
