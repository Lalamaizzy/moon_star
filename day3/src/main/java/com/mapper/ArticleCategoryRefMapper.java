package com.mapper;
						import com.entity.ArticleCategoryRef;
						
						/**
						 * 文章和分类关联
						 */
						public interface ArticleCategoryRefMapper {
							/**
							 * 添加文章和分类的关联信息
							 * @param articleCate  文章和分类的关联
							 */
							void addAtricleCategory(ArticleCategoryRef articleCate);
						}
