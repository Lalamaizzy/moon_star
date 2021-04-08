package com.mapper;
import java.util.List;
import com.entity.Article;
					
					public interface ArticleMapper {
						/**
						 * 查询最新发布的前n条文件
						 * @param n 查询出的文章数
						 * @return 文章列表
						 */
						List<Article>listRecentArticle(Integer n);
						
						/**
						 * 根据id查询文章的全部信息
						 * @param articleId 文章id
						 * @return 文章信息
						 */
						Article getArticleById(Integer articleId);
						
						/**
						 * 查询所有的文章
						 * @return 文章列表
						 */
						List<Article> findAll();

						/**
						 * 添加文章信息
						 * @param article 文章信息
						 */
						void addArticle(Article article);
					}