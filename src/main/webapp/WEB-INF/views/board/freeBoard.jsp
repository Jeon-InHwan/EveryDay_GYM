<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %> 
<%@ taglib  prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>     
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">

<title>Welcome! EveryDay GYM</title>

<script type="text/javascript" src="<spring:url value='/resources/js/jquery-3.6.0.js'/>"></script>
<script type="text/javascript" src="<spring:url value='/resources/js/jquery-ui.js'/>"></script>
<script type="text/javascript" src="<spring:url value='/resources/js/bootstrap.bundle.js'/>"></script>
<script type="text/javascript" src="<spring:url value='/resources/js/freeBoard.js'/>"></script>
<link rel="stylesheet" type="text/css" href="<spring:url value='/resources/css/freeBoard.css'/>">
<link rel="stylesheet" type="text/css" href="<spring:url value='/resources/css/bootstrap.css'/>">
<link rel="stylesheet" type="text/css" href="<spring:url value='/resources/css/jquery-ui.css'/>">
<link rel="stylesheet" type="text/css" href="<spring:url value='/resources/css/jquery-ui.theme.css'/>">
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


<input type="hidden" id="hiddenManager" value="${sessionScope.manager}">

 
<div id="tableWrapper">

	<div id="searchDiv">
		<form id="searchForm" action="/board/freeBoard" method="GET">
			<select class="form-select form-select-sm" aria-label=".form-select-sm example" id="searchItem" name="searchItem">
			  <option value="freeboard_title" ${searchItem == 'freeboard_title' ? 'selected' : ''} >TITLE</option>
			  <option value="user_id" ${searchItem == 'user_id' ? 'selected' : ''}>WRITER</option>
			  <option value="freeboard_context" ${searchItem == 'freeboard_context' ? 'selected' : ''}>CONTENT</option>
			</select>
			<input type="text" name="searchWord" value="${searchWord}">
			<input type="hidden" name="page" id="page" value="">
			<input type="button" class="btn btn-secondary btn-sm" value="検索" onclick="search(1)"><br>
		</form>
	</div>

	<div id="tableDiv"> 
		<table class="table table-dark table-hover" id="freeBoardTable">
			<tr>
				<th>NO</th>
				<th>ID</th>
				<th>TITLE</th>
				<th>検索数</th>
				<th>登録日</th>
			</tr>
			<c:set var="num" value="${navi.totalRecordsCount - ((navi.currentPage-1)*10)}"/>
			<c:forEach var="free" items="${list}" varStatus="stat">
				<tr class="forClick">
					<td >${num}</td>
					<c:choose>
						<c:when test="${free.user_id == 'Manager'}">
							<td><span class="badge bg-primary">Manager</span></td>
						</c:when>
						<c:when test="${sessionScope.loginId != free.user_id}">
							<td>${free.user_id}</td>
						</c:when>
						<c:otherwise>
							<td><span class="badge bg-secondary">Me</span></td>
						</c:otherwise>
					</c:choose>
					<td>${free.freeboard_title}</td>
					<td>${free.freeboard_hits}</td>
					<td>${free.freeboard_indate}</td>
					<td class="hidden_td">${free.freeboard_num}</td>
					<td class="hidden_td"><input type="hidden" value="${free.freeboard_num}"></td>
				</tr>
			<c:set var="num" value="${num-1}"></c:set>	
			</c:forEach>
			
		</table>
	</div>
</div>


<div id = "pagenationDiv">

	<nav aria-label="Page navigation example" id="pagenationNaV">
	  <ul class="pagination" id="pagination">
	    <li class="page-item">
	      <a class="page-link" href="javascript:search(${navi.currentPage - 1});" aria-label="Previous">
	        <span aria-hidden="true">&laquo;</span>
	      </a>
	    </li>
	    <c:forEach var="num" begin="${navi.startPageGroup}" end="${navi.endPageGroup}">
			<c:choose>
				<c:when test="${navi.currentPage == num}">
					<li class="page-item"><a id="hilightCurrent" class="page-link" href="javascript:search(${num});">${num}</a></li>
				</c:when>
				<c:otherwise>
					<li class="page-item"><a class="page-link" href="javascript:search(${num});">${num}</a></li>
				</c:otherwise>
			</c:choose>
		</c:forEach>
	    <li class="page-item">
	      <a class="page-link" href="javascript:search(${navi.currentPage + 1});" aria-label="Next">
	        <span aria-hidden="true">&raquo;</span>
	      </a>
	    </li>
	  </ul>
	</nav>
	
