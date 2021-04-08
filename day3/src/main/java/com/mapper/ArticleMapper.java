package com.mapper;
import java.util.List;
import com.entity.Article;
					
					public interface ArticleMapper {
						/**
						 * ��ѯ���·�����ǰn���ļ�
						 * @param n ��ѯ����������
						 * @return �����б�
						 */
						List<Article>listRecentArticle(Integer n);
						
						/**
						 * ����id��ѯ���µ�ȫ����Ϣ
						 * @param articleId ����id
						 * @return ������Ϣ
						 */
						Article getArticleById(Integer articleId);
						
						/**
						 * ��ѯ���е�����
						 * @return �����б�
						 */
						List<Article> findAll();

						/**
						 * ���������Ϣ
						 * @param article ������Ϣ
						 */
						void addArticle(Article article);
					}