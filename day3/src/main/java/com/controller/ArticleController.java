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
		//调用业务层去查询数据 
		PageInfo<Article> articlePageInfo=articleService.getPageArticleList(pageIndex,pageSize);
		
		m.put("pageInfo",articlePageInfo);	
		
		m.put("pageUrlPrefix","article?pageIndex");  //把前缀传给分页的页面 

		return "/Article/article-list";	
	}

	@RequestMapping(value="/add",method=RequestMethod.GET)
	public String toArticleAddPage(ModelMap m) {
		//分类信息
		List<Category> categoryList=categoryService.listCategory();
		
		//标签信息
		List<Tag> tagList=tagService.listTag();
		
		m.put("categoryList", categoryList);
		m.put("tagList", tagList);
		
		return "/Article/article-add"; 
	}
	@RequestMapping(value="/add",method=RequestMethod.POST)
	public String add(HttpServletRequest request) {
		Article article=new Article(); 
		
		//用户ID
		User user=(User)request.getSession().getAttribute("session_user");
		if(user!=null) {
			article.setArticleUserId(user.getUserId());		
		}
		
		//文章标题
		article.setArticleTitle(request.getParameter("articleTitle"));
		
		//文章内容
		article.setArticleContent(request.getParameter("articleContent"));
		
		//文章状态
		article.setArticleStatus(Integer.parseInt(request.getParameter("articleStatus")));
		
		//文章摘要
		String str=HtmlUtil.cleanHtmlTag( article.getArticleContent()); 
		String sumary=str.length()>150?str.substring(0,150):str; 
		article.setArticleSummary(sumary);
		
		//一级分类ID
		int articleParentCategoryId=Integer.parseInt(request.getParameter("articleParentCategoryId"));
		
		//二级分类ID
		int articleChildCategoryId=Integer.parseInt(request.getParameter("articleChildCategoryId"));
		
		List<Category> categoryList =new ArrayList<Category>();
		categoryList.add(new Category(articleParentCategoryId));
		categoryList.add(new Category(articleChildCategoryId));
		
		article.setCategoryList(categoryList);
		
		//标签
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
