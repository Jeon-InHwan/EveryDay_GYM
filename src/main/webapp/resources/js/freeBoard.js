function loadJQuery() {
    var oScript = document.createElement("script");
    oScript.type = "text/javascript";
    oScript.charset = "utf-8";		  
    oScript.src = "/resources/js/jquery-3.6.0.js";	
    document.getElementsByTagName("head")[0].appendChild(oScript);
};


$(function(){
	
	var images = ['/resources/images/home_workout1.jpg',
	'/resources/images/home_workout2.jpg',
	'/resources/images/home_workout3.jpg',
	'/resources/images/home_workout4.jpg',
	'/resources/images/home_workout5.jpg',
	'/resources/images/home_workout6.jpg',
	'/resources/images/home_workout7.jpg',
	'/resources/images/home_workout8.jpg',
	'/resources/images/home_workout9.jpg',
	'/resources/images/home_workout10.jpg',
	'/resources/images/home_workout11.jpg',
	'/resources/images/home_workout12.jpg'];
  
    var i = 0;

    function changeBackground() {
        $('#picture').css('background-image', function() {
            if (i >= images.length) {
                i=0;
            }
            return 'url(' + images[i++] + ')';      
        });
    }
    // Call it on the first time
    changeBackground();
    // Set an interval to continue
    setInterval(changeBackground, 5000);
    
    
    $("#writeButton").on("click", function(){
		location.href = "/board/freeWriteForm";
	});
	
	
	$(".forClick").on("click", function(){
		
		let user_id = ($(this).find("td:eq(1)").text());
		let freeboard_num = ($(this).find("td:eq(5)").text());
		let logined_id = $("#hiddenLoginedId").val();
		let manager = $("#hiddenManager").val();


		$.ajax({
			url : "readFreeboard"
			, method : "POST"
			, data : {"freeboard_num" : freeboard_num}
			, success : function(data){
				
				showReply(freeboard_num);
				
				if(user_id == 'Me' || manager == 1){
					$("#modal_updateButton").css({"display" : "inline-block"});
					$("#modal_DeleteButton").css({"display" : "inline-block"});
				} else {
					$("#modal_updateButton").css({"display" : "none"});
					$("#modal_DeleteButton").css({"display" : "none"});
				}
				
				$("#exampleModalLabel").html("<span id='title'>" + data.freeboard_title + "</span>");
				$("#innerContent1").html("<pre id='context'>" + data.freeboard_context + "</pre>");
				$("#innerContent1").append("<div id='indateAndHits'><span id='indate'>" + data.freeboard_indate + "</span><br>???????????? <span id='hits'> " + data.freeboard_hits + "</span></div>");
				$("#innerContent3").html("<span id='num'>" + data.freeboard_num + "</span>");
				$("#modalTrigger").trigger("click");
					
			}
		});
		
		$("#upperClose").off("click").on("click", function(){
			
			let hits = $("#hits").text();
			let freeboard_num = $("#num").text();
			let td = $(".forClick").find("td:eq(6)");
		
			let selectedTd;
			
			console.log(td);
		
			for(var i = 0; i < td.length; i++) {
				console.log(td[i]);
				var temp = $(td[i]).children().val();
				console.log("?????? ???????????? ???????????? ??? ?????? hidden input ??? : " + temp);
				if(temp == freeboard_num) {
					selectedTd = $(td[i]);
				}
			}
				
			console.log(selectedTd);
	
			$("#innerContent1").text("");
			$("#innerContent2").text("");
			$("#innerContent3").text("");
			$(selectedTd).parent().find("td:eq(3)").text(hits);
	
		});	
		
		$("#lowerClose").off("click").on("click", function(){
			let hits = $("#hits").text();
			let freeboard_num = $("#num").text();
			let td = $(".forClick").find("td:eq(6)");
		
			let selectedTd;
			
			console.log("?????? ????????? td : " + td);
		
			for(var i = 0; i < td.length; i++) {
				console.log(td[i]);
				var temp = $(td[i]).children().val();
				console.log("?????? ?????? ?????? ????????? ????????? td : " + temp);
				if(temp == freeboard_num) {
					selectedTd = $(td[i]);
				}
			}
				
			console.log(selectedTd);
	
			$("#innerContent1").text("");
			$("#innerContent2").text("");
			$("#innerContent3").text("");
			$(selectedTd).parent().find("td:eq(3)").text(hits);
		});	
		
		
		$("#modal_updateButton").off("click").on("click", function(){
			let placeholder_title = $('#exampleModalLabel>#title').text();
			let placeholder_context = $('#context').text();
			let freeboard_num = $("#innerContent3").text();
			let freeboard_indate = $("#indate").text();
			let freeboard_hits = $("#hits").text();
			$("#update_title").attr("placeholder", placeholder_title);
			$("#update_context").attr("placeholder", placeholder_context);
			$("#update_num").val(freeboard_num);
			$("#update_indate").val(freeboard_indate);
			$("#update_hits").val(freeboard_hits);
		});		
		
		
		
		$("#updateButton").off("click").on("click", function(){
			
			let freeboard_num = $("#update_num").val();
			let freeboard_title = $("#update_title").val();
			let freeboard_context = $("#update_context").val();
			let freeboard_indate = $("#update_indate").val();
			let freeboard_hits = $("#update_hits").val();
			let td = $(".forClick").find("td:eq(6)");
			let selectedTd;
			
			// ?????????????????? ?????? ??????
			
			let today = new Date();   

			let year = today.getFullYear();
			let month = ('0' + (today.getMonth() + 1)).slice(-2);
			let day = ('0' + today.getDate()).slice(-2);

			let dateString = year + '-' + month  + '-' + day;
			
			if(freeboard_title.trim().length < 1) {
				alert("????????????????????????????????????");	
				return;
			}
	
			if(freeboard_context.trim().length < 1) {
				alert("??????????????????????????????");
				return;	
			}
			
			
			$.ajax({
			url : "/board/updateFreeboard"
			, method : "POST"
			, data : {"freeboard_num" : freeboard_num, 
					  "freeboard_title" : freeboard_title,
					  "freeboard_context" : freeboard_context}
			, success : function(data){
					if(!(data < 1)) {
						$("#exampleModalLabel").html("<span id='title'>" + freeboard_title + "</span>");
						$("#innerContent1").html("<pre id='context'>" + freeboard_context + "</pre><div id='indateAndHits'><span id='indate'>????????? : " + freeboard_indate + "</span><br>????????? : "+ dateString + "<br>???????????? <span id='hits'> " + freeboard_hits + "</span></div>");
						for(var i = 0; i < td.length; i++) {
							console.log(td[i]);
							var temp = $(td[i]).children().val();
							console.log("?????? ?????? ?????? ????????? ????????? td : " + temp);
							if(temp == freeboard_num) {
							selectedTd = $(td[i]);
							}
						}
				
						console.log(selectedTd);
						
						$("#update_num").val("");
						$("#update_title").val("");
						$("#update_context").val("");
						$("#update_indate").val("");
						$("#update_hits").val("");
						
						$(selectedTd).parent().find("td:eq(2)").html("<span id='title'>" + freeboard_title + "</span>");
						$(selectedTd).parent().find("td:eq(4)").html(dateString);
						
						$("#lowerClose2").trigger("click");
						
					} else {
						$("#update_num").val("");
						$("#update_title").val("");
						$("#update_context").val("");
						$("#update_indate").val("");
						$("#update_hits").val("");
						alert("??????????????????????????????????????????????????????????????????????????????????????????");
						$("#lowerClose2").trigger("click");
					}
				}
			});
			
			
		});
		
		
		$("#modal_DeleteButton").off("click").on("click", function(){
			
			$("#deleteButton").off("click").on("click", function(){
				let freeboard_num = $("#innerContent3").text();
				let td = $(".forClick").find("td:eq(6)");
				let selectedTd;
				
				$.ajax({
				url : "/board/deleteFreeboard"
				, method : "POST"
				, data : {"freeboard_num" : freeboard_num}
				, success : function(data){
						if(!(data < 1)) {
							
							for(var i = 0; i < td.length; i++) {
								console.log(td[i]);
								var temp = $(td[i]).children().val();
								console.log("?????? ?????? ?????? ????????? ????????? td : " + temp);
								if(temp == freeboard_num) {
								selectedTd = $(td[i]);
								}
							}
					
							console.log(selectedTd);
							
							$(selectedTd).parent().hide();
							$("#lowerClose3").trigger("click");
							$("#lowerClose").trigger("click");
							
						} else {
							alert("??????????????????????????????????????????????????????????????????????????????");
							$("#lowerClose3").trigger("click");
							$("#lowerClose").trigger("click");
						}
					}
				});
	
			});	
			
		});	
	
	
		$("#modal_writeReplyButton").off("click").on("click", function(){
			
			$("#writeReplyButton").off("click").on("click", function(){
				let freeboard_num = $("#innerContent3").text();
				let freeboard_replytext = $("#freeboard_replytext").val();
				
				
				$.ajax({
					url : "/freeboardReply/insertReply"
					, method : "POST"
					, data : {"freeboard_num" : freeboard_num, 
							  "freeboard_replytext" : freeboard_replytext,
							  "user_id" : logined_id}
					, success : function(data){
							if(!(data < 1)) {
								
								showReply(freeboard_num);
								$("#freeboard_replytext").val("");
								$("#lowerClose4").trigger("click");
						
							} else {
								alert("??????????????????????????????????????????????????????????????????????????????????????????");
								$("#freeboard_replytext").val("");
								$("#lowerClose4").trigger("click");
							}
						}
					});
				
				
			});	
				
		});
		
	
	});
	
});




