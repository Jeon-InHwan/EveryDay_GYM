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
    
    
     // benchpress modal (modalTrigger1) 시작
     $("#writeBenchpressRecord").on("click", function(){
		$("#modalTrigger1").trigger("click");
		let workout_type = $("#workout_type").val();
		let user_id = $("#hiddenLoginedId").val();
		showWorkouts(user_id, workout_type);
		
		
		$("#recordInputButton").off("click").on("click", function() {
			
			let user_id = $("#hiddenLoginedId").val();
			let workout_type = $("#workout_type").val();
			let workout_kg = $("#kg").val();
			let workout_counts = $("#counts").val();
			let workout_setvolume = workout_kg * workout_counts;
			
			if(workout_kg.trim().length < 1) {
				alert("KGを入力してください！");
				return;
			}
			
			if(isNaN(workout_kg)) {
				alert("数字を入力してください！");
				return;
			}
			
			if(workout_counts.trim().length < 1) {
				alert("Countを入力してください！");
				return;
			}
			
			if(isNaN(workout_counts)) {
				alert("数字を入力してください！");
				return;
			}
			
			showWorkouts(user_id, workout_type);
			
			$.ajax({
				url : "/workout/inputWorkouts"
				, method : "POST"
				, data : {"user_id" : user_id,
						  "workout_type" : workout_type,
						  "workout_kg" : workout_kg,
						  "workout_counts" : workout_counts,
						  "workout_setvolume" : workout_setvolume}										  
				
				, success :function(data){
				
					if(!(data < 1)) {
						
						showWorkouts(user_id, workout_type);
						$("#kg").val("");
						$("#counts").val("");
						
					} else {
						alert("記録作成に失敗しました。後でもう一度トライしてください。");
						$("#kg").val("");
						$("#counts").val("");
						$("#lowerClose").trigger("click");
					}
				
					
				}
		
						
			});
			
		})
		
		$("#deleteWorkoutButton").off("click").on("click", function(){
		
		let checkedWorkout; 
		let workout_num;
		let workout_type = $("#workout_type").val();
		let user_id = $("#hiddenLoginedId").val();

		
		let deleteConfirm = confirm("本当に削除しますか？");
		
		if(deleteConfirm) {
			$("input[name=workoutCheckbox]:checked").each(function(){
			
				checkedWorkout = $(this).val(); 
				
				// 지금 checkedWorkout에는 스트링 상태의 workout_num이 들어가 있음
				workout_num = Number(checkedWorkout);
			
				$.ajax({
					url : "/workout/deleteWorkouts"
					, method : "POST"
					, data : {"workout_num" : workout_num}
					, success : function(data){
				
						if(!(data < 1)) {
									
							showWorkouts(user_id, workout_type);
							
						} else {
							alert("記録削除に失敗しました。後でもう一度トライしてください。");
							showWorkouts(user_id, workout_type);
						}
						
						
					}
				});
			
			
			});
		
		}
	
		
	});
		
		
	});
	
	// benchpress modal (modalTrigger1) 끝
	
	
	// deadlift modal (modalTrigger_deadlift) 시작
	
    $("#writeDeadLiftRecord").on("click", function(){
		
		$("#modalTrigger_deadlift").trigger("click");
		let workout_type = $("#workout_type_deadlift").val();
		let user_id = $("#hiddenLoginedId_deadlift").val();

		showWorkouts_deadlift(user_id, workout_type);
		
		
		$("#recordInputButton_deadlift").off("click").on("click", function() {
			
			let user_id = $("#hiddenLoginedId_deadlift").val();
			let workout_type = $("#workout_type_deadlift").val();
			let workout_kg = $("#kg_deadlift").val();
			let workout_counts = $("#counts_deadlift").val();
			let workout_setvolume = workout_kg * workout_counts;
			
			if(workout_kg.trim().length < 1) {
				alert("KGを入力してください！");
				return;
			}
			
			if(isNaN(workout_kg)) {
				alert("数字を入力してください！");
				return;
			}
			
			if(workout_counts.trim().length < 1) {
				alert("Countを入力してください！");
				return;
			}
			
			if(isNaN(workout_counts)) {
				alert("数字を入力してください！");
				return;
			}
			
			showWorkouts_deadlift(user_id, workout_type);
			
			$.ajax({
				url : "/workout/inputWorkouts"
				, method : "POST"
				, data : {"user_id" : user_id,
						  "workout_type" : workout_type,
						  "workout_kg" : workout_kg,
						  "workout_counts" : workout_counts,
						  "workout_setvolume" : workout_setvolume}										  
				
				, success :function(data){
				
					if(!(data < 1)) {
						
						showWorkouts_deadlift(user_id, workout_type);
						$("#kg_deadlift").val("");
						$("#counts_deadlift").val("");
						
					} else {
						alert("記録作成に失敗しました。後でもう一度トライしてください。");
						$("#kg_deadlift").val("");
						$("#counts_deadlift").val("");
						$("#lowerClose_deadlift").trigger("click");
					}
				
					
				}
		
						
			});
			
		})
		
		
		$("#deleteWorkoutButton_deadlift").off("click").on("click", function(){
		
		let checkedWorkout; 
		let workout_num;
		let workout_type = $("#workout_type_deadlift").val();
		let user_id = $("#hiddenLoginedId_deadlift").val();

		
		let deleteConfirm = confirm("本当に削除しますか？");
		
		if(deleteConfirm) {
			$("input[name=workoutCheckbox_deadlift]:checked").each(function(){
			
				checkedWorkout = $(this).val(); 
				
				// 지금 checkedWorkout에는 스트링 상태의 workout_num이 들어가 있음
				workout_num = Number(checkedWorkout);
			
				$.ajax({
					url : "/workout/deleteWorkouts"
					, method : "POST"
					, data : {"workout_num" : workout_num}
					, success : function(data){
				
						if(!(data < 1)) {
									
							showWorkouts_deadlift(user_id, workout_type);
							
						} else {
							alert("記録削除に失敗しました。後でもう一度トライしてください。");
							showWorkouts_deadlift(user_id, workout_type);
						}
						
						
					}
				});
			
			
			});
		
		}
	
		
	});
		
		
		
		
	});
	
	// deadlift modal (modalTrigger_deadlift) 끝
	
	
	
	// squat modal (modalTrigger_squat) 시작
	
	$("#writeSquatRecord").on("click", function(){
		
		$("#modalTrigger_squat").trigger("click");
		let workout_type = $("#workout_type_squat").val();
		let user_id = $("#hiddenLoginedId_squat").val();

		showWorkouts_squat(user_id, workout_type);
		
		$("#recordInputButton_squat").off("click").on("click", function() {
			
			let user_id = $("#hiddenLoginedId_squat").val();
			let workout_type = $("#workout_type_squat").val();
			let workout_kg = $("#kg_squat").val();
			let workout_counts = $("#counts_squat").val();
			let workout_setvolume = workout_kg * workout_counts;
			
			if(workout_kg.trim().length < 1) {
				alert("KGを入力してください！");
				return;
			}
			
			if(isNaN(workout_kg)) {
				alert("数字を入力してください！");
				return;
			}
			
			if(workout_counts.trim().length < 1) {
				alert("Countを入力してください！");
				return;
			}
			
			if(isNaN(workout_counts)) {
				alert("数字を入力してください！");
				return;
			}
			
			showWorkouts_squat(user_id, workout_type);
			
			$.ajax({
				url : "/workout/inputWorkouts"
				, method : "POST"
				, data : {"user_id" : user_id,
						  "workout_type" : workout_type,
						  "workout_kg" : workout_kg,
						  "workout_counts" : workout_counts,
						  "workout_setvolume" : workout_setvolume}										  
				
				, success :function(data){
				
					if(!(data < 1)) {
						
						showWorkouts_squat(user_id, workout_type);
						$("#kg_squat").val("");
						$("#counts_squat").val("");
						
					} else {
						alert("記録作成に失敗しました。後でもう一度トライしてください。");
						$("#kg_squat").val("");
						$("#counts_squat").val("");
						$("#lowerClose_squat").trigger("click");
					}
				
					
				}
		
						
			});
			
		})
		
		
		$("#deleteWorkoutButton_squat").off("click").on("click", function(){
		
		let checkedWorkout; 
		let workout_num;
		let workout_type = $("#workout_type_squat").val();
		let user_id = $("#hiddenLoginedId_squat").val();

		
		let deleteConfirm = confirm("本当に削除しますか？");
		
		if(deleteConfirm) {
			$("input[name=workoutCheckbox_squat]:checked").each(function(){
			
				checkedWorkout = $(this).val(); 
				
				// 지금 checkedWorkout에는 스트링 상태의 workout_num이 들어가 있음
				workout_num = Number(checkedWorkout);
			
				$.ajax({
					url : "/workout/deleteWorkouts"
					, method : "POST"
					, data : {"workout_num" : workout_num}
					, success : function(data){
				
						if(!(data < 1)) {
									
							showWorkouts_squat(user_id, workout_type);
							
						} else {
							alert("記録削除に失敗しました。後でもう一度トライしてください。");
							showWorkouts_squat(user_id, workout_type);
						}
						
						
					}
				});
			
			
			});
		
		}
	
		
	});
		
		
		
		
	});
	
	
	
	
});


