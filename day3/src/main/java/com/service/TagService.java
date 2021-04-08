package com.service;
							import java.util.List;

import com.entity.Article;
import com.entity.Tag;
							
							public interface TagService {
								/**
								 * 查询所有的标签
								 * 
								 * @return 标签列表
								 */
								List<Tag> listTag();
								List<Tag>listTagCount(Integer n);
							}
