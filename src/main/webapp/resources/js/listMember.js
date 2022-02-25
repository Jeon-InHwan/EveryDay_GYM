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
    
    
    $(".memberDeleteButton").on("click", function(){
	
		let deleteConfirm = confirm("本当に削除しますか？");
		let user_id = ($(this).parents("tr").find("td:eq(1)").text());
		
		
		
		if(deleteConfirm) {
			
			$.ajax({
			url : "/manager/deleteMember"
			, method : "POST"
			, data : {"user_id" : user_id}
			, success : function(data){
					
					if(!(data < 1)) {
						alert("削除に成功しました！");
						location.reload();
					} else {
						alert("削除に失敗しました！");
						location.reload();
					}
				}
			
			});
			
		}
		
	});
    
	
});


function search(willBeNextPage) {
	
	var searchForm = document.getElementById("searchForm");
	var page = document.getElementById("page");
	
	page.value = willBeNextPage;
	
	searchForm.submit();
	
}



