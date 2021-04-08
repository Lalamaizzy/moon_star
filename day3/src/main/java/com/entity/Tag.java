package com.entity;

public class Tag {

	// 自增ID
	private Integer tagId;
	public Integer getTagId() {
		return tagId;
	}

	public void setTagId(Integer tagId) {
		this.tagId = tagId;
	}

	public String getTagName() {
		return tagName;
	}

	public void setTagName(String tagName) {
		this.tagName = tagName;
	}

	public String getTagDescription() {
		return tagDescription;
	}

	public void setTagDescription(String tagDescription) {
		this.tagDescription = tagDescription;
	}

	public Integer getArticleCount() {
		return articleCount;
	}

	public void setArticleCount(Integer articleCount) {
		this.articleCount = articleCount;
	}

	// 标签名称
	private String tagName;

	// 标签描述
	private String tagDescription;

	// 文章数量(不是数据库字段)
	private Integer articleCount;

	private Integer tagCount;
	public Integer getTagCount(Integer n) {
		return tagCount;
	}

	public void setTagCount(Integer tagCount) {
		this.tagCount = tagCount;
	}

	public Tag() {
	}

	public Tag(Integer tagId) {
		this.tagId = tagId;
	}

	public Tag(Integer tagId, String tagName, String tagDescription, Integer articleCount) {
		this.tagId = tagId;
		this.tagName = tagName;
		this.tagDescription = tagDescription;
		this.articleCount = articleCount;
	}
}
