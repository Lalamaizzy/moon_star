package com.entity;

public class Tag {

	// ����ID
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

	// ��ǩ����
	private String tagName;

	// ��ǩ����
	private String tagDescription;

	// ��������(�������ݿ��ֶ�)
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
