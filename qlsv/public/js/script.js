$("#student_id").change(function(event) {
	/* Act on the event */
	var student_id = $(this).val();
	$("#subject_id").children().not(":first-child").remove();
	if (student_id=="") {
		return;
	}
	$("#load").html("Loading...");
	$.ajax({
		url: 'index.php?c=register&a=listSubject',
		data: {student_id: student_id},
	})
	.done(function(data) {
		var subjects = JSON.parse(data);
		$(subjects).each(function(index, el) {
			var option = "<option value='" + el.id + "'>" + el.id + " - "+  el.name+ "</option>";
			$("#subject_id").append(option)
		});
		$("#load").empty();
		console.log("success");
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
	
});

$(".delete").click(function(event) {
	/* Act on the event */
	$(".error").empty();
	$(".message").empty();
	var type = $(this).attr("type");
	var message = "Bạn muốn xóa sinh viên này phải không?";
	if (type == "subject") {
		message = "Bạn muốn xóa môn học này phải không?";
	}
	if(!confirm(message)) {
		return false;//không chạy href
	}
	//Chuẩn bị ajax để check
	var id = $(this).attr("data");
	var self = this;
	$.ajax({
		url: 'index.php?c=' + type + '&a=hasRegister',
		data: {id: id},
	})
	.done(function(data) {
		data = JSON.parse(data);
		if (data.existing == 1) {
			$(".error").html(data.error);

			return false;
		}
		window.location.href = self.href;
		console.log("success");
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
	
	return false;
});