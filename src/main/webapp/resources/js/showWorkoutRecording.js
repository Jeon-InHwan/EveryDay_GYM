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
    
    
 	$("#writeWorkoutButton").on("click", function(){
		location.href = "/workout/workoutRecordingHome";
	});
	
});


// 페이징 
function search(willBeNextPage) {
	
	let searchForm = document.getElementById("searchForm");
	let page = document.getElementById("page");
	
	page.value = willBeNextPage;
	
	searchForm.submit();
	
}























/*
function init(user_id) {
	
	$.ajax({
		url : "/workout/getAllWorkouts"
		, method : "POST"
		, data : {"user_id" : user_id}
		, success : function(data){
			
			let result = '';
			let totalBenchPress_volume = 0;
			let totalDeadLift_volume = 0;
			let totalSquat_volume = 0;
			
			if(data.length == 0){
				// data = [] 일 때 아래의 코드가 실행된다!!
				result += '<div id="workoutTableDiv">';
				result += '<table class="table table-dark table-hover" id="workoutTable">';
				result += '<tr>';
				result += '<th>登録日</th>';
				result += '<th>運動名</th>';
				result += '<th>kg</th>';
				result += '<th>counts</th>';
				result += '<th>volume per set</th>';
				result += '</tr>';
				result += '<tr>';
				result += '<td colspan="4">記録がありません！</td>';
				result += '</tr>';
				result += '</table>';
				result += '</div>';
				result += '</div>';
			} else {
				result += '<div id="workoutTableDiv">';
				result += '<table class="table table-dark table-hover" id="workoutTable">';
				result += '<tr>';
				result += '<th>登録日</th>';
				result += '<th>運動名</th>';
				result += '<th>kg</th>';
				result += '<th>counts</th>';
				result += '<th>volume per set</th>';
				result += '</tr>';
				$.each(data, function(index, item){
					result += '<tr>';
					result += 	'<td>' + item.workout_indate + '</td>';
					result += 	'<td>' + item.workout_type + '</td>';
					result += 	'<td>' + item.workout_kg + '</td>';
					result += 	'<td>' + item.workout_counts + '</td>';
					result += 	'<td>' + item.workout_setvolume + '</td>';
					result += '</tr>';
					});
				result += '</table>';
				result += '</div>';
				result += '</div>';
				
				
				$.each(data, function(index, item){
					
					if(item.workout_type == 'benchpress') {
						totalBenchPress_volume += item.workout_setvolume;
					}
					
					if(item.workout_type == 'deadlift') {
						totalDeadLift_volume += item.workout_setvolume;
					}
					
					if(item.workout_type == 'squat') {
						totalSquat_volume += item.workout_setvolume;
					}
					
					});
					
					
					$("#forTotalBenchPress_volume").html("BenchPress Total : " + totalBenchPress_volume);			
					$("#forTotalDeadLift_volume").html("DeadLift Total : " + totalDeadLift_volume);
					$("#forTotalSquat_volume").html("Squat Total : " + totalSquat_volume);		
				
				}
			
			$("#contentWrapper").html(result);
			
		}
	
	});
	
}
*/