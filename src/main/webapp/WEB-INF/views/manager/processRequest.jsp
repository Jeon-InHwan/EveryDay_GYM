<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %> 
<%@ taglib  prefix="spring" uri="http://www.springframework.org/tags" %> 
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>   
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">

<title>EveryDay GYM !Manager!</title>

<script type="text/javascript" src="<spring:url value='/resources/js/jquery-3.6.0.js'/>"></script>
<script type="text/javascript" src="<spring:url value='/resources/js/bootstrap.bundle.js'/>"></script>
<script type="text/javascript" src="<spring:url value='/resources/js/processRequest.js'/>"></script>
<link rel="stylesheet" type="text/css" href="<spring:url value='/resources/css/processRequest.css'/>">
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


<div id="tableWrapper">

	<div id="searchDiv">
		<form id="searchForm" action="/manager/processRequest" method="GET">
			<select class="form-select form-select-sm" aria-label=".form-select-sm example" id="searchItem" name="searchItem">
			  <option value= 3 ${searchItem == 3 ? 'selected' : ''} >All</option>
			  <option value= 0 ${searchItem == 0 ? 'selected' : ''} >未承認</option>
			  <option value= 1 ${searchItem == 1 ? 'selected' : ''}>処理完了</option>
			</select>
			<input type="text" name="searchWord" value="${searchWord}" placeholder="ID検索欄">
			<input type="hidden" name="page" id="page" value="">
			<input type="button" class="btn btn-secondary btn-sm" value="検索" onclick="search(1)"><br>
		</form>
	</div>

	
	
	<table class="table table-hover" id="processMembershipTable">
		
		<tr>
			<th>NO</th>
			<th>ID</th>
			<th>会員権種類</th>
			<th>処理状態</th>
			<th></th>
		</tr>
		<c:set var="num" value="${navi.totalRecordsCount - ((navi.currentPage-1)*10)}"/>
		<c:forEach var="request" items="${list}" varStatus="stat">
				<tr class="forClick">
					<td >${num}</td>
					<td>${request.user_id}</td>
					<td><span>${request.membership_month}</span>ヶ月券</td>
					<c:choose>
						<c:when test="${request.membership_processed == 0}">
							<td>未承認</td>
						</c:when>
						<c:otherwise>
							<td>処理完了</td>
						</c:otherwise>
					</c:choose>
					<td>
					<c:choose>
						<c:when test="${request.membership_processed == 0}">
							<input type="button" class="btn btn-secondary approvalButton" value="承認">
						</c:when>
						<c:otherwise>
							<td>
							</td>
						</c:otherwise>
					</c:choose>
					</td>
					<td class="hidden_td"><input type="hidden" value="${request.membership_num}"></td>
				</tr>
			<c:set var="num" value="${num-1}"></c:set>	
			</c:forEach>
			
	</table>
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



<!-- Button trigger modal -->
<input type="button" id="modalTrigger" value="Launch Modal" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">

<!-- Modal -->
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
    <div class="modal-content" id="forTitleUpperColor">
      <div class="modal-header" id="forTitleColor">
        <h5 class="modal-title" id="exampleModalLabel">会員権リクエスト処理</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" id="upperClose"></button>
      </div>
      <div class="modal-body" id="innerContent1">
	  	
      </div>
      <div class="modal-footer">
      	<input type="button" class="btn btn-primary btn-close-white" value="承認" id="modal_processRequestButton">
        <input type="button" class="btn btn-secondary btn-close-white" data-bs-dismiss="modal" id="lowerClose" value="Close">
        <input type="hidden" id="hidden_membership_num">
        <input type="hidden" id="hidden_membership_month">
        <input type="hidden" id="hidden_user_id">
      </div>
    </div>
  </div>
</div>



	
</body>
</html>