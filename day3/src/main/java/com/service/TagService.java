package com.service;
							import java.util.List;

import com.entity.Article;
import com.entity.Tag;
							
							public interface TagService {
								/**
								 * ��ѯ���еı�ǩ
								 * 
								 * @return ��ǩ�б�
								 */
								List<Tag> listTag();
								List<Tag>listTagCount(Integer n);
							}
