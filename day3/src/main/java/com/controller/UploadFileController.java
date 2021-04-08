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
 * �����ϴ�ͼƬ
 * 
 * @ResponseBody ���ע���ʾ���ص�����Ҫת��json��ʽ Ҫ�� tomcat �е�server.xml
 *               ��������ӳ��:<Context docBase="D:\yxy" path="/uploads"  reloadable="true" />         
 */
@Controller
@ResponseBody
public class UploadFileController {
	@RequestMapping("article/uploadImg")
	public String uploadFile(MultipartHttpServletRequest request) throws IllegalStateException, IOException {

		// imgFile ��������ǹ̶���,������ôд��
		MultipartFile file = request.getFile("imgFile");

		// ����һ��������ļ���
		String newName = UUID.randomUUID().toString();

		// ָ���ļ��ϴ��Ժ�,Ҫ�浽ʲôλ��
		File destFile = new File("D:\\yxy\\" + newName);

		file.transferTo(destFile);

		String path = "http://localhost:8080/uploads/" + newName;

		return "{\"error\":0,\"url\":\"" + path + "\"}";
	}

}
