var tag1 = '<div class="input-group"><span class="input-group-addon">질문 제목</span><input type="text" class="form-control" aria-describedby="basic-addon"></div><br/>';
tag1 = tag1 + '<div class="input-group"><span class="input-group-addon"><input type="radio" aria-label="radio-addon"></span><input type="text" class="form-control" aria-label="radio-addon"></div><br/>';

var tag2 = '<div class="input-group"><span class="input-group-addon">질문 제목</span><input type="text" class="form-control" aria-describedby="basic-addon"></div><br/>';
tag2 = tag2 + '<div class="input-group"><span class="input-group-addon">답변</span><input type="text" class="form-control" aria-describedby="basic-addon"></div><br/>';

var tag3 = '<div class="input-group"><span class="input-group-addon">질문 제목</span><input type="text" class="form-control" aria-describedby="basic-addon"></div><br/>';
tag3 =  tag3 + '<div><textarea class="form-control" rows="3">답변</textarea></div><br/>';

$("#button_multiple").click(function() {
	$("#question").append(tag1);
});

$("#button_txt").click(function() {
	$("#question").append(tag2);
});

$("#button_longtxt").click(function() {
	$("#question").append(tag3);
});
