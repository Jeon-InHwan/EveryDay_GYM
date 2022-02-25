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
    
    let user_id = $("#hiddenLoginedId").val();
    let check1 = false;
    
    $.ajax({
		url : "/membership/confirmMembership"
		, method : "POST"
		, data : {"user_id" : user_id}
		, success : function(data){

			if(data.expiredate == null) {
				if(check1 == false) {
					$("#expiredate_td").text("まだ会員券申請記録がありません！");
				}		
			} else {
				$("#expiredate_td").text(data.expiredate);
				$("#modal_joinButton").hide();
			} 
		}
	});
	
	
	$.ajax({
		url : "/membership/confirmRequest"
		, method : "POST"
		, data : {"user_id" : user_id}
		, success : function(data){

			if(data.membership_processed != null) {
				if(data.membership_processed == 0) {
					$("#expiredate_td").text("申請を処理しております！(申請中 : "+ data.membership_month  + "ヶ月会員権)");
					check1 = true;	
					$("#modal_joinButton").hide();	
				} else {
					check1 = false;	
				}

			}
		}
	});
    

	$("#3monthButton").on("click", function(){
		$("#membership_month").val(3);
	});
	
	$("#6monthButton").on("click", function(){
		$("#membership_month").val(6);
	});
	
	$("#12monthButton").on("click", function(){
		$("#membership_month").val(12);
	});
	
	
	$("#3monthButton, #6monthButton, #12monthButton").on("click", function(){
		
		let user_id = $("#hiddenLoginedId").val();
		$("#modal_joinButton").show();
		let check2 = false;
		
		$.ajax({
			url : "/membership/confirmMembership"
			, method : "POST"
			, data : {"user_id" : user_id}
			, success : function(data){
					
				let date = new Date();
					
			    let year = date.getFullYear().toString();
				    
			    var month = date.getMonth() + 1;
			    month = month < 10 ? '0' + month.toString() : month.toString();
				
			    let day = date.getDate();
			    day = day < 10 ? '0' + day.toString() : day.toString();
				    
			    let currentDate = year + '-' +  month + '-' + day;
				  		    
			    let expiredate_date = new Date(data.expiredate);
				    
				let currentDate_date = new Date(currentDate);
					
				if(data.expiredate == null) {
					if(check2 != true) {
						$("#innerContent1").text("申請できます！申請ボタンをクリックしてください！");	
					}	
				} else if(currentDate_date <= expiredate_date) {
					$("#innerContent1").text("まだ会員券が満了していません！(満了日：" + data.expiredate + ")");
					$("#modal_joinButton").hide();
				} else if(currentDate_date > expiredate_date) {
					if (check2 != true) {
						$("#innerContent1").text("申請できます！申請ボタンをクリックしてください！(満了日：" + data.expiredate + ")");
					}
				}
			}
		});
		
		
		
		$.ajax({
			url : "/membership/confirmRequest"
			, method : "POST"
			, data : {"user_id" : user_id}
			, success : function(data){
	
				if(data.membership_processed != null) {
					if(data.membership_processed == 0) {
						$("#innerContent1").text("申請を処理しております！");	
						$("#modal_joinButton").hide();
						check2 = true;
					}
	
				} 
			}
		});
		
		
		
		$("#modalTrigger").trigger("click");
		
		$("#modal_joinButton").off("click").on("click", function(){
			
			let membership_month = $("#membership_month").val();
			let user_id = $("#hiddenLoginedId").val();
			
			let confirmJoin = confirm("本当に申請しますか？");
			
			if(confirmJoin) {
				
				$.ajax({
					url : "/membership/insertMembershipRequest"
					, method : "POST"
					, data : {"user_id" : user_id,
							  "membership_month" : membership_month}
					, success : function(data){
						
						if(!(data < 1)) {
							alert("成功しました！");
							location.href = '/afterLogin';
						} else {
							alert("申請に失敗しました。後でもう一度申請してください！");
							location.href = '/membership/joinForm';
						}
					}
				});
				
			
			}
			
		});
		
	});
	
	
	
});


