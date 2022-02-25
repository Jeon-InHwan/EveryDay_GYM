<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %> 
<%@ taglib  prefix="spring" uri="http://www.springframework.org/tags" %>   
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">

<title>EveryDay GYM WORKOUT</title>

<script type="text/javascript" src="<spring:url value='/resources/js/jquery-3.6.0.js'/>"></script>
<script type="text/javascript" src="<spring:url value='/resources/js/bootstrap.bundle.js'/>"></script>
<script type="text/javascript" src="<spring:url value='/resources/js/workoutRecordingHome.js'/>"></script>
<link rel="stylesheet" type="text/css" href="<spring:url value='/resources/css/workoutRecordingHome.css'/>">
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



<div id="cardWrapper1">

	<div class="card" style="width: 18rem;" id="card1">
	  	<img src="<spring:url value='/resources/images/benchpress.jpg'/>" class="card-img-top">
	  	<div class="card-body">
	   	 	<h5 class="card-title">BenchPress</h5>
	    	<a class="btn btn-outline-dark" id="writeBenchpressRecord">BenchPress 記録作成！</a>
	 	</div>
	</div>
	
	<div class="card" style="width: 18rem;" id="card2">
	  	<img src="<spring:url value='/resources/images/deadlift.jpg'/>" class="card-img-top">
	  	<div class="card-body">
	   	 	<h5 class="card-title">DeadLift</h5>
	    	<a class="btn btn-outline-dark" id="writeDeadLiftRecord">DeadLift 記録作成！</a>
	 	</div>
	</div>
	
	<div class="card" style="width: 18rem;" id="card3">
	  	<img src="<spring:url value='/resources/images/squat.jpg'/>" class="card-img-top">
	  	<div class="card-body">
	   	 	<h5 class="card-title">Squat</h5>
	    	<a class="btn btn-outline-dark" id="writeSquatRecord">Squat 記録作成！</a>
	 	</div>
	</div>
	
</div>



<!--  
<div id="cardWrapper2">

	<div class="card" style="width: 18rem;" id="card4">
	  	<img src="<spring:url value='/resources/images/exercise_bike.jpg'/>" class="card-img-top">
	  	<div class="card-body">
	   	 	<h5 class="card-title">Fitness Bike</h5>
	    	<a class="btn btn-outline-dark" id="writeBikeRecord">Fitness Bike 記録作成！</a>
	 	</div>
	</div>
	
	<div class="card" style="width: 18rem;" id="card5">
	  	<img src="<spring:url value='/resources/images/pull_up.jpg'/>" class="card-img-top">
	  	<div class="card-body">
	   	 	<h5 class="card-title">Pull Up</h5>
	    	<a class="btn btn-outline-dark" id="writePullUpRecord">Pull Up 記録作成！</a>
	 	</div>
	</div>
	
	<div class="card" style="width: 18rem;" id="card6">
	  	<img src="<spring:url value='/resources/images/treadmill.jpg'/>" class="card-img-top">
	  	<div class="card-body">
	   	 	<h5 class="card-title">Treadmill</h5>
	    	<a class="btn btn-outline-dark" id="writeTreadmillRecord">Treadmill 記録作成！</a>
	 	</div>
	</div>
	
</div>
-->




<!-- BenchPress Button trigger modal -->
<input type="button" id="modalTrigger1" value="Launch Modal" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop1">

<!-- Modal -->
<div class="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
    <div class="modal-content" id="forTitleUpperColor">
      <div class="modal-header" id="forTitleColor">
        <h5 class="modal-title" id="exampleModalLabel">Bench Press 記録作成</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" id="upperClose"></button>
      </div>
      <div class="modal-body" id="innerContent1">
	  	
	  	<div id="recordInput">
	  		<label for="kg" id="labelForKg">KG</label>
	  		<input type="text" id="kg">
	  		<div id="TotalVolumeDiv">今日のトータル・ボリューム : <span id="TotalVolume"></span></div>
	  		<br>
	  		<span>X</span>
	  		<br>
	  		<label for="counts">Count</label>
	  		<input type="text" id="counts">
	  		<input type="button" value="入力" id="recordInputButton">
	  		<div id="TotalSetsDiv">今日のトータル・セット : <span id="TotalSets"></span></div>
	  	</div>
	  	
      </div>
      <div class="modal-body" id="innerContent2">
        
      </div>
      <div class="modal-footer">
      	<input type="button" class="btn btn-secondary btn-close-white" id="deleteWorkoutButton" value="削除">
        <input type="button" class="btn btn-secondary btn-close-white" data-bs-dismiss="modal" id="lowerClose" value="Close">
        <input type="hidden" id="hiddenLoginedId" value="${sessionScope.loginId}">
        <input type="hidden" id="workout_type" name="workout_type" value="benchpress">
      </div>
    </div>
  </div>
