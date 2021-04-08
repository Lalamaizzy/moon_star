package com.mapper;

import com.entity.ArticleTagRef;

/**
 * 文章和标签的关联
*/
public interface ArticleTagRefMapper {
/**
* 添加文章和标签的关联关系
* @param articleTag 文章和标签的对应
*/
void addArticleTag(ArticleTagRef articleTag);
}