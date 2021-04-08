package com.mapper;

import org.apache.ibatis.annotations.Param;

import com.entity.User;

public interface UserMapper {
	/**
	 * 用户登录
	 * @param userName 账号
	 * @param password 密码
	 * @return 用户信息
	 */
	User login(@Param("userName") String userName ,@Param("password") String password);
}