function showWorkouts(user_id, workout_type) {
	
	$.ajax({
		url : "/workout/showWorkouts"
		, method : "POST"
		, data : {"user_id" : user_id,
		          "workout_type" : workout_type}
		, success :function(data){
				
			let result = '';
			let totalVolume = 0;
			let totalSets = 0;
			
			if(data.length == 0){
				// data = [] 일 때 아래의 코드가 실행된다!!
				result += '<div id="workoutWrapper" class="modal-footer">';
				result += '<div id="workoutDiv"> ';
				result += '<table class="table table-dark table-hover" id="workoutTable">';
				result += '<tr>';
				result += '<th>ID</th>';
				result += '<th>kg</th>';
				result += '<th>counts</th>';
				result += '<th>volume per set</th>';
				result += '</tr>';
				result += '<tr>';
				result += '<td colspan="4">今日は、まだ登録された記録がありません！</td>';
				result += '</tr>';
				result += '</table>';
				result += '</div>';
				result += '</div>';
				$("#TotalVolumeDiv").hide();
				$("#TotalSetsDiv").hide();
				$("#deleteWorkoutButton").hide();
			} else {
				result += '<div id="workoutWrapper" class="modal-footer">';
				result += '<div id="workoutDiv"> ';
				result += '<table class="table table-dark table-hover" id="workoutTable">';
				result += '<tr>';
				result += '<th>ID</th>';
				result += '<th>kg</th>';
				result += '<th>counts</th>';
				result += '<th>volume per set</th>';
				result += '<th><input type="checkbox" name="checkAll" id="checkAll"></th>';
				result += '</tr>';
				$.each(data, function(index, item){
				result += '<tr class="forClickWorkoutTr" data-num="' + item.workout_num + '" data-id="' + item.user_id + '"  data-text="' + item.workout_type +  '">';
				result += 	'<td>' + item.user_id + '</td>';
				result += 	'<td>' + item.workout_kg + '</td>';
				result += 	'<td>' + item.workout_counts + '</td>';
				result += 	'<td>' + item.workout_setvolume + '</td>';
				result += 	'<td><input type="checkbox" name="workoutCheckbox" value="' + item.workout_num + '"</td>';
				result += '</tr>';
				});
				result += '</table>';
				result += '</div>';
				result += '</div>';
				
				$.each(data, function(index, item){
					totalVolume += item.workout_setvolume;
				});	
				
				totalSets = data.length;
				
				$("#TotalVolumeDiv").show();
				$("#TotalSetsDiv").show();
				$("#deleteWorkoutButton").show();
				$("#TotalVolume").text(totalVolume + " KG");
				$("#TotalSets").text(totalSets + " Sets");
				
			}
			
			$("#innerContent2").html(result);
			
			$("#checkAll").on("click", checkAll);
			
			$("input[name=workoutCheckbox]").on("click", checkClear);
		}

				
	});
	
	
	// checkbox 설정
	function checkAll(){
		if($("#checkAll").prop("checked")){
			$("input[name=workoutCheckbox]").prop("checked", true);
		} else {
			$("input[name=workoutCheckbox]").prop("checked", false);
		}
	};
	
	function checkClear(){
		if($("input[name=workoutCheckbox]:checked").length == $("input[name=workoutCheckbox]").length){
			$("#checkAll").prop("checked", true);
		} else {
			$("#checkAll").prop("checked", false);
		}
	}
	
}


