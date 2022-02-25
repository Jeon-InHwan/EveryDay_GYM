package com.scit.gym.dao;

import java.util.ArrayList;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;

import com.scit.gym.vo.FreeboardVO;

public interface BoardMapper {
	
	
	// 자유게시판 글 작성 요청 (INSERT INTO)
	public int writeFreeBoard(FreeboardVO freeboard);

	
	// 자유게시판 글 목록 전부 가져오기
	public ArrayList<FreeboardVO> listFreeboard(Map<String, Object> search, RowBounds rb);

	
	// 글 번호를 토대로 자유게시판 글 조회수 1 업데이트
	public void updateHits(int freeboard_num);

	
	// Ajax를 활용하여 글 번호를 토대로 자유게시판 글 하나 가져오기 + 조회수 1 업데이트
	public FreeboardVO readFreeboard(int freeboard_num);
	
	
	// Ajax를 활용한 자유게시판 글 하나 수정
	public int updateFreeboard(FreeboardVO freeboard);


	// Ajax를 활용한 자유게시판 글 하나 삭제
	public int deleteFreeboard(FreeboardVO freeboard);

	
	// paging 처리를 하기 위해 전체 글 수를 DB에서 조회해오기
	public int selectTotalCount(Map<String, String> search);
	
	
	
}
