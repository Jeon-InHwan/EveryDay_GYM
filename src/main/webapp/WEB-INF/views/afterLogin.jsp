<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %> 
<%@ taglib  prefix="spring" uri="http://www.springframework.org/tags" %>   
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">

<title>Welcome! EveryDay GYM</title>

<script type="text/javascript" src="<spring:url value='/resources/js/jquery-3.6.0.js'/>"></script>
<script type="text/javascript" src="<spring:url value='/resources/js/bootstrap.bundle.js'/>"></script>
<script type="text/javascript" src="<spring:url value='/resources/js/afterLogin.js'/>"></script>
<link rel="stylesheet" type="text/css" href="<spring:url value='/resources/css/afterLogin.css'/>">
<link rel="stylesheet" type="text/css" href="<spring:url value='/resources/css/bootstrap.css'/>">
<link href="https://fonts.googleapis.com/css?family=M+PLUS+Rounded+1c" rel="stylesheet">
</head>
<body>
	
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="${pageContext.request.contextPath}/afterLogin/">EveryDay GYM</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDarkDropdown">
      <ul class="navbar-nav">
        <li class="nav-item dropdown" id="firstLi">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            会員
          </a>
          <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink1" id="firstUl">
            <li><a class="dropdown-item" href="/member/joinForm">新規取得</a></li>
            <li><a class="dropdown-item" href="/membership/joinForm">会員権申請</a></li>
            <c:if test="${sessionScope.manager != 1}">
            <li><a class="dropdown-item" href="/member/withdrawal">会員脱退</a></li>
            </c:if>
            <c:if test="${sessionScope.manager == 1}">
            	<li><a class="dropdown-item" href="/manager/processRequest">会員権申請処理</a></li>
            </c:if>
            <c:if test="${sessionScope.manager == 1}">
            	<li><a class="dropdown-item" href="/manager/listMember">会員リスト</a></li>
            </c:if>
          </ul>
        </li>
        <li class="nav-item dropdown" id="secondLi">
          <a class="nav-link dropdown-toggle" href="/facility/showFacility" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            施設
          </a>
          <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink1" id="secondUl">
            <li><a class="dropdown-item" href="/facility/showFacility">施設一覧</a></li>
          </ul>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            掲示板
          </a>
          <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink2" id="thirdUl">
            <li><a class="dropdown-item" href="/board/freeBoard">自由掲示板</a></li>
          </ul>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            記録
          </a>
          <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink2" id="fourthUl">
            <li><a class="dropdown-item" href="/workout/workoutRecordingHome">運動記録作成</a></li>
            <li><a class="dropdown-item" href="/workout/showWorkoutRecording?user_id=${sessionScope.loginId}">運動記録確認</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
<div class="dropdown" id="dropdownId">
  <c:choose>
  	<c:when test="${sessionScope.manager == 0}">
  		<input type="button" class="btn btn-secondary dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" value="${sessionScope.loginNm}(${sessionScope.loginId})様">
  	</c:when>
  	<c:otherwise>
  		<button type="button" class="btn btn-secondary dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
  			${sessionScope.loginNm}<span class="position-absolute top-0 start-0 translate-middle badge rounded-pill bg-danger">Manager</span>
  		</button>
  	</c:otherwise>
  </c:choose>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" id="userUl">
    <li><a class="dropdown-item" href="/member/updateMemberForm?user_id=${sessionScope.loginId}">会員情報変更</a></li>
    <li><a class="dropdown-item" href="/member/logout">ログアウト</a></li>
  </ul>
</div>

<div id="picture"></div>

<div class="card" style="width: 18rem;" id="card1">
  <img src="<spring:url value='/resources/images/empty_gym1.jpg'/>" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">東京都内の最大の規模！</h5>
    <p class="card-text">初心者も、経験者も楽しく運動できる環境を目指しおります！</p>
    <a href="/facility/showFacility" class="btn btn-outline-dark">施設一覧</a>
  </div>
</div>

<div class="card" style="width: 18rem;" id="card2">
  <img src="<spring:url value='/resources/images/discount.jpg'/>" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">今、割引イベント<br>やってます！</h5>
    <p class="card-text">オープン記念割引20％</p>
    <a href="/membership/joinForm" class="btn btn-outline-dark">今、会員権登録！</a>
  </div>
</div>


	
</body>
</html>