</div>

	<div id="buttonDiv">
		<input type="button" id="writeButton" class="btn btn-secondary btn-lg" value="掲示板作成">
	</div>


<!-- Button trigger modal -->
<input type="button" id="modalTrigger" value="Launch Modal" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">

<!-- Modal -->
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
    <div class="modal-content" id="forTitleUpperColor">
      <div class="modal-header" id="forTitleColor">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" id="upperClose"></button>
      </div>
      <div class="modal-body" id="innerContent1">
	  	
      </div>
      <div class="modal-body" id="innerContent3">
        
      </div>
      <div class="modal-body" id="innerContent4">
      
      </div>	
      <div class="modal-footer">
      	<input type="button" class="btn btn-primary btn-close-white" value="コメント作成" id="modal_writeReplyButton" data-bs-target="#exampleModalToggle4" data-bs-toggle="modal" data-bs-dismiss="modal">
      	<input type="button" class="btn btn-primary btn-close-white" value="削除" id="modal_DeleteButton" data-bs-target="#exampleModalToggle3" data-bs-toggle="modal" data-bs-dismiss="modal">
      	<input type="button" class="btn btn-primary btn-close-white" value="修正" id="modal_updateButton" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" data-bs-dismiss="modal">
        <input type="button" class="btn btn-secondary btn-close-white" data-bs-dismiss="modal" id="lowerClose" value="Close">
        <input type="hidden" id="hiddenLoginedId" value="${sessionScope.loginId}">
      </div>
    </div>
  </div>
</div>


<div class="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered modal-xl">
    <div class="modal-content" id="forTitleUpperColor2">
      <div class="modal-header" id="forTitleColor2">
        <h5 class="modal-title" id="exampleModalToggleLabel2">修正</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" id="upperClose2"></button>
      </div>
      <div class="modal-body">
      	<form action="#" id="NotDifined" method=POST>
      		<input type="hidden" name="freeboard_num" id="update_num">
			<input type="hidden" value="${sessionScope.loginId}" name="user_id" id="user_id">
			<input type="hidden" id="update_indate">
			<input type="hidden" id="update_hits">
			<div id="modal_updateWrapper">
				<div id="modal_updateDiv"> 
					<table class="table table-dark table-hover" id="modal_writeFormTable">
						<tr>
							<th>ID</th>
							<td id="updateId">${sessionScope.loginId}</td>
						</tr>
						<tr>
							<th>TITLE</th>
							<td>
								<div class="input-group mb-3">	
		  							<input type="text" class="form-control" name="freeboard_title" id="update_title" aria-label="freeboard_title" aria-describedby="basic-addon1">
		  						</div>
							</td>
						</tr>
						<tr>
							<th>CONTENT</th>
							<td id="updateContentTd">
								<div class="form-floating">
		  							<textarea class="form-control" name = "freeboard_context"  id="update_context" wrap="hard"></textarea>
								</div>
							</td>
						</tr>
					</table>
				</div>
			</div>
		</form>
      </div>
      <div class="modal-footer">
     	 <input type="button" class="btn btn-secondary btn-close-white" id="updateButton" value="修正">
     	 <input type="button" class="btn btn-secondary btn-close-white" data-bs-dismiss="modal" id="lowerClose2" value="Close">
      </div>
    </div>
  </div>
</div>




