package com.scit.gym.dao;

import java.util.ArrayList;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;

import com.scit.gym.vo.MemberVO;
import com.scit.gym.vo.MembershipVO;

public interface ManagerMapper {

	
	// 모든 회원권 신청을 가져오기
	public ArrayList<MembershipVO> listAllRequests(Map<String, Object> search, RowBounds rb);

	
	// 회원권 신청 내용을 바탕으로, Member 테이블의 만료일 갱신 (Ajax)
	public int updateExpiredate(MemberVO member);


	// Membership 테이블의 membership_processed 1로 업데이트
	public int updateProcessed(int membership_num);


	// paging 처리를 하기 위해 전체 request 수를 DB에서 조회해오기
	public int selectTotalCount(Map<String, String> search);


	// 조건에 맞는 모든 회원 정보를 가지고 오기
	public ArrayList<MemberVO> listMember(Map<String, Object> search, RowBounds rb);


	// 회원 삭제 요청 (Ajax 요청)
	public int deleteMember(String user_id);


	// paging 처리를 하기 위해 전체 Member 수를 DB에서 조회해오기
	public int totalMemberCount(Map<String, String> search);
	
	
	


}
