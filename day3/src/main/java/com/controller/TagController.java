package com.controller;

import java.util.List;
import javax.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.entity.Tag;
import com.service.TagService;

/**
 * ����
*/
@Controller
@RequestMapping("/tag")
public class TagController {
	@Resource
	private TagService tagService;

	@RequestMapping(value = "", method = RequestMethod.GET)
	public String tag(ModelMap m) {
		// ��ǩ������Ϣ
		List<Tag> tagList = tagService.listTag();
		m.put("tagList", tagList);
		return "tag";
	}
	
	/**
	 * ��������
	*/
	@RequestMapping(value="")
	public String index(ModelMap m) {
		List<Tag> tagList=tagService.listTagCount(null);
		m.put("tagList", tagList);
		return"/tag";
	}
}
