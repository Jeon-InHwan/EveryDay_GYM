package com.scit.gym.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.scit.gym.vo.MemberVO;


@Repository
public class MemberDAO {
	
	@Autowired
	private SqlSession session;
	
	
	// 회원가입
	public int join(MemberVO member) {
		
		int result = 0;
		
		 try {
			 MemberMapper mapper = session.getMapper(MemberMapper.class);
			 result = mapper.join(member);
		 } catch(Exception e) {
			 e.printStackTrace();
		 }
		 return result;
	}



	// 가입된 회원인지 확인하기 위해, 한 회원의 정보만을 DB에서 가져오기
	public MemberVO selectMember(String user_id) {
		
		MemberVO member = null;
		
		try {
			MemberMapper mapper = session.getMapper(MemberMapper.class);
			member = mapper.selectMember(user_id);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return member;
	}



	// 실제 회원정보 업데이트 요청
	public int updateMember(MemberVO member) {
		
		int result = 0;
		
		 try {
			 MemberMapper mapper = session.getMapper(MemberMapper.class);
			 result = mapper.updateMember(member);
		 } catch(Exception e) {
			 e.printStackTrace();
		 }
		 return result;
	}

	// 회원탈퇴를 위한 회원정보 확인 (Ajax)
	public MemberVO checkPwd(MemberVO member) {
		
		MemberVO searchedMember = null;
		
		try {
			 MemberMapper mapper = session.getMapper(MemberMapper.class);
			 searchedMember = mapper.checkPwd(member);
		 } catch(Exception e) {
			 e.printStackTrace();
		 }
		 return searchedMember;
	}


	// 실제 회원탈퇴 요청 (Ajax)
	public int deleteMember(String user_id) {
		
		int result = 0;
		
		 try {
			 MemberMapper mapper = session.getMapper(MemberMapper.class);
			 result = mapper.deleteMember(user_id);
		 } catch(Exception e) {
			 e.printStackTrace();
		 }
		 return result;
	}
	
}
