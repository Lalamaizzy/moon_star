<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
				<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
				<%@ taglib uri="http://www.rapid-framework.org.cn/rapid" prefix="rapid" %>
				<%
				String path = request.getContextPath();
				String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
				%>
				
				<!DOCTYPE html>
				<html lang="zh-CN">
				<head>
				 	<base href="<%=basePath%>">	
					<meta http-equiv="pragma" content="no-cache">
					<meta http-equiv="cache-control" content="no-cache">
					<meta http-equiv="expires" content="0">   
					
				    <meta charset="utf-8">
				    <link rel="shortcut icon" href="resources/img/logo.png">
				        
				    <title>后台</title>       
				           
				    <link rel="stylesheet" href="resources/plugin/layui/css/layui.css">
				    <link rel="stylesheet" href="resources/css/back.css">
				    <link rel="stylesheet" href="resources/plugin/font-awesome/css/font-awesome.min.css">
				   
				    <%--留给其他模块引入自已的样式或css --%>
				    <rapid:block name="frame-header-style"> </rapid:block>
				    <rapid:block name="frame-header-script"></rapid:block>
				
				</head>
				<body>
					<div class="layui-layout layui-layout-admin">
					    <div class="layui-header">
					        <div class="layui-logo">
					      	  <a href="/admin" style="color:#009688;"> 后台 </a>
					        </div>
					        <!-- 头部区域（可配合layui已有的水平导航） -->
					        <ul class="layui-nav layui-layout-left">
					            <li class="layui-nav-item"><a href="/" target="_blank">前台</a></li>
					            <li class="layui-nav-item">
					                <a href="javascript:;">新建</a>
					                <dl class="layui-nav-child">
					                    <dd><a href="/admin/article/insert">轨迹</a></dd>
					                    <dd><a href="/admin/page/insert">页面</a></dd>
					                    <dd><a href="/admin/category/insert">分类</a></dd>
					                    <dd><a href="/admin/notice/insert">公告</a></dd>
					                    <dd><a href="/admin/link/insert">链接</a></dd>
					                </dl>
					            </li>
					        </ul>
					        <ul class="layui-nav layui-layout-right">
					            <li class="layui-nav-item">
					                <a href="javascript:void(0);"><img src="resources//uploads/2017/10/20171006225356181.jpg" class="layui-nav-img">  admin</a>
					                <dl class="layui-nav-child">
					                    <dd><a href="/admin/user/profile">基本资料</a></dd>
					                </dl>
					            </li>
					            <li class="layui-nav-item">
					                <a href="/admin/logout">退出</a>
					            </li>
					        </ul>
					    </div>
					
					    <div class="layui-side layui-bg-black">
					        <div class="layui-side-scroll">
					            <!-- 左侧导航区域（可配合layui已有的垂直导航） -->
					            <ul class="layui-nav layui-nav-tree" >
					                <li class="layui-nav-item layui-nav-itemed">
					                    <a class="" href="javascript:;">轨迹</a>
					                    <dl class="layui-nav-child">
					                        <dd><a href="article">疫情地图</a></dd>
					                        <dd><a href="article/add">轨迹填报</a></dd>
					                        <dd><a href="category">全部分类</a></dd>
					                        <dd><a href="tag">全部标签</a></dd>
					                    </dl>
					                </li>
					                <li class="layui-nav-item">
					                    <a href="javascript:;">页面</a>
					                    <dl class="layui-nav-child">
					                        <dd><a href="page">全部页面</a></dd>
					                        <dd><a href="page/add">添加页面</a></dd>
					                    </dl>
					                </li>
					                <li class="layui-nav-item">
					                    <a class="" href="javascript:;"> 链接 </a>
					                    <dl class="layui-nav-child">
					                        <dd><a href="link">全部链接</a></dd>
					                        <dd><a href="link/add">添加链接</a></dd>
					                    </dl>
					                </li>
					                <li class="layui-nav-item">
					                    <a href="javascript:;">公告</a>
					                    <dl class="layui-nav-child">
					                        <dd><a href="notice">全部公告</a></dd>
					                        <dd><a href="notice/add">添加公告</a></dd>
					                    </dl>
					                </li>
					                <li class="layui-nav-item">
					                    <a href="comment">评论</a>
					                </li>
					                <li class="layui-nav-item">
					                    <a class="" href="javascript:;">用户 </a>
					                    <dl class="layui-nav-child">
					                        <dd><a href="user">全部用户</a></dd>
					                        <dd><a href="user/add">添加用户</a></dd>
					                    </dl>
					                </li>
					                <li class="layui-nav-item">
					                    <a href="javascript:;">设置</a>
					                    <dl class="layui-nav-child">
					                        <dd><a href="menu">菜单</a></dd>
					                        <dd><a href="options">主要选项</a></dd>
					                    </dl>
					                </li>
					            </ul>
					        </div>
					    </div>
					
					    <div class="layui-body">         
					        <div style="padding: 15px;">
					            <rapid:block name="frame-content">
					                       内容主体区域  不同的页面要分别进行不同的重写
					            </rapid:block>
					        </div>
					    </div>
					
					    <div class="layui-footer">
					        <!-- 底部固定区域 -->
					         ? 这里展示一些提示性信息 <a href="#" target="_blank">其他导航</a> / <a href="#" target="_blank">其他导航</a>
					    </div>
					</div>
					
					<script src="resources/js/jquery.min.js"></script>
					<script src="resources/plugin/layui/layui.all.js"></script>
					<script src="resources/js/back.js"></script>
					
					<%--留给其他模块引入自已的css --%>
					<rapid:block name="frame-footer-script">
					</rapid:block>
				</body>
				</html>
