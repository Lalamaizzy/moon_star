package com.controller;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

/**
 * 用于上传图片
 * 
 * @ResponseBody 这个注解表示返回的内容要转成json格式 要在 tomcat 中的server.xml
 *               中做如下映射:<Context docBase="D:\yxy" path="/uploads"  reloadable="true" />         
 */
@Controller
@ResponseBody
public class UploadFileController {
	@RequestMapping("article/uploadImg")
	public String uploadFile(MultipartHttpServletRequest request) throws IllegalStateException, IOException {

		// imgFile 这个名字是固定的,就是这么写的
		MultipartFile file = request.getFile("imgFile");

		// 生成一个随机的文件名
		String newName = UUID.randomUUID().toString();

		// 指明文件上传以后,要存到什么位置
		File destFile = new File("D:\\yxy\\" + newName);

		file.transferTo(destFile);

		String path = "http://localhost:8080/uploads/" + newName;

		return "{\"error\":0,\"url\":\"" + path + "\"}";
	}

}
