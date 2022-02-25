package com.scit.gym.dao;

import java.util.ArrayList;

import com.scit.gym.vo.Freeboard_ReplyVO;


public interface Freeboard_ReplyMapper {

	
	// Ajax를 활용한 댓글 하나 작성 (INSERT INTO)
	public int insertReply(Freeboard_ReplyVO reply);

	
	// Ajax를 활용한 모든 댓글 가져오기 (SELECT)
	public ArrayList<Freeboard_ReplyVO> selectAllReply(int freeboard_num);


	// Ajax를 활용한 댓글 수정 (UPDATE)
	public int updateReply(Freeboard_ReplyVO reply);


	// Ajax를 활용한 댓글 수정 (DELETE)
	public int deleteReply(Freeboard_ReplyVO reply);
	
	
	
	
	
}
