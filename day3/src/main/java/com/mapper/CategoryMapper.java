package com.mapper;
							import java.util.List;
							import com.entity.Category;
							
							public interface CategoryMapper {
									
								/**
								 * 查询所有的分类
								 * @return 分类列表
								 */
								List<Category> listCategory();
								
								
								/**
								 * 根据父类分类的id,查询下面有哪些子级分类
								 * @param parentId 父级id
								 * @return 子级列表
								 */
								List<Category> listCategoryByParentId(Integer parentId);
							}
