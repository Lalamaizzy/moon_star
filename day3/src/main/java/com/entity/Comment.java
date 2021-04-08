package com.entity;

import java.util.Date;

public class Comment {

	 private Integer commentId;
		
		public Integer getCommentId() {
		return commentId;
	}

	public void setCommentId(Integer commentId) {
		this.commentId = commentId;
	}

	public Integer getCommentPid() {
		return commentPid;
	}

	public void setCommentPid(Integer commentPid) {
		this.commentPid = commentPid;
	}

	public String getCommentPname() {
		return commentPname;
	}

	public void setCommentPname(String commentPname) {
		this.commentPname = commentPname;
	}

	public Integer getCommentArticleId() {
		return commentArticleId;
	}

	public void setCommentArticleId(Integer commentArticleId) {
		this.commentArticleId = commentArticleId;
	}

	public String getCommentAuthorName() {
		return commentAuthorName;
	}

	public void setCommentAuthorName(String commentAuthorName) {
		this.commentAuthorName = commentAuthorName;
	}

	public String getCommentAuthorEmail() {
		return commentAuthorEmail;
	}

	public void setCommentAuthorEmail(String commentAuthorEmail) {
		this.commentAuthorEmail = commentAuthorEmail;
	}

	public String getCommentAuthorUrl() {
		return commentAuthorUrl;
	}

	public void setCommentAuthorUrl(String commentAuthorUrl) {
		this.commentAuthorUrl = commentAuthorUrl;
	}

	public String getCommentAuthorAvatar() {
		return commentAuthorAvatar;
	}

	public void setCommentAuthorAvatar(String commentAuthorAvatar) {
		this.commentAuthorAvatar = commentAuthorAvatar;
	}

	public String getCommentContent() {
		return commentContent;
	}

	public void setCommentContent(String commentContent) {
		this.commentContent = commentContent;
	}

	public String getCommentAgent() {
		return commentAgent;
	}

	public void setCommentAgent(String commentAgent) {
		this.commentAgent = commentAgent;
	}

	public String getCommentIp() {
		return commentIp;
	}

	public void setCommentIp(String commentIp) {
		this.commentIp = commentIp;
	}

	public Date getCommentCreateTime() {
		return commentCreateTime;
	}

	public void setCommentCreateTime(Date commentCreateTime) {
		this.commentCreateTime = commentCreateTime;
	}

	public Integer getCommentRole() {
		return commentRole;
	}

	public void setCommentRole(Integer commentRole) {
		this.commentRole = commentRole;
	}

	public Article getArticle() {
		return article;
	}

	public void setArticle(Article article) {
		this.article = article;
	}

//父级 评论id
 private Integer commentPid;

 //评论人名字
 private String commentPname;

 //被评论的文章id
 private Integer commentArticleId;

		//主论人
 private String commentAuthorName;

 //评论人邮箱
 private String commentAuthorEmail;

 //评论人网址
 private String commentAuthorUrl;

 //类似 http://cn.gravatar.com/avatar/3ae8728fec3cd5cbfe99c4b966695f03?s=128&d=identicon&r=PG 指向??个头象地??
 private String commentAuthorAvatar;

 //评论内容
 private String commentContent;

		//评论人的代理
 private String commentAgent;

 //评论人ip
 private String commentIp;

 //评论时间
 private Date commentCreateTime;

 //角色(管理员 0，访问者0)
 private Integer commentRole;

 //非数据库字段,表示评论的文章是哪个
 private Article article;
}
