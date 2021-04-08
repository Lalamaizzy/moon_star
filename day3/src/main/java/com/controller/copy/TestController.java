package com.controller.copy;

import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

public class TestController {
	@RequestMapping("/test")
	public String test(ModelMap m) {
		System.out.println("来过控制层....领导接见了我...");
		
		m.put("msg", "我的springmvc流程走通了");
		m.put("dog", "我从控制层领回来一只叫tom的狗");
		
		return "index";  //==>  /jsp/index.jsp
	}
}