function showWorkouts_deadlift(user_id, workout_type) {
	
	$.ajax({
		url : "/workout/showWorkouts"
		, method : "POST"
		, data : {"user_id" : user_id,
		          "workout_type" : workout_type}
		, success :function(data){
				
			let result = '';
			let totalVolume = 0;
			let totalSets = 0;
			
			if(data.length == 0){
				// data = [] 일 때 아래의 코드가 실행된다!!
				result += '<div id="workoutWrapper_deadlift" class="modal-footer">';
				result += '<div id="workoutDiv_deadlift"> ';
				result += '<table class="table table-dark table-hover" id="workoutTable_deadlift">';
				result += '<tr>';
				result += '<th>ID</th>';
				result += '<th>kg</th>';
				result += '<th>counts</th>';
				result += '<th>volume per set</th>';
				result += '</tr>';
				result += '<tr>';
				result += '<td colspan="4">今日は、まだ登録された記録がありません！</td>';
				result += '</tr>';
				result += '</table>';
				result += '</div>';
				result += '</div>';
				$("#TotalVolumeDiv_deadlift").hide();
				$("#TotalSetsDiv_deadlift").hide();
				$("#deleteWorkoutButton_deadlift").hide();
			} else {
				result += '<div id="workoutWrapper_deadlift" class="modal-footer">';
				result += '<div id="workoutDiv_deadlift"> ';
				result += '<table class="table table-dark table-hover" id="workoutTable_deadlift">';
				result += '<tr>';
				result += '<th>ID</th>';
				result += '<th>kg</th>';
				result += '<th>counts</th>';
				result += '<th>volume per set</th>';
				result += '<th><input type="checkbox" name="checkAll_deadlift" id="checkAll_deadlift"></th>';
				result += '</tr>';
				$.each(data, function(index, item){
				result += '<tr class="forClickWorkoutTr" data-num="' + item.workout_num + '" data-id="' + item.user_id + '"  data-text="' + item.workout_type +  '">';
				result += 	'<td>' + item.user_id + '</td>';
				result += 	'<td>' + item.workout_kg + '</td>';
				result += 	'<td>' + item.workout_counts + '</td>';
				result += 	'<td>' + item.workout_setvolume + '</td>';
				result += 	'<td><input type="checkbox" name="workoutCheckbox_deadlift" value="' + item.workout_num + '"</td>';
				result += '</tr>';
				});
				result += '</table>';
				result += '</div>';
				result += '</div>';
				
				$.each(data, function(index, item){
					totalVolume += item.workout_setvolume;
				});	
				
				totalSets = data.length;
				
				$("#TotalVolumeDiv_deadlift").show();
				$("#TotalSetsDiv_deadlift").show();
				$("#deleteWorkoutButton_deadlift").show();
				$("#TotalVolume_deadlift").text(totalVolume + " KG");
				$("#TotalSets_deadlift").text(totalSets + " Sets");
				
			}
			
			$("#innerContent4").html(result);
			
			$("#checkAll_deadlift").on("click", checkAll_deadlift);
			
			$("input[name=workoutCheckbox_deadlift]").on("click", checkClear_deadlift);
		}

				
	});
	
	
	// checkbox 설정
	function checkAll_deadlift(){
		if($("#checkAll_deadlift").prop("checked")){
			$("input[name=workoutCheckbox_deadlift]").prop("checked", true);
		} else {
			$("input[name=workoutCheckbox_deadlift]").prop("checked", false);
		}
	};
	
	function checkClear_deadlift(){
		if($("input[name=workoutCheckbox_deadlift]:checked").length == $("input[name=workoutCheckbox_deadlift]").length){
			$("#checkAll_deadlift").prop("checked", true);
		} else {
			$("#checkAll_deadlift").prop("checked", false);
		}
	}
	
}




