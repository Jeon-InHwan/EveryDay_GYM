function loadJQuery() {
    var oScript = document.createElement("script");
    oScript.type = "text/javascript";
    oScript.charset = "utf-8";		  
    oScript.src = "/resources/js/jquery-3.6.0.js";	
    document.getElementsByTagName("head")[0].appendChild(oScript);
};

let sendOK1 = false;    // true일 때만 전송되도록
let sendOK2 = false; 	// true일 때만 전송되도록


function totalCheck(){
	if(sendOK1 && sendOK2) {
		$("#loginButton").attr("value", "今、ログイン！");
	}
};


$(function(){
		
	$("#user_id").on("keyup", idCheck);
	$("#user_pwd").on("keyup", pwdCheck);	
		
		
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



function idCheck() {

	let user_id = $("#user_id").val();
	
	if(user_id.trim().length < 5 || user_id.trim().length > 12){
		$("#loginButton").attr("value", "適切な文字数でIDを入力してください！");
		sendOK1 = false;
	} else {
		$("#loginButton").attr("value", "適切な文字数のIDです！");
		sendOK1 = true;
	}
	
	totalCheck();

};


function pwdCheck() {

	let user_pwd = $("#user_pwd").val();
	
	if(user_pwd.trim().length < 5 || user_pwd.trim().length > 12){
		$("#loginButton").attr("value", "適切な文字数でPasswordを入力してください！");
		sendOK2 = false;
	} else {
		sendOK2 = true;	
	}
	totalCheck();
};


function doLogin() {
	
	if($("#loginButton").attr("value") == "今、ログイン！") {
		$("#loginForm").submit();
	} else {
		alert("IDとPasswordを入力してくだい！");
	}
	
};



