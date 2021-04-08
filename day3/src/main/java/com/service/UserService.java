package com.service;

import com.entity.User;

public interface UserService {
	/**
	 * 用户登录
	 * @param userName 账号
	 * @param password 密码
	 * @return 用户信息
	 */
	User login(String userName ,String password);
}