function showReply(freeboard_num) {
	
	
	$.ajax({
		url : "/freeboardReply/selectAllReply"
		, method : "POST"
		, data : {"freeboard_num" : freeboard_num}
		, success :function(data){
				
			let result = '';
			if(data.length == 0){
				// data = [] ??? ??? ????????? ????????? ????????????!!
				result += '<div id="replyWrapper" class="modal-footer">';
				result += '<div id="replyDiv"> ';
				result += '<table class="table table-dark table-hover" id="replyTable">';
				result += '<tr>';
				result += '<th>ID</th>';
				result += '<th>????????????</th>';
				result += '<th>?????????</th>';
				result += '</tr>';
				result += '<tr>';
				result += '<td colspan="3">??????????????????????????????????????????????????????</td>';
				result += '</tr>';
				result += '</table>';
				result += '</div>';
				result += '</div>';
			} else {
				result += '<div id="replyWrapper" class="modal-footer">';
				result += '<div id="replyDiv"> ';
				result += '<table class="table table-dark table-hover" id="replyTable">';0
				result += '<tr>';
				result += '<th>ID</th>';
				result += '<th>????????????</th>';
				result += '<th>?????????</th>';
				result += '</tr>';
				$.each(data, function(index, item){
				result += '<tr class="forClickReplyTr" data-num="' + item.freeboard_replynum + '" data-id="' + item.user_id + '"  data-text="' + item.freeboard_replytext +  '">';
				result += 	'<td>' + item.user_id + '</td>';
				result += 	'<td id="preTd"><pre class="eachReplytext" >' + item.freeboard_replytext + '</pre></td>';
				result += 	'<td>' + item.freeboard_reply_indate + '</td>';
				result += '</tr>';
				});
				result += '</table>';
				result += '<div id="informationDiv"><span id="informationForDeleteAndUpdateReply">?????????????????????????????????????????????????????????</span></div>';
				result += '<input type="button" id="hiddenButtonForToggle5" data-bs-target="#exampleModalToggle5" data-bs-toggle="modal">'
				result += '</div>';
				result += '</div>';
			}
			
			$("#innerContent4").html(result);
			$(".eachReplytext").attr({"data-bs-toggle" : "tooltip",
				         			  "data-bs-placement" : "top",
				         			  "title" : "?????????????????????????????????????????????????????????"});
			$("#freeboard_numforToggle5").val(freeboard_num);
			$(".forClickReplyTr").on("click", updateAndRemoveReply);
		}

				
	});
	
}



