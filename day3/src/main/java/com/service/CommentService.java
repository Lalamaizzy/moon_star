package com.service;
					import java.util.List;
					import com.entity.Comment;
					
					public interface CommentService {
						/**
						 * ��ѯ�����µ�ǰn������
						 * @param n �������
						 * @return �����б�
						 */
						List<Comment>listRecentComment(Integer n);
					}
