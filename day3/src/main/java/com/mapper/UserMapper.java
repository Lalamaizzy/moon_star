package com.mapper;

import org.apache.ibatis.annotations.Param;

import com.entity.User;

public interface UserMapper {
	/**
	 * �û���¼
	 * @param userName �˺�
	 * @param password ����
	 * @return �û���Ϣ
	 */
	User login(@Param("userName") String userName ,@Param("password") String password);
}
