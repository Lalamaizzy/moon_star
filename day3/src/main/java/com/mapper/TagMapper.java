package com.mapper;
							import java.util.List;
							import com.entity.Tag;
							
							public interface TagMapper {
								/**
								 * 查询所有的标签
								 * 
								 * @return 标签列表
								 */
								List<Tag> listTag();
							}
