package com.service;
								import java.util.List;
								import com.entity.Category;
								
								public interface CategoryService {
									/**
									 * ��ѯ���еķ���
									 * 
									 * @return �����б�
									 */
									List<Category> listCategory();
								
									/**
									 * ���ݸ�������id,��ѯ��������Щ�Ӽ�����
									 * 
									 * @param parentId ����id
									 * @return �Ӽ��б�
									 */
									List<Category> listCategoryByParentId(Integer parentId);
								}
