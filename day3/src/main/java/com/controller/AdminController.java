package com.controller;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.entity.Article;
import com.entity.Comment;
import com.entity.User;
import com.service.ArticleService;
import com.service.CommentService;
import com.service.UserService;

@Controller
public class AdminController {
	@Resource
	private UserService userService;
	
	@Resource	
	private CommentService commentService;
	
	@Resource
	private  ArticleService articleService;
	
	@RequestMapping("/login")
	public String login(String userName,String userPass,HttpServletRequest request) {

		//调用dao层来进行数据访问
		User  user =userService.login(userName, userPass);
		if(user!=null ) {		
			//把当前登录用户的信息放到 session 中,为了以后全局共享
			request.getSession().setAttribute("session_user", user);		
			
			//查询最新文章
			List<Article> articleList= articleService.listRecentArticle(5);
			request.setAttribute("articleList", articleList);
			
			//查询最新评论
			List<Comment>commentList=commentService.listRecentComment(5);
			request.setAttribute("commentList", commentList);
	
			return  "index";  
		}
		else {
			request.setAttribute("msg", "用户或或密码错误,登录失败");
			return  "login";  
		}
	}	
}
