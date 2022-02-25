package com.scit.gym.dao;

import java.util.ArrayList;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.scit.gym.vo.MemberVO;
import com.scit.gym.vo.MembershipVO;

@Repository
public class ManagerDAO {

	@Autowired
	private SqlSession session;
	
	// 모든 회원권 신청을 가져오기
	public ArrayList<MembershipVO> listAllRequests(Map<String, Object> search, int startRecord, int countPerPage) {
		
		ArrayList<MembershipVO> list = null;
		
		try {
			ManagerMapper mapper = session.getMapper(ManagerMapper.class);
			RowBounds rb = new RowBounds(startRecord, countPerPage);
			list = mapper.listAllRequests(search, rb);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return list;
	}

	
	// 회원권 신청 내용을 바탕으로, Member 테이블의 만료일 갱신 (Ajax)
	public int updateExpiredate(MemberVO member) {
		
		int result = 0;
		
		try {
			ManagerMapper mapper = session.getMapper(ManagerMapper.class);
			result = mapper.updateExpiredate(member);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}


	
	// Membership 테이블의 membership_processed 1로 업데이트
	public int updateProcessed(int membership_num) {
		
		int result = 0;
		
		try {
			ManagerMapper mapper = session.getMapper(ManagerMapper.class);
			result = mapper.updateProcessed(membership_num);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}


	
	// paging 처리를 하기 위해 전체 request 수를 DB에서 조회해오기
	public int selectTotalCount(Map<String, String> search) {
		
		int result = 0;
		 
		try {
			 ManagerMapper mapper = session.getMapper(ManagerMapper.class);
			 result = mapper.selectTotalCount(search);
			} catch(Exception e) {
			 e.printStackTrace();
		}
			return result;
	}


	// 조건에 맞는 모든 회원 정보를 가지고 오기
	public ArrayList<MemberVO> listMember(Map<String, Object> search, int startRecord, int countPerPage) {
		
		ArrayList<MemberVO> list = null;
		
		try {
			ManagerMapper mapper = session.getMapper(ManagerMapper.class);
			RowBounds rb = new RowBounds(startRecord, countPerPage);
			list = mapper.listMember(search, rb);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return list;
	}


	// 회원 삭제 요청 (Ajax 요청)
	public int deleteMember(String user_id) {
		
		int result = 0;
		 
		try {
			 ManagerMapper mapper = session.getMapper(ManagerMapper.class);
			 result = mapper.deleteMember(user_id);
			} catch(Exception e) {
			 e.printStackTrace();
		}
			return result;
	}


	// paging 처리를 하기 위해 전체 Member 수를 DB에서 조회해오기
	public int totalMemberCount(Map<String, String> search) {
		
		int result = 0;
		
		try {
			 ManagerMapper mapper = session.getMapper(ManagerMapper.class);
			 result = mapper.totalMemberCount(search);
			} catch(Exception e) {
			 e.printStackTrace();
		}
			return result;
	}

}
