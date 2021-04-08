package com.service;
					import java.util.List;
					import com.entity.Comment;
					
					public interface CommentService {
						/**
						 * 查询出最新的前n条评论
						 * @param n 查出几条
						 * @return 评论列表
						 */
						List<Comment>listRecentComment(Integer n);
					}
