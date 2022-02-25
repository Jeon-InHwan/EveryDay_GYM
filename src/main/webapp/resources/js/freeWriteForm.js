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
    
    
    $("writeButton").on("click", function(){
		location.href = "/board/freeWriteFrom";
	});
    	
  		
	
});


function writeFreeBoardCheck(){
	
	let freeboard_title = $("#freeboard_title").val();
	let freeboard_context = $("#freeboard_context").val();
	let writeFreeBoardForm = $("#writeFreeBoardForm");
	
	
	if(freeboard_title.trim().length < 1) {
		alert("タイトルは必須項目です！");	
		return;
	}
	
	if(freeboard_title.trim().length > 38) {
		alert("タイトルが長いです！もう少し短くしてくだい！");	
		return;
	}
	
	if(freeboard_context.trim().length < 1) {
		alert("内容は必須項目です！");
		return;	
	}
	
	if(freeboard_context.trim().length > 600) {
		alert("内容が長いです！もう少し短くしてくだい！");
		return;	
	}
	
	
	writeFreeBoardForm.submit();
	
};


