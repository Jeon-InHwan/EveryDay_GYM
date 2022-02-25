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
	
	
	$(".approvalButton").on("click", function(){
		
		let user_id = ($(this).parents("tr").find("td:eq(1)").text());
		let membership_month = ($(this).parents("tr").find("td:eq(2)>span").text());
		let membership_num_string = ($(this).parents("tr").find("td:eq(5)>input").val());
		
		// membership_month 의 타입은 String
		
		let membership_num = Number(membership_num_string);
			
		$("#hidden_user_id").val(user_id);
		$("#hidden_membership_month").val(membership_month);
		
		
		$("#modalTrigger").trigger("click");
		

		let date = new Date();
        let year = date.getFullYear().toString();

        let month = date.getMonth() + 1;
        month = month < 10 ? '0' + month.toString() : month.toString();

        let day = date.getDate();
        day = day < 10 ? '0' + day.toString() : day.toString();
        
        let currentDate = year + '-' +  month + '-' + day;
        
		let currentDate_date = new Date(currentDate);
		
		
		if(membership_month == 3) {
			currentDate_date.setMonth(currentDate_date.getMonth() + 3);
		}
		
		if(membership_month == 6) {
			currentDate_date.setMonth(currentDate_date.getMonth() + 6);
		}
		
		if(membership_month == 12) {
			currentDate_date.setMonth(currentDate_date.getMonth() + 12);
		}

        let expireYear = currentDate_date.getFullYear().toString();

        let expireMonth = currentDate_date.getMonth() + 1;
        expireMonth = expireMonth < 10 ? '0' + expireMonth.toString() : expireMonth.toString();

        let expireDay = currentDate_date.getDate();
        expireDay = expireDay < 10 ? '0' + expireDay.toString() : expireDay.toString();
        
        let expiredate = expireYear + '-' +  expireMonth + '-' + expireDay;
        
        $("#innerContent1").text("予想満了日 : " + expiredate);
        
        
        $("#modal_processRequestButton").off("click").on("click", function(){
			
			// Member Table의 expiredate update
			$.ajax({
			url : "/manager/updateExpiredate"
			, method : "POST"
			, data : {"user_id" : user_id, 
					  "expiredate" : expiredate}
			, success : function(data){
					
					if(!(data < 1)) {
						$("#innerContent1").text(expiredate + "に満了日をアップデートしました！");
						$("#modal_processRequestButton").hide();
						// Membership Table의 membership_processed update
						$.ajax({
							url : "/manager/updateProcessed"
							, method : "POST"
							, data : {"membership_num" : membership_num}
							, success : function(data){
								console.log("membership_num updated");
							}
						});	
					} else {
						alert("満了日アップデートに失敗しました！");
					}
				}
			
			});
			
			$("#lowerClose, #upperClose").off("click").on("click", function(){
				location.reload();
			});

		});
	
	});
	
});


function search(willBeNextPage) {
	
	var searchForm = document.getElementById("searchForm");
	var page = document.getElementById("page");
	
	page.value = willBeNextPage;
	
	searchForm.submit();
	
}