</div>



<!-- DeadLift Button trigger modal -->
<input type="button" id="modalTrigger_deadlift" value="Launch Modal" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop_deadlift">

<!-- Modal -->
<div class="modal fade" id="staticBackdrop_deadlift" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
    <div class="modal-content" id="forTitleUpperColor_deadlift">
      <div class="modal-header" id="forTitleColor_deadlift">
        <h5 class="modal-title" id="exampleModalLabel_deadlift">DeadLift 記録作成</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" id="upperClose_deadlift"></button>
      </div>
      <div class="modal-body" id="innerContent3">
	  	
	  	<div id="recordInput_deadlift">
	  		<label for="kg_deadlift" id="labelForKg_deadlift">KG</label>
	  		<input type="text" id="kg_deadlift">
	  		<div id="TotalVolumeDiv_deadlift">今日のトータル・ボリューム : <span id="TotalVolume_deadlift"></span></div>
	  		<br>
	  		<span>X</span>
	  		<br>
	  		<label for="counts_deadlift">Count</label>
	  		<input type="text" id="counts_deadlift">
	  		<input type="button" value="入力" id="recordInputButton_deadlift">
	  		<div id="TotalSetsDiv_deadlift">今日のトータル・セット : <span id="TotalSets_deadlift"></span></div>
	  	</div>
	  	
      </div>
      <div class="modal-body" id="innerContent4">
        
      </div>
      <div class="modal-footer">
      	<input type="button" class="btn btn-secondary btn-close-white" id="deleteWorkoutButton_deadlift" value="削除">
        <input type="button" class="btn btn-secondary btn-close-white" data-bs-dismiss="modal" id="lowerClose_deadlift" value="Close">
        <input type="hidden" id="hiddenLoginedId_deadlift" value="${sessionScope.loginId}">
        <input type="hidden" id="workout_type_deadlift" name="workout_type" value="deadlift">
      </div>
    </div>
  </div>
</div>



<!-- DeadLift Button trigger modal -->
<input type="button" id="modalTrigger_squat" value="Launch Modal" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop_squat">

<!-- Modal -->
<div class="modal fade" id="staticBackdrop_squat" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
    <div class="modal-content" id="forTitleUpperColor_squat">
      <div class="modal-header" id="forTitleColor_squat">
        <h5 class="modal-title" id="exampleModalLabel_squat">Squat 記録作成</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" id="upperClose_squat"></button>
      </div>
      <div class="modal-body" id="innerContent5">
	  	
	  	<div id="recordInput_squat">
	  		<label for="kg_squat" id="labelForKg_squat">KG</label>
	  		<input type="text" id="kg_squat">
	  		<div id="TotalVolumeDiv_squat">今日のトータル・ボリューム : <span id="TotalVolume_squat"></span></div>
	  		<br>
	  		<span>X</span>
	  		<br>
	  		<label for="counts_squat">Count</label>
	  		<input type="text" id="counts_squat">
	  		<input type="button" value="入力" id="recordInputButton_squat">
	  		<div id="TotalSetsDiv_squat">今日のトータル・セット : <span id="TotalSets_squat"></span></div>
	  	</div>
	  	
      </div>
      <div class="modal-body" id="innerContent6">
        
      </div>
      <div class="modal-footer">
      	<input type="button" class="btn btn-secondary btn-close-white" id="deleteWorkoutButton_squat" value="削除">
        <input type="button" class="btn btn-secondary btn-close-white" data-bs-dismiss="modal" id="lowerClose_squat" value="Close">
        <input type="hidden" id="hiddenLoginedId_squat" value="${sessionScope.loginId}">
        <input type="hidden" id="workout_type_squat" name="workout_type" value="squat">
      </div>
    </div>
  </div>
</div>


	
</body>
</html>