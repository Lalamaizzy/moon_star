package com.service;

import java.util.List;

import com.entity.Article;
import com.github.pagehelper.PageInfo;


public interface ArticleService {
	/**
	 * 查询最新发布的前n条文件
	 * @param n 查询出的文章数
	 * @return 文章列表
	 */
	List<Article>listRecentArticle(Integer n);
	
	/**
	 * 分页查询文章列表
	 * @param pageIndex 当前是第几页
	 * @param pageSize 每页要显示出多少条数据
	 * @return  数据列表
	 */
	PageInfo<Article> getPageArticleList(Integer pageIndex, Integer pageSize);

	/**
	 * 添加文章 (连同文章分类,文章标签信息一同添加)
	 * @param article  全部用到的信息
	 */
	void addArticle(Article article);
}