function showWorkouts_squat(user_id, workout_type) {
	
	$.ajax({
		url : "/workout/showWorkouts"
		, method : "POST"
		, data : {"user_id" : user_id,
		          "workout_type" : workout_type}
		, success :function(data){
				
			let result = '';
			let totalVolume = 0;
			let totalSets = 0;
			
			if(data.length == 0){
				// data = [] 일 때 아래의 코드가 실행된다!!
				result += '<div id="workoutWrapper_squat" class="modal-footer">';
				result += '<div id="workoutDiv_squat"> ';
				result += '<table class="table table-dark table-hover" id="workoutTable_squat">';
				result += '<tr>';
				result += '<th>ID</th>';
				result += '<th>kg</th>';
				result += '<th>counts</th>';
				result += '<th>volume per set</th>';
				result += '</tr>';
				result += '<tr>';
				result += '<td colspan="4">今日は、まだ登録された記録がありません！</td>';
				result += '</tr>';
				result += '</table>';
				result += '</div>';
				result += '</div>';
				$("#TotalVolumeDiv_squat").hide();
				$("#TotalSetsDiv_squat").hide();
				$("#deleteWorkoutButton_squat").hide();
			} else {
				result += '<div id="workoutWrapper_squat" class="modal-footer">';
				result += '<div id="workoutDiv_squat"> ';
				result += '<table class="table table-dark table-hover" id="workoutTable_squat">';
				result += '<tr>';
				result += '<th>ID</th>';
				result += '<th>kg</th>';
				result += '<th>counts</th>';
				result += '<th>volume per set</th>';
				result += '<th><input type="checkbox" name="checkAll_squat" id="checkAll_squat"></th>';
				result += '</tr>';
				$.each(data, function(index, item){
				result += '<tr class="forClickWorkoutTr" data-num="' + item.workout_num + '" data-id="' + item.user_id + '"  data-text="' + item.workout_type +  '">';
				result += 	'<td>' + item.user_id + '</td>';
				result += 	'<td>' + item.workout_kg + '</td>';
				result += 	'<td>' + item.workout_counts + '</td>';
				result += 	'<td>' + item.workout_setvolume + '</td>';
				result += 	'<td><input type="checkbox" name="workoutCheckbox_squat" value="' + item.workout_num + '"</td>';
				result += '</tr>';
				});
				result += '</table>';
				result += '</div>';
				result += '</div>';
				
				$.each(data, function(index, item){
					totalVolume += item.workout_setvolume;
				});	
				
				totalSets = data.length;
				
				$("#TotalVolumeDiv_squat").show();
				$("#TotalSetsDiv_squat").show();
				$("#deleteWorkoutButton_squat").show();
				$("#TotalVolume_squat").text(totalVolume + " KG");
				$("#TotalSets_squat").text(totalSets + " Sets");
				
			}
			
			$("#innerContent6").html(result);
			
			$("#checkAll_squat").on("click", checkAll_squat);
			
			$("input[name=workoutCheckbox_squat]").on("click", checkClear_squat);
		}

				
	});
	
	
	// checkbox 설정
	function checkAll_squat(){
		if($("#checkAll_squat").prop("checked")){
			$("input[name=workoutCheckbox_squat]").prop("checked", true);
		} else {
			$("input[name=workoutCheckbox_squat]").prop("checked", false);
		}
	};
	
	function checkClear_squat(){
		if($("input[name=workoutCheckbox_squat]:checked").length == $("input[name=workoutCheckbox_squat]").length){
			$("#checkAll_squat").prop("checked", true);
		} else {
			$("#checkAll_squat").prop("checked", false);
		}
	}
	
}




