package com.scit.gym.dao;

import com.scit.gym.vo.MemberVO;
import com.scit.gym.vo.MembershipVO;

public interface MembershipMapper {

	// Ajax로 expiredate 값 가져오기
	public MemberVO confirmMembership(String user_id);

	// Ajax로 Membership 테이블에 신청 INSERT 하기
	public int insertMembershipRequest(MembershipVO membership);

	// Ajax로 신청 프로세스 중인지 확인하기
	public MembershipVO confirmRequest(String user_id);

}
