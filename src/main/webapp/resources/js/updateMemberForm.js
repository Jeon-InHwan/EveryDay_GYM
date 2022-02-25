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



$(function(){
		
	$("#user_pwd").on("keyup", pwdCheck);
	$("#user_nm").on("keyup", nmCheck);
	$("#user_phone").on("keyup", phoneCheck);
	$(".btn-check").on("change", genderCheck);
		
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
	if(sendOK1 && sendOK2 && sendOK3 && sendOK4 && sendOK5 && sendOK6) {
		$("#updateButton").attr("value", "今、修正！");
	}
};


function pwdCheck() {
	
	sendOK1 = true;
	
	let user_pwd = $("#user_pwd").val();
	if(user_pwd.trim().length < 5 || user_pwd.trim().length > 12){
		$("#updateButton").attr("value", "適切な文字数でPasswordを入力してください！");
		sendOK2 = false;
	} else {
		$("#updateButton").attr("value", "次の項目を入力してください！");
		sendOK2 = true;
	}
	
	nmCheck();
	phoneCheck();
	genderCheck();
	totalCheck();
}


function nmCheck() {
	let user_nm = $("#user_nm").val();
	$("#updateButton").attr("value", "次の項目を入力してください！");
	if(user_nm.trim().length > 0){
		sendOK3 = true;
	} else {
		sendOK3 = false;
	}
	
	totalCheck();
}

function phoneCheck() {
	let user_phone = $("#user_phone").val();
	$("#updateButton").attr("value", "次の項目を入力してください！");
	
	if(user_phone.trim().length > 0){
		sendOK4 = true;
	} else {
		sendOK4 = false;
	}
	
	if(isNaN(user_phone)){
		$("#updateButton").attr("value", "携帯番号は必ず数字だけで入力してください！");
		sendOK5 = false;
	}  else {
		$("#updateButton").attr("value", "次の項目を入力してください！");
		sendOK5 = true;
	}
	
	totalCheck();
}

function genderCheck() {
	
	var gender = $('input[name="gender"]:checked').val();
	
	if(gender == null) {
		$("#updateButton").attr("value", "性別は必須項目です！");
		sendOK6 = false;
	} else {
		sendOK6 = true;
	}
	
	totalCheck();
}


function formCheck() {
		
		if($("#updateButton").attr("value") == "今、修正！"){		
			$("#updateForm").submit();
		} else {
			alert("まだ完成させていない項目があります！");
			return;
		}
}




