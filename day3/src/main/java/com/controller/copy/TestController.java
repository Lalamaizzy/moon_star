package com.controller.copy;

import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

public class TestController {
	@RequestMapping("/test")
	public String test(ModelMap m) {
		System.out.println("�������Ʋ�....�쵼�Ӽ�����...");
		
		m.put("msg", "�ҵ�springmvc������ͨ��");
		m.put("dog", "�Ҵӿ��Ʋ������һֻ��tom�Ĺ�");
		
		return "index";  //==>  /jsp/index.jsp
	}
}
