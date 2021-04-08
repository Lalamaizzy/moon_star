package com.mapper;
import java.util.List;
import com.entity.Comment;

public interface CommentMapper {
	/**
	 * 查询出最新的前n条评论
	 * @param n 查出几条
	 * @return 评论列表
	 */
List<Comment>listRecentComment(Integer n);
}
