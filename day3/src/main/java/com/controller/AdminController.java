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

		//����dao�����������ݷ���
		User  user =userService.login(userName, userPass);
		if(user!=null ) {		
			//�ѵ�ǰ��¼�û�����Ϣ�ŵ� session ��,Ϊ���Ժ�ȫ�ֹ���
			request.getSession().setAttribute("session_user", user);		
			
			//��ѯ��������
			List<Article> articleList= articleService.listRecentArticle(5);
			request.setAttribute("articleList", articleList);
			
			//��ѯ��������
			List<Comment>commentList=commentService.listRecentComment(5);
			request.setAttribute("commentList", commentList);
	
			return  "index";  
		}
		else {
			request.setAttribute("msg", "�û�����������,��¼ʧ��");
			return  "login";  
		}
	}	
}
