<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %> 
<%@ taglib  prefix="spring" uri="http://www.springframework.org/tags" %>   
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">

<title>EveryDay GYM > JOIN</title>

<script type="text/javascript" src="<spring:url value='/resources/js/jquery-3.6.0.js'/>"></script>
<script type="text/javascript" src="<spring:url value='/resources/js/bootstrap.bundle.js'/>"></script>
<script type="text/javascript" src="<spring:url value='/resources/js/joinForm.js'/>"></script>
<link rel="stylesheet" type="text/css" href="<spring:url value='/resources/css/joinForm.css'/>">
<link rel="stylesheet" type="text/css" href="<spring:url value='/resources/css/bootstrap.css'/>">
<link href="https://fonts.googleapis.com/css?family=M+PLUS+Rounded+1c" rel="stylesheet">
</head>
<body>
	
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="${pageContext.request.contextPath}/">EveryDay GYM</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDarkDropdown">
      <ul class="navbar-nav">
      </ul>
    </div>
  </div>
</nav>

<div id="picture"></div>

<div id="outWrapper">
	<form action="join" id="joinForm" method="POST">
		<div class="input-group mb-3">
 		 	<span class="input-group-text" id="basic-addon1">ID</span>
  			<input type="text" class="form-control" id="user_id" name="user_id" placeholder="IDは5文字以上、12文字以下に入力してください" aria-label="user_id" aria-describedby="basic-addon1">
  			<input type="button" id="idDoubleCheckButton" class="btn btn-secondary" value="ID重複確認" disabled="disabled">
  		</div>
  		<div class="input-group mb-3">	
  			<span class="input-group-text" id="basic-addon2">Password</span>
  			<input type="password" class="form-control" id="user_pwd" name="user_pwd" placeholder="Passwordは5文字以上、12文字以下に入力してください" aria-label="user_pwd" aria-describedby="basic-addon2">
		</div>
		<div class="input-group mb-3">	
  			<span class="input-group-text" id="basic-addon3">Name</span>
  			<input type="text" class="form-control" id="user_nm" name="user_nm" placeholder="空白無しで、フルネームを入力してください" aria-label="user_pwd" aria-describedby="basic-addon3">
		</div>
		<div class="input-group mb-3">	
  			<span class="input-group-text" id="basic-addon4">携帯番号</span>
  			<input type="text" class="form-control" id="user_phone" name="user_phone" placeholder="携帯番号は数字だけ、入力してください" aria-label="user_phone" aria-describedby="basic-addon4">
		</div>
		<div>
			<input type="radio" class="btn-check" name="gender" id="male" autocomplete="off" value=0>
			<label class="btn btn-outline-success" for="male" id= "labelForMale">男性</label>
			<input type="radio" class="btn-check" name="gender" id="female" autocomplete="off" value=1>
			<label class="btn btn-outline-success" for="female" id= "labelForFemale">女性</label>		
		</div>
	</form>
</div>	

<div id="joinButtonDiv">
	<input type="button" class="btn btn-secondary btn-lg" id = "joinButton" value="フォームを完成させてください！" onclick="formCheck();">
</div>

</body>
</html>