function updateAndRemoveReply() {
	
	var freeboard_num = $("#freeboard_numforToggle5").val();
	var freeboard_replynum = $(this).attr("data-num");	
	var user_id = $(this).attr("data-id");	
	var freeboard_replytext = $(this).attr("data-text");	
	var loggedin_user_id = $("#loginIdforToggle5").val();
	let manager = $("#hiddenManager").val();
	
	if(user_id == loggedin_user_id || manager == 1) {
		$("#freeboard_replytext_update").val(freeboard_replytext);
		$("#hiddenButtonForToggle5").trigger("click");
	} else {
		return;
	}
	
	
	
	// updateAndRemoveReply() ?????? ??? modal??? ??????
	$("#updateReplyButton").off("click").on("click", function(){
		
		
		let updateConfirm = confirm("??????????????????????????????");
		
		if(updateConfirm){
			
			let freeboard_replytext = $("#freeboard_replytext_update").val();
		
			$.ajax({
				url : "/freeboardReply/updateReply"
				, method : "POST"
				, data : {"freeboard_replynum" : freeboard_replynum, 
						  "freeboard_replytext" : freeboard_replytext}
				, success : function(data){
			
						if(!(data < 1)) {
									
							$("#freeboard_replytext_update").val("");
							$("#lowerClose5").trigger("click");
							showReply(freeboard_num);
							
						} else {
							alert("??????????????????????????????????????????????????????????????????????????????????????????");
							$("#freeboard_replytext_update").val("");
							$("#lowerClose4").trigger("click");
						}
						
						
				}
			});
			
			
		}
				
		
		
	});
	
	
	
	// updateAndRemoveReply() ?????? ??? modal??? ??????
	$("#deleteReplyButton").off("click").on("click", function(){
		
		
		let deleteConfirm = confirm("??????????????????????????????");
		
		if(deleteConfirm){
		
			$.ajax({
			url : "/freeboardReply/deleteReply"
			, method : "POST"
			, data : {"freeboard_replynum" : freeboard_replynum}
			, success : function(data){
		
				if(!(data < 1)) {
							
					$("#freeboard_replytext_update").val("");
					$("#lowerClose5").trigger("click");
					showReply(freeboard_num);
					
				} else {
					alert("??????????????????????????????????????????????????????????????????????????????????????????");
					$("#freeboard_replytext_update").val("");
					$("#lowerClose4").trigger("click");
				}
					
					
			}
		});
		
		
	}
		
		
	});


}


function search(willBeNextPage) {
	
	var searchForm = document.getElementById("searchForm");
	var page = document.getElementById("page");
	
	page.value = willBeNextPage;
	
	searchForm.submit();
	
}



