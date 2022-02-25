package com.scit.gym.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.scit.gym.vo.MemberVO;
import com.scit.gym.vo.MembershipVO;

@Repository
public class MembershipDAO {

	@Autowired
	private SqlSession session;
	
	
	// Ajax로 expiredate 값 가져오기
	public MemberVO confirmMembership(String user_id) {
		
		MemberVO member = null;
		
		try {
			MembershipMapper mapper = session.getMapper(MembershipMapper.class);
			member = mapper.confirmMembership(user_id);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return member;
	}


	// Ajax로 Membership 테이블에 신청 INSERT 하기
	public int insertMembershipRequest(MembershipVO membership) {
		
		int result = 0;
		
		try {
			MembershipMapper mapper = session.getMapper(MembershipMapper.class);
			result = mapper.insertMembershipRequest(membership);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
		
	}


	// Ajax로 신청 프로세스 중인지 확인하기
	public MembershipVO confirmRequest(String user_id) {
	
		MembershipVO membership = null;
		
		try {
			MembershipMapper mapper = session.getMapper(MembershipMapper.class);
			membership = mapper.confirmRequest(user_id);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return membership;
	}

}
