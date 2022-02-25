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
<script type="text/javascript" src="<spring:url value='/resources/js/showFacility.js'/>"></script>
<link rel="stylesheet" type="text/css" href="<spring:url value='/resources/css/showFacility.css'/>">
<link rel="stylesheet" type="text/css" href="<spring:url value='/resources/css/bootstrap.css'/>">
<link href="https://fonts.googleapis.com/css?family=M+PLUS+Rounded+1c" rel="stylesheet">
</head>
<body>
	
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
  	<c:if test="${empty sessionScope.loginId}">
    	<a class="navbar-brand" href="${pageContext.request.contextPath}/">EveryDay GYM</a>
    </c:if>
    <c:if test="${!empty sessionScope.loginId}">
    	<a class="navbar-brand" href="${pageContext.request.contextPath}/afterLogin/">EveryDay GYM</a>
    </c:if>
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
          <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            施設
          </a>
          <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink1" id="secondUl">
            <li><a class="dropdown-item" href="${pageContext.request.contextPath}/facility/showFacility/">施設一覧</a></li>
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


<c:if test="${!empty sessionScope.loginId}">
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
</c:if>



<div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
	 <div class="carousel-indicators">
	   <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
	   <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
	   <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
	   <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
	 </div>
	 <div class="carousel-inner">
	   <div class="carousel-item active">
	     <img src="<spring:url value='/resources/images/shower_room.jpg'/>" class="d-block w-100" alt="...">
	     <div class="carousel-caption d-none d-md-block">
	       <h5>高級の素材が使われたシャワー施設</h5>
	       <p>多数のシャワー・ルームで、同時に40人利用可能！</p>
	     </div>
	   </div>
	   <div class="carousel-item">
	     <img src="<spring:url value='/resources/images/empty_gym1.jpg'/>" class="d-block w-100" alt="...">
	     <div class="carousel-caption d-none d-md-block">
	       <h5>東京都内の最大の規模！</h5>
	       <p>楽しく運動できる環境を目指しおります！</p>
	     </div>
	   </div>
	   <div class="carousel-item">
	     <img src="<spring:url value='/resources/images/empty_gym2.jpg'/>" class="d-block w-100" alt="...">
	     <div class="carousel-caption d-none d-md-block">
	       <h5>最高レベルの器具</h5>
	       <p>アメリカ製の器具で、効率よく運動ができます！</p>
	     </div>
	   </div>
	   <div class="carousel-item">
	     <img src="<spring:url value='/resources/images/empty_gym3.jpg'/>" class="d-block w-100" alt="...">
	     <div class="carousel-caption d-none d-md-block">
	       <h5 id=blackH5>三つの運動ルーム！</h5>
	       <p id=blackP>好きなルームで好きな運動を！</p>
	     </div>
	   </div>
	 </div>
	 <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
	   <span class="carousel-control-prev-icon" aria-hidden="true"></span>
	   <span class="visually-hidden">Previous</span>
	 </button>
	 <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
	   <span class="carousel-control-next-icon" aria-hidden="true"></span>
	   <span class="visually-hidden">Next</span>
	 </button>
	
	 
</div>

<div id="cardWrapper">

	<div class="card" style="width: 18rem;" id="card1">
	  	<img src="<spring:url value='/resources/images/gym_desk.jpg'/>" class="card-img-top">
	  	<div class="card-body">
	   	 	<h5 class="card-title">エントランスから素敵！</h5>
	    	<p class="card-text">気軽く、ご相談ください！</p>
	    	<a class="btn btn-outline-dark" id="forBiggerPic1">大きく見る</a>
	 	</div>
	</div>
	
	<div class="card" style="width: 18rem;" id="card2">
	  	<img src="<spring:url value='/resources/images/gym_coach.jpg'/>" class="card-img-top">
	  	<div class="card-body">
	   	 	<h5 class="card-title">運動自体を楽しむコーチ</h5>
	    	<p class="card-text">ご一緒、どうですか？</p>
	    	<a class="btn btn-outline-dark" id="forBiggerPic2">大きく見る</a>
	 	</div>
	</div>
	
</div>

<!-- Button trigger modal -->
<input type="button" id="modalTrigger1" value="Launch Modal" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal1">

<!-- Modal -->
<div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content" id="forTitleUpperColor">
      <div class="modal-header" id="forTitleColor">
        <h5 class="modal-title" id="exampleModalLabel">フロント・デスク</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" id="upperClose1"></button>
      </div>
      <div class="modal-body" id="innerContent1">
        <img alt="" src="<spring:url value='/resources/images/gym_desk.jpg'/>">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary btn-close-white" data-bs-dismiss="modal" id="lowerClose1">Close</button>
      </div>
    </div>
  </div>
</div>


<!-- Button trigger modal -->
<input type="button" id="modalTrigger2" value="Launch Modal" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal2">

<!-- Modal -->
<div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content" id="forTitleUpperColor">
      <div class="modal-header" id="forTitleColor">
        <h5 class="modal-title" id="exampleModalLabel">エナジェティックなコーチ</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" id="upperClose2"></button>
      </div>
      <div class="modal-body" id="innerContent2">
        <img alt="" src="<spring:url value='/resources/images/gym_coach.jpg'/>">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary btn-close-white" data-bs-dismiss="modal" id="lowerClose2">Close</button>
      </div>
    </div>
  </div>
</div>



<div id="picture"></div>
	
	
</body>
</html>