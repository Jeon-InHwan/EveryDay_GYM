package com.scit.gym.dao;

import com.scit.gym.vo.MemberVO;

public interface MemberMapper {
	
	
	// 회원가입
	public int join(MemberVO member);

	
	// 가입된 회원인지 확인하기 위해, 한 회원의 정보만을 DB에서 가져오기
	public MemberVO selectMember(String user_id);


	// 실제 회원정보 업데이트 요청
	public int updateMember(MemberVO member);


	// 회원탈퇴를 위한 회원정보 확인 (Ajax)
	public MemberVO checkPwd(MemberVO member);

	
	// 실제 회원탈퇴 요청 (Ajax)
	public int deleteMember(String user_id);
	

}
