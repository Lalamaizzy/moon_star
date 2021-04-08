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
	 * ��ѯ��������ǰn������
	 */
	public List<Article> listRecentArticle(Integer n)  {
		return articleMapper.listRecentArticle(n);
	}
	
	@Override
	public PageInfo<Article> getPageArticleList(Integer pageIndex, Integer pageSize) {
		//�÷�ҳ��������ǽ��з�ҳ��ѯ
		PageHelper.startPage(pageIndex,pageSize);  
		
		List<Article> articleList =articleMapper.findAll();
		
		return new PageInfo<Article>(articleList);
	}

	/**
	 * �������
	 */
	public void addArticle(Article article) {
		article.setArticleCreateTime(new Date());
		article.setArticleUpdateTime(new Date());
		article.setArticleViewCount(0);
		article.setArticleLikeCount(0);
		article.setArticleCommentCount(0);
		article.setArticleOrder(1);
		
		articleMapper.addArticle(article);
		
		// ������ºͷ���Ķ�Ӧ��Ϣ
		for(int i=0;i<article.getCategoryList().size();i++) {
			ArticleCategoryRef articleCate=new ArticleCategoryRef(article.getArticleId(),article.getCategoryList().get(i).getCategoryId());
			articleCategoryRefMapper.addAtricleCategory(articleCate);
		}
		// ������ºͱ�ǩ�Ķ�Ӧ��Ϣ
		for(int i=0;i<article.getTagList().size();i++) {
			ArticleTagRef articleTag=new ArticleTagRef(article.getArticleId(), article.getTagList().get(i).getTagId()   );
			articleTagRefMapper.addArticleTag(articleTag);
		}
	}

}
