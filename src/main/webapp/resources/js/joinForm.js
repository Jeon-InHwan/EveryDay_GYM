function loadJQuery() {
    var oScript = document.createElement("script");
    oScript.type = "text/javascript";
    oScript.charset = "utf-8";		  
    oScript.src = "/resources/js/jquery-3.6.0.js";	
    document.getElementsByTagName("head")[0].appendChild(oScript);
}

let sendOK1 = false;    // true일 때만 전송되도록
let sendOK2 = false; 	// true일 때만 전송되도록
let sendOK3 = false; 	// true일 때만 전송되도록
let sendOK4 = false; 	// true일 때만 전송되도록
let sendOK5 = false;	// true일 때만 전송되도록
let sendOK6 = false;	// true일 때만 전송되도록
let sendOK7 = false;	// true일 때만 전송되도록


$(function(){
		
	$("#user_id").on("keyup", idCheck);
	$("#user_pwd").on("keyup", pwdCheck);
	$("#user_nm").on("keyup", nmCheck);
	$("#user_phone").on("keyup", phoneCheck);
	$(".btn-check").on("change", genderCheck);
	$("#idDoubleCheckButton").on("click", idDoubleCheck);
		
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
    

});

function totalCheck(){
	
	let disabledCheck = $("#user_id").prop('disabled');
		
	console.log(disabledCheck);
	
	if(disabledCheck) {
		sendOK7 = true;
	}
	
	
	if(sendOK1 && sendOK2 && sendOK3 && sendOK4 && sendOK5 && sendOK6 && sendOK7) {
		$("#joinButton").attr("value", "今、加入！");
	} 
	
	if(sendOK1 == true && sendOK2 == true && sendOK3 == true && sendOK4 == true && sendOK5 == true && sendOK6 == true &&sendOK7 == false) {
		$("#joinButton").attr("value", "ID重複確認をしてください！");
	}
	
	console.log(sendOK1, sendOK2, sendOK3, sendOK4, sendOK5 , sendOK6, sendOK7);
};

function idCheck() {
	let user_id = $("#user_id").val();
	if(user_id.trim().length < 5 || user_id.trim().length > 12){
		$("#joinButton").attr("value", "適切な文字数でIDを入力してください！");
		sendOK1 = false;
		$("#idDoubleCheckButton").attr("disabled", true);
	} else {
		$("#joinButton").attr("value", "ID重複確認をしてください！");
		$("#idDoubleCheckButton").attr("disabled", false);
		sendOK1 = true;
	}	
	
	totalCheck();	
}
	
	
function idDoubleCheck() {		


	let user_id = $("#user_id").val();
	let useConfirm;
	
	$.ajax({
	url : '/member/idCheck'
	, method : "POST"
	, data : {"user_id" : user_id}
	, success : function(resp){
		if(resp == 'success'){
			useConfirm = confirm("使用可能なIDです。使用しますか？");
			if(useConfirm) {
				$("#user_id").attr("disabled", true);
				$("#idDoubleCheckButton").attr("disabled", true);
				totalCheck();
			}
		} else {
			alert("使用不可能なIDです。ほかのIDを入力してください！");
			$("#user_id").val("");
			return;
		  }
		}
	}); 
		
		totalCheck();
}

	
	


function pwdCheck() {
	let user_pwd = $("#user_pwd").val();
	if(user_pwd.trim().length < 5 || user_pwd.trim().length > 12){
		$("#joinButton").attr("value", "適切な文字数でPasswordを入力してください！");
		sendOK2 = false;
	} else {
		$("#joinButton").attr("value", "次の項目を入力してください！");
		sendOK2 = true;
	}
	
	totalCheck();
}


function nmCheck() {
	let user_nm = $("#user_nm").val();
	$("#joinButton").attr("value", "次の項目を入力してください！");
	if(user_nm.trim().length > 0){
		sendOK3 = true;
	} else {
		sendOK3 = false;
	}
	
	totalCheck();
}

function phoneCheck() {
	let user_phone = $("#user_phone").val();
	$("#joinButton").attr("value", "次の項目を入力してください！");
	
	if(user_phone.trim().length > 0){
		sendOK4 = true;
	} else {
		sendOK4 = false;
	}
	
	if(isNaN(user_phone)){
		$("#joinButton").attr("value", "携帯番号は必ず数字だけで入力してください！");
		sendOK5 = false;
	}  else {
		$("#joinButton").attr("value", "次の項目を入力してください！");
		sendOK5 = true;
	}
	
	totalCheck();
}

function genderCheck() {
	
	var gender = $('input[name="gender"]:checked').val();
	
	if(gender == null) {
		$("#joinButton").attr("value", "性別は必須項目です！");
		sendOK6 = false;
	} else {
		sendOK6 = true;
	}
	
	totalCheck();
}


function formCheck() {
		
		totalCheck();
		
		if($("#joinButton").attr("value") == "今、加入！"){		
			$("#user_id").attr("disabled", false);
			$("#joinForm").submit();
		} else {
			alert("条件を満たされていない項目があります！");
			return;
		}
}




