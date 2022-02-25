package com.scit.gym.dao;

import java.util.ArrayList;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.scit.gym.vo.Freeboard_ReplyVO;



@Repository
public class Freeboard_ReplyDAO {

	@Autowired
	private SqlSession session;
	
	
	// Ajax를 활용한 댓글 하나 작성 (INSERT INTO)
	public int insertReply(Freeboard_ReplyVO reply) {
		
		int result = 0;
		 
		try {
			 Freeboard_ReplyMapper mapper = session.getMapper(Freeboard_ReplyMapper.class);
			 result = mapper.insertReply(reply);
			} catch(Exception e) {
			 e.printStackTrace();
		}
			return result;
	}

	
	
	// Ajax를 활용한 모든 댓글 가져오기 (SELECT)
	public ArrayList<Freeboard_ReplyVO> selectAllReply(int freeboard_num) {

		ArrayList<Freeboard_ReplyVO> list = null;
		
		try {
			 Freeboard_ReplyMapper mapper = session.getMapper(Freeboard_ReplyMapper.class);
			 list = mapper.selectAllReply(freeboard_num);
			} catch(Exception e) {
			 e.printStackTrace();
		}
			return list;
	}


	
	// Ajax를 활용한 댓글 수정 (UPDATE)
	public int updateReply(Freeboard_ReplyVO reply) {
		
		int result = 0;
		 
		try {
			 Freeboard_ReplyMapper mapper = session.getMapper(Freeboard_ReplyMapper.class);
			 result = mapper.updateReply(reply);
			} catch(Exception e) {
			 e.printStackTrace();
		}
			return result;
	}



	// Ajax를 활용한 댓글 수정 (DELETE)
	public int deleteReply(Freeboard_ReplyVO reply) {

		int result = 0;
		 
		try {
			 Freeboard_ReplyMapper mapper = session.getMapper(Freeboard_ReplyMapper.class);
			 result = mapper.deleteReply(reply);
			} catch(Exception e) {
			 e.printStackTrace();
		}
			return result;
	}
	
	
	
	
	
}
