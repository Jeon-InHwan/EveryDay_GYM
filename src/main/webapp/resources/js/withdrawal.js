function loadJQuery() {
    var oScript = document.createElement("script");
    oScript.type = "text/javascript";
    oScript.charset = "utf-8";		  
    oScript.src = "/resources/js/jquery-3.6.0.js";	
    document.getElementsByTagName("head")[0].appendChild(oScript);
};

let sendOK1 = false;

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
    

    
    $("#user_pwd").on("keyup", pwdCheck);
 
 	$("#withdrawalButton").on("click", function(){
		
		if($("#withdrawalButton").val != '会員脱退'){
			return;
			
		} else {
			
			let withdrawalConfirm = confirm("本当に脱退しますか？");
		
			if(withdrawalConfirm) {
			
				doWithdrawal();
			
			}
		}
		
		
		
	});
	
});

function pwdCheck() {

	let user_pwd = $("#user_pwd").val();
	
	if(user_pwd.trim().length < 5 || user_pwd.trim().length > 12){
		$("#withdrawalButton").attr("value", "適切な文字数でPasswordを入力してください！");
		sendOK1 = false;		
	} else {
		$("#withdrawalButton").attr("value", "会員脱退");
		sendOK1 = true;
	}
	totalCheck();
};


function totalCheck(){
	if(sendOK1) {
		$("#withdrawalButton").attr("value", "会員脱退");
	}
};

function doWithdrawal() {
	
	let user_pwd = $("#user_pwd").val();
	
	let user_id = $("#hiddenId").val();
	
	let withdrawalConfirm = confirm("本当に脱退しますか？");
		
	if(withdrawalConfirm) {
		if($("#withdrawalButton").attr("value") == "会員脱退") {
		
		// Member Table에서 user_id와 user_pwd가 일치하는 데이터가 있는지 확인
		$.ajax({
			url : "/member/checkPwd"
			, method : "POST"
			, data : {"user_id" : user_id,
			 		  "user_pwd" : user_pwd}
			, success : function(data){
				if(data.user_id != null) {
					
					$.ajax({
						url : "/member/deleteMember"
						, method : "POST"
						, data : {"user_id" : user_id,}
						, success : function(data){
							if(!(data < 1)) {
								alert("会員脱退を完了しました。ありがとうございました！");
								location.href = "/member/logout";
									
							} else {
								alert("脱退に失敗しました。もう少し後でまたトライしてください！");
								return;
							}
									
						} 
					});	
					
				} else {
					alert("一致する会員データがありません！Passwordを確認してください！");
					return;
				}
			}
		});	
		
		
		} else {
		alert("適切な文字数でPasswordを入力してください！");
		}
	}

	
};