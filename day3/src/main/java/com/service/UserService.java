package com.service;

import com.entity.User;

public interface UserService {
	/**
	 * �û���¼
	 * @param userName �˺�
	 * @param password ����
	 * @return �û���Ϣ
	 */
	User login(String userName ,String password);
}
