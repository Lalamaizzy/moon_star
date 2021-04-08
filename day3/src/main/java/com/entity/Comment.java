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

//���� ����id
 private Integer commentPid;

 //����������
 private String commentPname;

 //�����۵�����id
 private Integer commentArticleId;

		//������
 private String commentAuthorName;

 //����������
 private String commentAuthorEmail;

 //��������ַ
 private String commentAuthorUrl;

 //���� http://cn.gravatar.com/avatar/3ae8728fec3cd5cbfe99c4b966695f03?s=128&d=identicon&r=PG ָ��??��ͷ���??
 private String commentAuthorAvatar;

 //��������
 private String commentContent;

		//�����˵Ĵ���
 private String commentAgent;

 //������ip
 private String commentIp;

 //����ʱ��
 private Date commentCreateTime;

 //��ɫ(����Ա 0��������0)
 private Integer commentRole;

 //�����ݿ��ֶ�,��ʾ���۵��������ĸ�
 private Article article;
}
