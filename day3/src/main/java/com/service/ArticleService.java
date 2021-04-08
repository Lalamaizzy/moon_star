package com.service;

import java.util.List;

import com.entity.Article;
import com.github.pagehelper.PageInfo;


public interface ArticleService {
	/**
	 * ��ѯ���·�����ǰn���ļ�
	 * @param n ��ѯ����������
	 * @return �����б�
	 */
	List<Article>listRecentArticle(Integer n);
	
	/**
	 * ��ҳ��ѯ�����б�
	 * @param pageIndex ��ǰ�ǵڼ�ҳ
	 * @param pageSize ÿҳҪ��ʾ������������
	 * @return  �����б�
	 */
	PageInfo<Article> getPageArticleList(Integer pageIndex, Integer pageSize);

	/**
	 * ������� (��ͬ���·���,���±�ǩ��Ϣһͬ���)
	 * @param article  ȫ���õ�����Ϣ
	 */
	void addArticle(Article article);
}
