package com.controller;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.entity.Article;
import com.entity.Category;
import com.entity.Tag;
import com.entity.User;
import com.github.pagehelper.PageInfo;
import com.service.ArticleService;
import com.service.CategoryService;
import com.service.TagService;

import cn.hutool.http.HtmlUtil;

@Controller @RequestMapping("/article")
public class ArticleController {
	
	@Resource
	private ArticleService articleService;
	
	@Resource
	private CategoryService categoryService;
	
	@Resource
	private TagService tagService;
	
	@RequestMapping(value="")
	public String index(
			@RequestParam(required=false,defaultValue="1") Integer pageIndex,  
			@RequestParam(required=false,defaultValue="10") Integer pageSize,ModelMap m
			)
	{
		//����ҵ���ȥ��ѯ���� 
		PageInfo<Article> articlePageInfo=articleService.getPageArticleList(pageIndex,pageSize);
		
		m.put("pageInfo",articlePageInfo);	
		
		m.put("pageUrlPrefix","article?pageIndex");  //��ǰ׺������ҳ��ҳ�� 

		return "/Article/article-list";	
	}

	@RequestMapping(value="/add",method=RequestMethod.GET)
	public String toArticleAddPage(ModelMap m) {
		//������Ϣ
		List<Category> categoryList=categoryService.listCategory();
		
		//��ǩ��Ϣ
		List<Tag> tagList=tagService.listTag();
		
		m.put("categoryList", categoryList);
		m.put("tagList", tagList);
		
		return "/Article/article-add"; 
	}
	@RequestMapping(value="/add",method=RequestMethod.POST)
	public String add(HttpServletRequest request) {
		Article article=new Article(); 
		
		//�û�ID
		User user=(User)request.getSession().getAttribute("session_user");
		if(user!=null) {
			article.setArticleUserId(user.getUserId());		
		}
		
		//���±���
		article.setArticleTitle(request.getParameter("articleTitle"));
		
		//��������
		article.setArticleContent(request.getParameter("articleContent"));
		
		//����״̬
		article.setArticleStatus(Integer.parseInt(request.getParameter("articleStatus")));
		
		//����ժҪ
		String str=HtmlUtil.cleanHtmlTag( article.getArticleContent()); 
		String sumary=str.length()>150?str.substring(0,150):str; 
		article.setArticleSummary(sumary);
		
		//һ������ID
		int articleParentCategoryId=Integer.parseInt(request.getParameter("articleParentCategoryId"));
		
		//��������ID
		int articleChildCategoryId=Integer.parseInt(request.getParameter("articleChildCategoryId"));
		
		List<Category> categoryList =new ArrayList<Category>();
		categoryList.add(new Category(articleParentCategoryId));
		categoryList.add(new Category(articleChildCategoryId));
		
		article.setCategoryList(categoryList);
		
		//��ǩ
		String [] tagIds =request.getParameterValues("articleTagIds");
		List<Tag>tagList=new ArrayList<Tag>();
		for(String tagId: tagIds) {
			tagList.add(new Tag(Integer.parseInt(tagId)));
		}
			
		article.setTagList(tagList);
		
		articleService.addArticle(article);
		
		return "forward:/article"; 	
	}
}
