<%@ page language="java" import="java.util.*"
	contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.rapid-framework.org.cn/rapid" prefix="rapid"%>
<rapid:override name="frame-content">
	<div class="layui-layout layui-layout-admin">
		<div class="layui-body">
			<!-- 内容主体区域 -->
			<div style="padding: 15px;">
				<blockquote class="layui-elem-quote">
					<span class="layui-breadcrumb" lay-separator="/"> <a
						href="/admin">首页</a> <a><cite>标签列表</cite></a>
					</span>
				</blockquote>
				<div class="layui-row">
					<div class="layui-col-md4">
						<form class="layui-form" method="post" id="myForm"
							action="/admin/tag/insertSubmit">
							<div class="layui-form-item">
								<div class="layui-input-block">
									<strong>添加标签</strong>
								</div>
								<div class="layui-input-block">
									名称 <span style="color: #FF5722;">*</span> <input type="text"
										name="tagName" placeholder="请输入标签名称" autocomplete="off"
										class="layui-input" required>
								</div>
								<br>
								<div class="layui-input-block">
									标签描述 <input type="text" name="tagDescription"
										placeholder="请输入标签描述" autocomplete="off" class="layui-input">
								</div>
								<br>
								<div class="layui-input-block">
									<button class="layui-btn" lay-filter="formDemo" type="submit">添加</button>
								</div>
							</div>
						</form>
						<blockquote class="layui-elem-quote layui-quote-nm">
							温馨提示：
							<ul>
								<li>1、标签名必选，建议不要太长</li>
								<li>2、标签名勿重复</li>
							</ul>
						</blockquote>
					</div>
					<div class="layui-col-md8">
						<table class="layui-table">
							<colgroup>
								<col width="300">
								<col width="50">
								<col width="100">
								<col width="50">
							</colgroup>
							<thead>
								<tr>
									<th>名称</th>
									<th>文章数</th>
									<th>操作</th>
									<th>ID</th>
								</tr>
							</thead>
							<tbody>
								<c:forEach var="b" items="${tagList}">
									<tr>
										<td><a href="/tag/${b.tagId}" target="_blank">
												${b.tagName} </a></td>
										<td><a href="/tag/${b.tagId}" target="_blank">
											${b.tagId}</a></td>
										<td><a href="/admin/tag/edit/${b.tagId}"
											class="layui-btn layui-btn-mini">编辑</a> <a
											href="/admin/tag/delete/${b.tagId}"
											class="layui-btn layui-btn-danger layui-btn-mini"
											onclick="return confirmDelete()">删除</a></td>
										<td>${b.tagId}</td>
									</tr>
								</c:forEach>
							</tbody>
						</table>
						<blockquote class="layui-elem-quote layui-quote-nm">
							温馨提示：
							<ul>
								<li>如果该标签包含文章，将不可删除</li>
							</ul>
						</blockquote>
					</div>
				</div>
			</div>
		</div>

		<div class="layui-footer">
			<!-- 底部固定区域 -->
			© © 这里展示一些提示性信息 <a href="#" target="_blank">其他导航</a> / <a href="#"
				target="_blank">其他导航</a>
		</div>
	</div>

	<style>
/*覆盖 layui*/
.layui-body {
	margin-top: -30px;
	margin-left: -100px
}

.layui-form {
	margin-left: 100px
}

.layui-input-block {
	margin: 0px 10px;
}

.layui-table {
	margin-top: 0;
}

.layui-col-md4 {
	padding: 10px;
}

.layui-col-md8 {
	padding: 10px;
}

.layui-btn {
	margin: 2px 0 !important;
}
</style>
	<link rel="stylesheet" href="static/plugin/layui/css/layui.css">
	<link rel="stylesheet" href="static/css/back.css">
	<link rel="stylesheet"
		href="static/plugin/font-awesome/css/font-awesome.min.css">
	<script src="static/js/jquery.min.js"></script>
	<script src="static/plugin/layui/layui.all.js"></script>
	<script src="static/js/back.js"></script>



</rapid:override>
<%@ include file="./framework.jsp"%>