<div class="modal fade" id="exampleModalToggle3" aria-hidden="true" aria-labelledby="exampleModalToggleLabel3" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered modal-sm">
    <div class="modal-content" id="forTitleUpperColor3">
      <div class="modal-header" id="forTitleColor3">
        <h5 class="modal-title" id="exampleModalToggleLabel3">削除</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" id="upperClose3"></button>
      </div>
      <div class="modal-body" id="forDeleteBody">
      	本当に削除しますか？
      </div>
      <div class="modal-footer">
     	 <input type="button" class="btn btn-secondary btn-close-white" id="deleteButton" value="削除">
     	 <input type="button" class="btn btn-secondary btn-close-white" data-bs-dismiss="modal" id="lowerClose3" value="いいえ">
      </div>
    </div>
  </div>
</div>




<div class="modal fade" id="exampleModalToggle4" aria-hidden="true" aria-labelledby="exampleModalToggleLabel4" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered modal-xl">
    <div class="modal-content" id="forTitleUpperColor4">
      <div class="modal-header" id="forTitleColor4">
        <h5 class="modal-title" id="exampleModalToggleLabel4">コメント作成</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" id="upperClose4"></button>
      </div>
      <div class="modal-body">
      	<input type="hidden" name="freeboard_num" id="writeReply_freeboardnum">
		<input type="hidden" value="${sessionScope.loginId}" name="user_id" id="user_id">
		<div id="modal_writeReplyWrapper">
			<div id="modal_writeReplyDiv"> 
				<table class="table table-dark table-hover" id="modal_writeReplyTable">
					<tr>
						<th id="writeReplyTableIdTh">ID</th>
						<td id="writeReplyId">${sessionScope.loginId}</td>
					</tr>
					<tr>
						<th id="writeReplyTableContentTh">コメント</th>
						<td id="updateContentTd">
							<div class="form-floating">
		  						<textarea class="form-control" name = "freeboard_replytext"  id="freeboard_replytext" wrap="hard"></textarea>
							</div>
						</td>
					</tr>
				</table>
			</div>
		</div>
      </div>
      <div class="modal-footer">
     	 <input type="button" class="btn btn-secondary btn-close-white" id="writeReplyButton" value="コメント作成">
     	 <input type="button" class="btn btn-secondary btn-close-white" data-bs-dismiss="modal" id="lowerClose4" value="Close">
      </div>
    </div>
  </div>
</div>




<div class="modal fade" id="exampleModalToggle5" aria-hidden="true" aria-labelledby="exampleModalToggleLabel5" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered modal-xl">
    <div class="modal-content" id="forTitleUpperColor5">
      <div class="modal-header" id="forTitleColor5">
        <h5 class="modal-title" id="exampleModalToggleLabel5">コメント修正／コメント削除</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" id="upperClose5"></button>
      </div>
      <div class="modal-body" id="forDeleteBody">
      	<div id="modal_updateReplyWrapper">
			<div id="modal_updateReplyDiv"> 
				<table class="table table-dark table-hover" id="modal_updateReplyTable">
					<tr>
						<th id="updateReplyTableIdTh">ID</th>
						<td id="updateReplyId">${sessionScope.loginId}</td>
					</tr>
					<tr>
						<th id="updateReplyTableContentTh">コメント</th>
						<td id="updateReplyContentTd">
							<div class="form-floating">
		  						<textarea class="form-control" name = "freeboard_replytext"  id="freeboard_replytext_update" wrap="hard"></textarea>
							</div>
						</td>
					</tr>
				</table>
			</div>
		</div>
      	<input type="hidden" value="${sessionScope.loginId}" id="loginIdforToggle5">
      	<input type="hidden" id="freeboard_numforToggle5">
      </div>
      <div class="modal-footer">
     	 <input type="button" class="btn btn-secondary btn-close-white" id="updateReplyButton" value="修正">
     	 <input type="button" class="btn btn-secondary btn-close-white" id="deleteReplyButton" value="削除">
     	 <input type="button" class="btn btn-secondary btn-close-white" data-bs-dismiss="modal" id="lowerClose5" value="Close">
      </div>
    </div>
  </div>
</div>







</body>
</html>