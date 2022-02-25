package com.scit.gym.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.scit.gym.dao.MembershipDAO;
import com.scit.gym.vo.MemberVO;
import com.scit.gym.vo.MembershipVO;

@Service
public class MembershipService {

	
	@Autowired
	private MembershipDAO dao;
	
	
	// Ajax로 expiredate 값 가져오기
	public MemberVO confirmMembership(String user_id) {
		return dao.confirmMembership(user_id);
	}


	// Ajax로 Membership 테이블에 신청 INSERT 하기
	public int insertMembershipRequest(MembershipVO membership) {
			
		int result =  dao.insertMembershipRequest(membership);	
		
		return result;
		
	}


	// Ajax로 신청 프로세스 중인지 확인하기
	public MembershipVO confirmRequest(String user_id) {
		
		MembershipVO membership = null;
		
		membership = dao.confirmRequest(user_id);
		
		return membership;
	}

}
