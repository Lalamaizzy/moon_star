package com.service.impl;
import java.util.Date;
import java.util.List;
import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import com.entity.Article;
import com.entity.ArticleCategoryRef;
import com.entity.ArticleTagRef;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.mapper.ArticleCategoryRefMapper;
import com.mapper.ArticleMapper;
import com.mapper.ArticleTagRefMapper;
import com.service.ArticleService;

@Service
public class ArticleServicImpl implements ArticleService {
	@Resource
	private ArticleMapper articleMapper;
	
	@Resource
	private ArticleCategoryRefMapper articleCategoryRefMapper;
		
	@Resource
	private ArticleTagRefMapper articleTagRefMapper;
	/**
	 * 查询最近发表的前n条文章
	 */
	public List<Article> listRecentArticle(Integer n)  {
		return articleMapper.listRecentArticle(n);
	}
	
	@Override
	public PageInfo<Article> getPageArticleList(Integer pageIndex, Integer pageSize) {
		//让分页插件帮我们进行分页查询
		PageHelper.startPage(pageIndex,pageSize);  
		
		List<Article> articleList =articleMapper.findAll();
		
		return new PageInfo<Article>(articleList);
	}

	/**
	 * 添加文章
	 */
	public void addArticle(Article article) {
		article.setArticleCreateTime(new Date());
		article.setArticleUpdateTime(new Date());
		article.setArticleViewCount(0);
		article.setArticleLikeCount(0);
		article.setArticleCommentCount(0);
		article.setArticleOrder(1);
		
		articleMapper.addArticle(article);
		
		// 添加文章和分类的对应信息
		for(int i=0;i<article.getCategoryList().size();i++) {
			ArticleCategoryRef articleCate=new ArticleCategoryRef(article.getArticleId(),article.getCategoryList().get(i).getCategoryId());
			articleCategoryRefMapper.addAtricleCategory(articleCate);
		}
		// 添加文章和标签的对应信息
		for(int i=0;i<article.getTagList().size();i++) {
			ArticleTagRef articleTag=new ArticleTagRef(article.getArticleId(), article.getTagList().get(i).getTagId()   );
			articleTagRefMapper.addArticleTag(articleTag);
		}
	}

}
