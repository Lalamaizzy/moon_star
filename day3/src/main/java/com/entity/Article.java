   package com.entity;

import java.util.Date;
import java.util.List;

public class Article {
			    //文章ID, 自增主键
			    private Integer articleId;
			
			    public Integer getArticleId() {
					return articleId;
				}

				public void setArticleId(Integer articleId) {
					this.articleId = articleId;
				}

				public Integer getArticleUserId() {
					return articleUserId;
				}

				public void setArticleUserId(Integer articleUserId) {
					this.articleUserId = articleUserId;
				}

				public String getArticleTitle() {
					return articleTitle;
				}

				public void setArticleTitle(String articleTitle) {
					this.articleTitle = articleTitle;
				}

				public Integer getArticleViewCount() {
					return articleViewCount;
				}

				public void setArticleViewCount(Integer articleViewCount) {
					this.articleViewCount = articleViewCount;
				}

				public Integer getArticleCommentCount() {
					return articleCommentCount;
				}

				public void setArticleCommentCount(Integer articleCommentCount) {
					this.articleCommentCount = articleCommentCount;
				}

				public Integer getArticleLikeCount() {
					return articleLikeCount;
				}

				public void setArticleLikeCount(Integer articleLikeCount) {
					this.articleLikeCount = articleLikeCount;
				}

				public Date getArticleCreateTime() {
					return articleCreateTime;
				}

				public void setArticleCreateTime(Date articleCreateTime) {
					this.articleCreateTime = articleCreateTime;
				}

				public Date getArticleUpdateTime() {
					return articleUpdateTime;
				}

				public void setArticleUpdateTime(Date articleUpdateTime) {
					this.articleUpdateTime = articleUpdateTime;
				}

				public Integer getArticleIsComment() {
					return articleIsComment;
				}

				public void setArticleIsComment(Integer articleIsComment) {
					this.articleIsComment = articleIsComment;
				}

				public Integer getArticleStatus() {
					return articleStatus;
				}

				public void setArticleStatus(Integer articleStatus) {
					this.articleStatus = articleStatus;
				}

				public Integer getArticleOrder() {
					return articleOrder;
				}

				public void setArticleOrder(Integer articleOrder) {
					this.articleOrder = articleOrder;
				}

				public String getArticleContent() {
					return articleContent;
				}

				public void setArticleContent(String articleContent) {
					this.articleContent = articleContent;
				}

				public String getArticleSummary() {
					return articleSummary;
				}

				public void setArticleSummary(String articleSummary) {
					this.articleSummary = articleSummary;
				}

				public User getUser() {
					return user;
				}

				public void setUser(User user) {
					this.user = user;
				}

				//创建文章的用户
			    private Integer articleUserId;
			
			    //文章标题
			    private String articleTitle;
			
			    //浏览次数
			    private Integer articleViewCount;
			
			    //回复次数
			    private Integer articleCommentCount;
			
			    //点赞次数
			    private Integer articleLikeCount;
			
			    //创建时间
			    private Date articleCreateTime;
			
			    //更新时间
			    private Date articleUpdateTime;
			
			    //是否回复
			    private Integer articleIsComment;
			
			    //状态(0,草稿,1 已发表)
			    private Integer articleStatus;
			
			    //排序
			    private Integer articleOrder;
			
			    //文章内容
			    private String articleContent;
			
			    //文章概述
			    private String articleSummary;
			    
			    //该文章属于哪些分类(大分类,小分类)
			    private List<Category> categoryList ;
			    
			  public List<Category> getCategoryList() {
					return categoryList;
				}

				public void setCategoryList(List<Category> categoryList) {
					this.categoryList = categoryList;
				}

				public List<Tag> getTagList() {
					return tagList;
				}

				public void setTagList(List<Tag> tagList) {
					this.tagList = tagList;
				}

				//该文章属于哪些标签
			    private List<Tag> tagList;
			    //用户
			    private User user;

				public Object getCategoryList;
			
			    //文章挂有哪些标签
			    //private List<Tag> tagList;
			
			    //文章属于哪些分类
			    //private List<Category> categoryList;
			    }