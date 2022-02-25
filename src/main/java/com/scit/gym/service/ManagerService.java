package com.scit.gym.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.scit.gym.dao.ManagerDAO;
import com.scit.gym.vo.MemberVO;
import com.scit.gym.vo.MembershipVO;


@Service
public class ManagerService {

	
	@Autowired
	private ManagerDAO dao;
	
	
    // 모든 회원권 신청을 가져오기
	public ArrayList<MembershipVO> listAllRequests(String searchItem, String searchWord, int startRecord, int countPerPage) {
		
		Map<String, Object> search = new HashMap<String, Object>();
		search.put("searchItem", searchItem);
		search.put("searchWord", searchWord);
	
		ArrayList<MembershipVO> list = dao.listAllRequests(search, startRecord, countPerPage);
		
		return list;
		
	}


	
	// 회원권 신청 내용을 바탕으로, Member 테이블의 만료일 갱신 (Ajax)
	public int updateExpiredate(MemberVO member) {
			
		int result = dao.updateExpiredate(member);
		
		return result;
		
	}



	// Membership 테이블의 membership_processed 1로 업데이트
	public int updateProcessed(int membership_num) {
		
		int result = dao.updateProcessed(membership_num);
		
		return result;
	}


	// paging 처리를 하기 위해 전체 request 수를 DB에서 조회해오기
	public int selectTotalCount(String searchItem, String searchWord) {
		
		Map<String, String> search = new HashMap<String, String>();
		search.put("searchItem", searchItem);
		search.put("searchWord", searchWord);
		
		int result = 0;
		result = dao.selectTotalCount(search);
		
		return result;
	}



	// 조건에 맞는 모든 회원 정보를 가지고 오기
	public ArrayList<MemberVO> listMember(String searchItem, String searchWord, int startRecord, int countPerPage) {
		
		Map<String, Object> search = new HashMap<String, Object>();
		search.put("searchItem", searchItem);
		search.put("searchWord", searchWord);
	
		ArrayList<MemberVO> list = dao.listMember(search, startRecord, countPerPage);
		
		return list;
	}



	// 회원 삭제 요청 (Ajax 요청)
	public int deleteMember(String user_id) {

		int result = dao.deleteMember(user_id);
		
		return result;
	}


	
	// paging 처리를 하기 위해 전체 Member 수를 DB에서 조회해오기
	public int totalMemberCount(String searchItem, String searchWord) {
		
		Map<String, String> search = new HashMap<String, String>();
		search.put("searchItem", searchItem);
		search.put("searchWord", searchWord);
		
		int result = 0;
		result = dao.totalMemberCount(search);
		
		return result;
	}

	
	
	
}
