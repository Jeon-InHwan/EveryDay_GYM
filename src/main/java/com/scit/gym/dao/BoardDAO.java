package com.scit.gym.dao;

import java.util.ArrayList;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.scit.gym.vo.FreeboardVO;




@Repository
public class BoardDAO {
	
	@Autowired
	private SqlSession session;
	
	
	// 자유게시판 글 작성 요청 (INSERT INTO)
	public int writeFreeBoard(FreeboardVO freeboard) {
		
		int result = 0;
		 
		try {
			 BoardMapper mapper = session.getMapper(BoardMapper.class);
			 result = mapper.writeFreeBoard(freeboard);
			} catch(Exception e) {
			 e.printStackTrace();
		}
			return result;
	}

	
	// 자유게시판 글 목록 전부 가져오기
	public ArrayList<FreeboardVO> listFreeboard(Map<String, Object> search, int startRecord, int countPerPage) {
		
		ArrayList<FreeboardVO> list = null;
		
		try {
			BoardMapper mapper = session.getMapper(BoardMapper.class);
			RowBounds rb = new RowBounds(startRecord, countPerPage);
			list = mapper.listFreeboard(search, rb);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}


	// 글 번호를 토대로 자유게시판 글 조회수 1 업데이트
	public void updateHits(int freeboard_num) {
		
		try {
			 BoardMapper mapper = session.getMapper(BoardMapper.class);
			 mapper.updateHits(freeboard_num);
			} catch(Exception e) {
			 e.printStackTrace();
		}
		
	}

	
	// Ajax를 활용하여 글 번호를 토대로 자유게시판 글 하나 가져오기 + 조회수 1 업데이트
	public FreeboardVO readFreeboard(int freeboard_num) {
		
		FreeboardVO board = null;
		
		try {
			 BoardMapper mapper = session.getMapper(BoardMapper.class);
			 board = mapper.readFreeboard(freeboard_num);
			} catch(Exception e) {
			 e.printStackTrace();
		}
		
		return board;
		
		
		 
	}

	
	// Ajax를 활용한 자유게시판 글 하나 수정
	public int updateFreeboard(FreeboardVO freeboard) {
		
		int result = 0;
		 
		try {
			 BoardMapper mapper = session.getMapper(BoardMapper.class);
			 result = mapper.updateFreeboard(freeboard);
			} catch(Exception e) {
			 e.printStackTrace();
		}
			return result;
	}

	
	// Ajax를 활용한 자유게시판 글 하나 삭제
	public int deleteFreeboard(FreeboardVO freeboard) {
		
		int result = 0;
		 
		try {
			 BoardMapper mapper = session.getMapper(BoardMapper.class);
			 result = mapper.deleteFreeboard(freeboard);
			} catch(Exception e) {
			 e.printStackTrace();
		}
			return result;
	}


	
	// paging 처리를 하기 위해 전체 글 수를 DB에서 조회해오기
	public int selectTotalCount(Map<String, String> search) {
		
		int result = 0;
		 
		try {
			 BoardMapper mapper = session.getMapper(BoardMapper.class);
			 result = mapper.selectTotalCount(search);
			} catch(Exception e) {
			 e.printStackTrace();
		}
			return result;
	}


	
	
}
