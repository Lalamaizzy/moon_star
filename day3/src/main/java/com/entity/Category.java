package com.entity;

public class Category {
	public Category(){}
	public Category(Integer categoryId) {
		this.categoryId=categoryId;
	}
	private Integer categoryId;
	
    public Integer getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Integer categoryId) {
		this.categoryId = categoryId;
	}

	public Integer getCategoryPid() {
		return categoryPid;
	}

	public void setCategoryPid(Integer categoryPid) {
		this.categoryPid = categoryPid;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public String getCategoryDescription() {
		return categoryDescription;
	}

	public void setCategoryDescription(String categoryDescription) {
		this.categoryDescription = categoryDescription;
	}

	public Integer getCategoryOrder() {
		return categoryOrder;
	}

	public void setCategoryOrder(Integer categoryOrder) {
		this.categoryOrder = categoryOrder;
	}

	public String getCategoryIcon() {
		return categoryIcon;
	}

	public void setCategoryIcon(String categoryIcon) {
		this.categoryIcon = categoryIcon;
	}

	public Integer getArticleCount() {
		return articleCount;
	}

	public void setArticleCount(Integer articleCount) {
		this.articleCount = articleCount;
	}

	//分类的父级id
    private Integer categoryPid;

	//分类名称
    private String categoryName;

    //分类描述
    private String categoryDescription;

    //分类的顺序
    private Integer categoryOrder;

 	//分类的图标
    private String categoryIcon;

    //文章数量(非数据库字段)
    private Integer articleCount;

}
